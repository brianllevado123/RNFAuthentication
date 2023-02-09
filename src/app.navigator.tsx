import React, { useState } from "react";
import auth from '@react-native-firebase/auth';
import { AuthNavigator } from "./navigator/auth.navigator";
import { UserNavigator } from "./navigator/user.navigator";
import { useAuth } from "./hooks/useAuth";


export const AppNavigator = () => {

    const signedIn = useAuth();

    return (
        signedIn ? <UserNavigator /> : <AuthNavigator />
    )
}