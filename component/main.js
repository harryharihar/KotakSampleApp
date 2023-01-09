import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../component/login";
import ProductList from "../component/product_list";
import CartList from "../component/added_cart";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="CartList" component={CartList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
