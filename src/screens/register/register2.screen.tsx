import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Image, SafeAreaView, View, Text } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { registerStyle } from './register.style';
import auth from '@react-native-firebase/auth';
import { registerForm } from './register.form';

interface RegisterScreenProps {
    navigation: any;
    route: any;
}

export const Register2Screen = (props: RegisterScreenProps) => {

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('tabPress', (e) => {
            e.preventDefault();
        });

        return unsubscribe;
    }, [props.navigation]);

    const [showDropDown, setShowDropDown] = useState(false);
    const [gender, setGender] = useState('');
    const [inputDate, setInputDate] = useState(undefined)
    const startYear = new Date().getFullYear() - 100;
    const endYear = new Date().getFullYear();
    const userInfo = props.route.params;

    const userSignUp = (name, address, phone, email, password) => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {

                props.navigation.navigate('Home')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
            });
    }

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
        <SafeAreaView style={registerStyle.content}>
            <View style={registerStyle.formContainer}>
                <Card>
                    <Card.Content>
                        <Formik
                            initialValues={{
                                name: '',
                                address: '',
                                phone: '',
                                email: '',
                                password: '',
                                confirmPassword: ''
                            }}
                            validationSchema={registerForm}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={
                                (values) => {
                                    null
                                }
                            }>
                            {({ handleSubmit, handleChange, errors, touched, setFieldTouched }) => (
                                <>
                                    <TextInput
                                        label="Email"
                                        keyboardType="email-address"
                                        onChangeText={handleChange('email')}
                                        onFocus={() => setFieldTouched('email')}
                                        style={registerStyle.textInput} />
                                    {
                                        touched.email && errors.email ?
                                            <Text style={{ color: "#FF0000" }}>{errors.email}</Text>
                                            : null
                                    }

                                    <TextInput
                                        label="Password"
                                        secureTextEntry={true}
                                        onFocus={() => setFieldTouched('password')}
                                        onChangeText={handleChange('password')}
                                        style={registerStyle.textInput} />
                                    {
                                        touched.password && errors.password ?
                                            <Text style={{ color: "#FF0000" }}>{errors.password}</Text>
                                            : null
                                    }

                                    <TextInput
                                        label="Confirm Password"
                                        secureTextEntry={true}
                                        onFocus={() => setFieldTouched('confirmPassword')}
                                        onChangeText={handleChange('confirmPassword')}
                                        style={registerStyle.textInput} />

                                    <Button mode='contained' onPress={handleSubmit}>Register</Button>
                                </>
                            )}
                        </Formik>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    )
}

