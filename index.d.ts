declare module "react-native-hw-keyboard-event";

type keyboardEventHandler = (evt: { pressedKey: string }) => void

export function onHWKeyPressed(hwKeyEvent: keyboardEventHandler): void;
export function removeOnHWKeyPressed(): void;
