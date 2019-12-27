
#import <Foundation/Foundation.h>
#import "RNHWKeyboardEvent.h"

NSString* const onKeyUpEvent = @"onKeyUp";

@implementation RNHWKeyboardEvent

#pragma mark - RNHWKeyboardEvent implementation

RCT_EXPORT_MODULE();

+ (id)allocWithZone:(NSZone *)zone {
    static RNHWKeyboardEvent *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

+ (id)getSingletonInstance {
    static RNHWKeyboardEvent *sharedRNHWKeyboardEvent = nil;
    if (sharedRNHWKeyboardEvent == nil) {
        sharedRNHWKeyboardEvent = [[self alloc] init];
    }
    return sharedRNHWKeyboardEvent;
}

- (BOOL)isListening {
    return self.hasListeners;
}

- (void)sendHWKeyEvent:(NSString *)keyString {
    if (self.hasListeners && self.bridge) {
        [super sendEventWithName:onKeyUpEvent body:@{@"pressedKey": keyString}];
    }
}

#pragma mark - RCTEventEmitter implementation

- (NSArray<NSString *> *)supportedEvents {
    return @[onKeyUpEvent];
}

// Note: startObserving will be called when this module's first listener is added.
- (void)startObserving {
    self.hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Note: stopObserving will be called when this module's last listener is removed, or on dealloc.
- (void)stopObserving {
    self.hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

@end

