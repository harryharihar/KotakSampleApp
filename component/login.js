import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
  AsyncStorage,
} from "react-native";

export default function Login({ navigation }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const storeData = async (userName, password) => {
    try {
      await AsyncStorage.setItem("userName", userName);
      await AsyncStorage.setItem("password", password);
      navigation.navigate("ProductList", {});
    } catch (error) {
      // Error saving data
    }
  };

  const onPressLogin = () => {
    if (userName !== "" && password !== "") {
      storeData(userName, password);
    } else if (userName === "" && password === "") {
      ToastAndroid.showWithGravity(
        "user name & password can not  be empty !!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      if (userName === "") {
        ToastAndroid.showWithGravity(
          "User name can not be empty !!",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
      if (password === "") {
        ToastAndroid.showWithGravity(
          "Password can not be empty !!",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="User Name"
          placeholderTextColor="#003f5c"
          onChangeText={(userName) => setUserName(userName)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={onPressLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "bold",
  },
});
