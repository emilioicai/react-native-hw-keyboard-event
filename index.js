import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform
} from "react-native";

class HWKeyboardEvent {
  onHWKeyPressed(cb) {
    this.removeOnHWKeyPressed(true);
    if (!this.cbStack) {
      this.cbStack = [];
    }
    this.cbStack.push(cb);
    if (Platform.OS === "ios") {
      let keyEvent = new NativeEventEmitter(NativeModules.RNHWKeyboardEvent);
      this.listener = keyEvent.addListener("onHWKeyPressed", cb);
    } else {
      this.listener = DeviceEventEmitter.addListener("onHWKeyPressed", cb);
    }
  }

  removeOnHWKeyPressed(newCbAdded) {
    if (this.listener) {
      this.listener.remove();
      this.listener = null;
    }
    if (!this.cbStack) return;
    if (!newCbAdded) {
      this.cbStack.pop();
      if (this.cbStack.length > 0) {
        // re-add removed listeners in case there where any
        this.onHWKeyPressed(this.cbStack[this.cbStack.length - 1]);
      }
    }
  }
}

export default new HWKeyboardEvent();
