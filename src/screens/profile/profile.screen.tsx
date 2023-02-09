import React from 'react';
import { Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-paper';

interface ProfileScreenProps {
    navigation: any;
}

export const ProfileScreen = (props: ProfileScreenProps) => {

    const signOut = () => {
        auth()
            .signOut()
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Button mode='contained' onPress={signOut}>Sign out</Button>
        </View>
    );
};

