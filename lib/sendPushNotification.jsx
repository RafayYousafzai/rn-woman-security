import { Alert } from "react-native";

export const sendPushNotification = async (userData, title, body) => {
  if (!userData?.trustedContacts || userData.trustedContacts.length === 0) {
    Alert.alert(
      "No Trusted Contacts",
      "Please add trusted contacts below to send an emergency alert.",
      [{ text: "OK", style: "default" }]
    );
    return;
  }

  const expoPushTokens = userData.trustedContacts
    .map((contact) => contact.expoPushToken)
    .filter((token) => token);

  if (expoPushTokens.length === 0) {
    Alert.alert(
      "No Valid Tokens",
      "None of your contacts have a valid push notification token. Please ensure your contacts have the app installed.",
      [{ text: "OK", style: "default" }]
    );
    return;
  }

  console.log("Sending alert to:", expoPushTokens);
  

  try {
    const payload = {
      to: expoPushTokens,
      title: title,
      body: body,
    };

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(response);
    

    if (!response.ok) {
      throw new Error(`Failed to send alert. Status: ${response.status}`);
    }

    Alert.alert(
      "Alert Sent Successfully",
      "Your trusted contacts have been notified of your emergency.",
      [{ text: "OK", style: "default" }]
    );
  } catch (error) {
    console.error("Error sending alert:", error);
    Alert.alert(
      "Error Sending Alert",
      "We couldn't send your alert. Please check your internet connection and try again.",
      [{ text: "OK", style: "default" }]
    );
  }
};
