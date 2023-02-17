import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import { Button, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { registerStyle } from './register.style';

interface EmailPasswordScreenProps {
    navigation: any;
    route: any;
}

export const EmailPasswordScreen = (props: EmailPasswordScreenProps) => {

    const userInfo = props.route.params;

    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    return (
        <SafeAreaView style={registerStyle.containerStyle}>
            <ScrollView contentContainerStyle={registerStyle.scrollViewStyle}>
                <FormBuilder
                    control={control}
                    setFocus={setFocus}
                    formConfigArray={[
                        {
                            name: 'email',
                            type: 'email',
                            textInputProps: {
                                label: 'Email',
                                left: <TextInput.Icon name={'email'} />,
                            },
                            rules: {
                                required: {
                                    value: true,
                                    message: 'Email is required',
                                },
                                pattern: {
                                    value:
                                        /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
                                    message: 'Email is invalid',
                                },
                            },
                        },
                        {
                            name: 'password',
                            type: 'password',
                            textInputProps: {
                                label: 'Password',
                                left: <TextInput.Icon name={'lock'} />,
                            },
                            rules: {
                                required: {
                                    value: true,
                                    message: 'Password is required',
                                },
                                minLength: {
                                    value: 8,
                                    message: 'Password should be atleast 8 characters',
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'Password should be between 8 and 30 characters',
                                },
                            },
                        },
                    ]}
                />
                <Button
                    mode={'contained'}
                    onPress={handleSubmit((data: any) => {
                        auth()
                            .createUserWithEmailAndPassword(data.email, data.password)
                            .then((result) => {
                                const uid = result.user.uid;

                                firestore().collection('user_info').doc(uid).set({
                                    name: userInfo.formData.name,
                                    gender: userInfo.formData.gender,
                                    address: userInfo.formData.address,
                                    phone: userInfo.formData.phone
                                })

                                props.navigation.navigate('Home');
                            })
                            .catch(error => {
                                if (error.code === 'auth/email-already-in-use') {
                                    console.log('That email address is already in use!');
                                }

                                if (error.code === 'auth/invalid-email') {
                                    console.log('That email address is invalid!');
                                }
                            });
                    })}>
                    Register
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}