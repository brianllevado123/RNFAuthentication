import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

export const useAuth = () => {
    const [signedIn, setSignedIn] = useState('false');

    auth().onAuthStateChanged((user) => {
        if (user) {
            setSignedIn(true)
        } else {
            setSignedIn(false)
        }
    });

    return signedIn;
}