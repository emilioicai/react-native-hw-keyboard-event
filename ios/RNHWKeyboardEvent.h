
#ifndef RNHWKeyboardEvent_h
#define RNHWKeyboardEvent_h

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RNHWKeyboardEvent : RCTEventEmitter <RCTBridgeModule>

@property (nonatomic) BOOL hasListeners;

+ (id)allocWithZone:(NSZone *)zone;

+ (id)getSingletonInstance;

- (BOOL)isListening;

- (void)sendHWKeyEvent:(NSString *)keyString;

@end
  
#endif /* RNHWKeyboardEvent_h */
