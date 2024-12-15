import { ToastAndroid } from "react-native";

export const showToast = (msg: string): void => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};
