import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../redux/actions/actions";
import Dialog from "react-native-dialog";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CartList({ navigation }) {
  const items = useSelector((state) => state);
  const dispatch = useDispatch();
  const removeItems = (index) => {
    dispatch(removeItemFromCart(index));
  };
  const [visible, setVisible] = useState(false);
  const [itemValue, setItems] = useState("");

  const [userName, setUserName] = useState("");

  const getUserName = async () => {
    try {
      const value = await AsyncStorage.getItem("userName");
      if (value !== null) {
        setUserName(value);
      }
    } catch (error) {}
  };
  const showDialog = (item) => {
    setVisible(true);
    setItems(item);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    //console.log("tttt");
    getUserName();
  });

  return (
    <View style={{ flex: 1 }}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>{itemValue.productName}</Dialog.Title>
        <Dialog.Description>{itemValue.description}</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <WebView
          style={{ flex: 1 }}
          source={{
            uri: itemValue.video,
          }}
          javaScriptEnabled={true}
        />
      </Dialog.Container>

      <Text
        style={{
          textAlign: "center",
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#16BBD2",
          paddingHorizontal: 5,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Welcome {userName}
      </Text>

      <FlatList
        data={items}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              marginTop: 15,
              paddingTop: 15,
              paddingBottom: 15,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
            }}
            onPress={() => {
              showDialog(item);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                padding: 10,
                fontSize: 16,
                fontWeight: "bold",
                color: "#3E3E3D",
              }}
            >
              {item.productName}
            </Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                color: "#066281",
              }}
            >
              <Button
                title="Remove"
                onPress={() => {
                  removeItems(index);
                }}
              ></Button>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
