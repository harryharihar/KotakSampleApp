import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/actions/actions";
import Dialog from "react-native-dialog";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductList({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [item, setItems] = useState("");
  const [userName, setUserName] = useState("");

  const getUserName = async () => {
    try {
      const value = await AsyncStorage.getItem("userName");
      if (value !== null) {
        setUserName(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const showDialog = (item) => {
    setVisible(true);
    setItems(item);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const dispatch = useDispatch();

  const addItems = (item) => {
    dispatch(addItemToCart(item));
  };

  const items = useSelector((state) => state);

  const getProductList = async () => {
    try {
      const response = await fetch(
        "https://mocki.io/v1/d46dc365-f752-46ee-b0cd-c136aec38e00"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductList();
    getUserName();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            alignSelf: "center",
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

        <Text
          style={{
            textAlign: "right",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 8,
            paddingBottom: 8,
            fontSize: 16,
            fontWeight: "bold",
            backgroundColor: "yellow",
          }}
          onPress={() => {
            navigation.navigate("CartList", {});
          }}
        >
          CartList {items.length}
        </Text>
      </View>

      <Dialog.Container visible={visible}>
        <Dialog.Title>{item.productName}</Dialog.Title>
        <Dialog.Description>{item.description}</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <WebView
          style={{ flex: 1 }}
          source={{
            uri: item.video,
          }}
          javaScriptEnabled={true}
        />
      </Dialog.Container>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View>
              <View
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
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 10,
                    marginHorizontal: 10,
                  }}
                >
                  <View style={[{ width: "50%" }]}>
                    <Button
                      title="Detail"
                      color="#EDBB10"
                      onPress={() => {
                        showDialog(item);
                      }}
                    ></Button>
                  </View>
                  <View style={[{ width: "50%", marginLeft: 5 }]}>
                    <Button
                      title="Add To Cart"
                      color="#066281"
                      onPress={() => {
                        addItems(item);
                      }}
                    ></Button>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
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
