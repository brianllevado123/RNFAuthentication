import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

export const userSession = () => {
    const [session, setSession] = useState({
        uid: ''
    });

    if (session.uid == '') {
        auth().onAuthStateChanged((user) => {
            setSession({
                uid: user.uid,
            });
        });
    }

    return session;
}