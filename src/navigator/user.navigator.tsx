import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomesScreen } from "../screens/home/home.screen";
import { ProfileScreen } from "../screens/profile/profile.screen";
import { VoteScreen } from "../screens/vote/vote.screen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { Navigator, Screen } = createBottomTabNavigator();

export const UserNavigator = () => {
    return (
        <NavigationContainer>
            <Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    headerShown: false,

                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                        } else if (route.name === 'Vote') {
                            iconName = focused ? 'vote' : 'vote-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'account-settings' : 'account-settings-outline';
                        }

                        // You can return any component that you like here!
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#06456a',
                    tabBarInactiveTintColor: 'gray',
                })}>
                <Screen name="Home" component={HomesScreen} />
                <Screen name="Vote" component={VoteScreen} />
                <Screen name="Profile" component={ProfileScreen} />
            </Navigator >
        </NavigationContainer>
    )
}