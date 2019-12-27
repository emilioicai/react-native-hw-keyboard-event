declare module 'react-native-hw-keyboard-event';

export function onHWKeyPressed(hwKeyEvent: {pressedKey: string}): void;
export function removeHWKeyPressed(): void;

