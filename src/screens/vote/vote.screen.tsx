import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button, Card, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { voteStyle } from './vote.style';
import DropDown from "react-native-paper-dropdown";
import { Formik } from 'formik';

interface VoteScreenProps {
    navigation: any;
}

export const VoteScreen = (props: VoteScreenProps) => {

    const signOut = () => {
        auth()
            .signOut()
    }

    const [showDropDown, setShowDropDown] = useState(false);
    const [voteFor, setVoteFor] = useState('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         database().ref('users').on('value', snapshot => {
    //             const voteFor = []
    //             snapshot.forEach((child) => {
    //                 console.log(child)
    //                 // voters.push({
    //                 //     id: child.key,
    //                 //     name: child.val().name,
    //                 //     comment: child.val().comment,
    //                 // })
    //             })
    //             return setVoteFor(voteFor)
    //         })
    //     }

    //     fetchData();
    // }, [])
    const genderList = [
        {
            label: "Male",
            value: "male",
        },
        {
            label: "Female",
            value: "female",
        },
        {
            label: "Others",
            value: "others",
        },
    ];

    return (
        <SafeAreaView style={voteStyle.content}>
            <View style={voteStyle.formContainer}>
                <Card>
                    <Card.Content>
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={
                                (values) => {
                                    null
                                }
                            }>
                            {({ handleSubmit, handleChange, errors, touched, setFieldTouched }) => (
                                <>
                                    <DropDown
                                        label={"Gender"}
                                        mode={"outlined"}
                                        visible={showDropDown}
                                        showDropDown={() => setShowDropDown(true)}
                                        onDismiss={() => setShowDropDown(false)}
                                        value={voteFor}
                                        setValue={setVoteFor}
                                        list={genderList}
                                    />
                                </>
                            )}
                        </Formik>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    );
};

