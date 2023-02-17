import React from 'react';
import { Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HomesScreenProps {
    navigation: any;
}

export const HomesScreen = (props: HomesScreenProps) => {

    return (
        <SafeAreaView>
            <View>
                <Card>
                    <Text>Homescreen</Text>
                </Card>
            </View>
        </SafeAreaView>

    );
};

