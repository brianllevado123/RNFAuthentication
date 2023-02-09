import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LoginScreen } from "../screens/login/login.screen";
import { HomesScreen } from "../screens/home/home.screen";
import { RegisterScreen } from "../screens/register/register.screen";
import { Register2Screen } from "../screens/register/register2.screen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export const AuthNavigator = () => {

    const RegisterTab = () => {
        return (
            <Tab.Navigator initialRouteName="Register" screenOptions={{ headerShown: false, swipeEnabled: false }} tabPress={false}>
                <Tab.Screen name="Register" component={RegisterScreen} />
                <Tab.Screen name="Register2" component={Register2Screen} />
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