import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform
} from "react-native";

class HWKeyboardEvent {
  onHWKeyPressed(cb) {
    this.removeOnHWKeyPressed();
    if (Platform.OS === "ios") {
      let keyEvent = new NativeEventEmitter(NativeModules.RNHWKeyboardEvent);
      this.listener = keyEvent.addListener("onHWKeyPressed", cb);
    } else {
      this.listener = DeviceEventEmitter.addListener("onHWKeyPressed", cb);
    }
  }

  removeOnHWKeyPressed() {
    if (this.listener) {
      this.listener.remove();
      this.listener = null;
    }
  }
}

export default new HWKeyboardEvent();
