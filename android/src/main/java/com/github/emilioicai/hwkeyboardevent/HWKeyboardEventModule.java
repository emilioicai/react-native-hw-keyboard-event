package com.github.emilioicai.hwkeyboardevent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.WritableMap;

import android.view.KeyEvent;

public class HWKeyboardEventModule extends ReactContextBaseJavaModule {
    private ReactContext mReactContext;
    private DeviceEventManagerModule.RCTDeviceEventEmitter mJSModule = null;

    private static HWKeyboardEventModule instance = null;

    public static HWKeyboardEventModule initHWKeyboardEventModule(ReactApplicationContext reactContext) {
        instance = new HWKeyboardEventModule(reactContext);
        return instance;
    }

    public static HWKeyboardEventModule getInstance() {
        return instance;
    }

    public void keyPressed(String pressedKey) {
        WritableMap params = new WritableNativeMap();
        params.putString("pressedKey", String.valueOf(pressedKey));

        if (!mReactContext.hasActiveCatalystInstance()) {
            return;
        }

        if (mJSModule == null) {
            mJSModule = mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        }
        mJSModule.emit("onHWKeyPressed", params);
    };

    protected HWKeyboardEventModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "HWKeyboardEventModule";
    }
}
