import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LoginScreen } from "../screens/login/login.screen";
import { HomesScreen } from "../screens/home/home.screen";
import { UserInfoScreen } from "../screens/register/userInfo.screen";
import { EmailPasswordScreen } from "../screens/register/emailPassword.screen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export const AuthNavigator = () => {

    const RegisterTab = () => {
        return (
            <Tab.Navigator initialRouteName="User Info" screenOptions={{ headerShown: false, swipeEnabled: false }} tabPress={false}>
                <Tab.Screen name="User Info" component={UserInfoScreen} />
                <Tab.Screen name="Email & Password" component={EmailPasswordScreen} />
            </Tab.Navigator >
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="RegisterNav" component={RegisterTab} />
                <Stack.Screen name="Home" component={HomesScreen} />
            </Stack.Navigator >
        </NavigationContainer>
    )
}