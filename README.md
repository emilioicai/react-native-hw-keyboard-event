# React Native Hardware Keyboard Events handler

### Installation

#### npm

Run `npm install react-native-hw-keyboard-event --save`

#### yarn

Run `yarn add react-native-hw-keyboard-event`


#### iOS: 

 `pod install`  inside your `ios` folder.

#### Android

Override `dispatchKeyEvent` in your `MainActivity.java`

```
    import android.view.KeyEvent; // IMPORTANT
    import com.github.emilioicai.hwkeyboardevent.HWKeyboardEventModule; // IMPORTANT


    public class MainActivity extends ReactActivity {
      ......
      @Override
      public boolean dispatchKeyEvent(KeyEvent event) {
          if (event.getKeyCode() == KeyEvent.KEYCODE_ENTER) {
              // Detects user pressing the enter key
              if (event.getAction() == KeyEvent.ACTION_DOWN && !event.isShiftPressed()){
                  // Enter is pressed
                  HWKeyboardEventModule.getInstance().keyPressed("enter");
                  return true;
              }
              if (event.getAction() == KeyEvent.ACTION_DOWN && event.isShiftPressed()){
                  // Shift-Enter is pressed
                  HWKeyboardEventModule.getInstance().keyPressed("shift-enter");
                  return true;
              }
          }
          return super.dispatchKeyEvent(event);
      };
      ......

    }
```

#### iOS

Add the `keyCommands` method to your `AppDelegate.m` file:

```objc
#import <RNHWKeyboardEvent.h>  // IMPORTANT

@implementation AppDelegate

//....

RNHWKeyboardEvent *hwKeyEvent = nil;
- (NSMutableArray<UIKeyCommand *> *)keyCommands {
  NSMutableArray *keys = [NSMutableArray new];
  if (hwKeyEvent == nil) {
    hwKeyEvent = [[RNHWKeyboardEvent alloc] init];
  }
  if ([hwKeyEvent isListening]) {
    [keys addObject: [UIKeyCommand keyCommandWithInput:@"\r" modifierFlags:0 action:@selector(sendEnter:)]];
    [keys addObject: [UIKeyCommand keyCommandWithInput:@"\r" modifierFlags:UIKeyModifierShift action:@selector(sendShiftEnter:)]];
  }
  return keys;
}

- (void)sendEnter:(UIKeyCommand *)sender {
  // Detects user pressing the enter key
  NSString *selected = sender.input;
  [hwKeyEvent sendHWKeyEvent:@"enter"];
}
- (void)sendShiftEnter:(UIKeyCommand *)sender {
// Detects user pressing the shift-enter combination
  NSString *selected = sender.input;
  [hwKeyEvent sendHWKeyEvent:@"shift-enter"];
}

@end
```

## Usage

Whenever you want to use it within React Native code now you can:

`import KeyEvent from 'react-native-keyevent';`

```javascript
  componentDidMount() {
    HWKeyboardEvent.onHWKeyPressed(this.handleHardwareEnterPress);
  }

  componentWillUnmount() {
    HWKeyboardEvent.removeOnHWKeyPressed();
  }
  
  handleHardwareEnterPress = (keyEvent) => {
      switch (keyEvent.pressedKey) {
      case 'enter': this.handleSendMessage();
          break;
      case 'shift-enter': this.handleInsertTextToDraft('\n');
      }
  }
```
