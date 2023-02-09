import React, { useState } from 'react';
import { Formik } from 'formik';
import { Image, SafeAreaView, View, Text } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { loginStyle } from './login.style';
import auth from '@react-native-firebase/auth';
import { loginForm } from './login.form';

interface LoginScreenProps {
    navigation: any;
}

export const LoginScreen = (props: LoginScreenProps) => {

    const register = () => props.navigation.navigate('RegisterNav');
    const [userExist, setUserExist] = useState(true);

    const userSignIn = (email, password) => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setUserExist(true);
                props.navigation.navigate('Home')
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    setUserExist(false);
                } else if (error.code === 'auth/wrong-password') {
                    setUserExist(false);
                }
            });
    }

    return (
        <SafeAreaView style={loginStyle.content}>
            <View style={loginStyle.formContainer}>
                <Card>
                    <Card.Content>
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validationSchema={loginForm}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={
                                (values) => {
                                    userSignIn(values.email, values.password)
                                }
                            }>
                            {({ handleSubmit, handleChange, errors, touched, setFieldTouched }) => (
                                <>
                                    <Image
                                        style={loginStyle.logo}
                                        source={require('../../../assets/images/logo/devtac-logo-home.png')} />
                                    {
                                        userExist == false ?
                                            <Text style={{ color: "#FF0000" }}>Incorrect email/password</Text>
                                            : null
                                    }
                                    <TextInput
                                        label="Email"
                                        keyboardType="email-address"
                                        onChangeText={handleChange('email')}
                                        onFocus={() => setFieldTouched('email')}
                                        style={loginStyle.textInput} />
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
                                        style={loginStyle.textInput} />
                                    {
                                        touched.password && errors.password ?
                                            <Text style={{ color: "#FF0000" }}>{errors.password}</Text>
                                            : null
                                    }
                                    <Button mode='contained' onPress={handleSubmit}>Login</Button>
                                    <Button onPress={register}>Register</Button>
                                </>
                            )}
                        </Formik>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    )
}

