const { ToastAndroid } = require("react-native");

const showToast = (msg) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};
