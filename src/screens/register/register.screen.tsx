import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Image, SafeAreaView, View, Text } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { registerStyle } from './register.style';
import { registerForm } from './register.form';
import DropDown from "react-native-paper-dropdown";
import { DatePickerInput } from 'react-native-paper-dates';
import { format } from 'date-fns'

interface RegisterScreenProps {
    navigation: any;
}

export const RegisterScreen = (props: RegisterScreenProps) => {


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('tabPress', (e) => {
            e.preventDefault();
        });
        return unsubscribe;
    }, [props.navigation]);


    const [showDropDown, setShowDropDown] = useState(false);
    const [gender, setGender] = useState('');
    const [inputDate, setInputDate] = useState(undefined);
    const startYear = new Date().getFullYear() - 100;
    const endYear = new Date().getFullYear();
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

                            }}
                            validationSchema={registerForm}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={
                                (values) => {
                                    const birthdate = format(new Date(inputDate), 'MM/dd/yyyy')
                                    props.navigation.navigate('Register2', {
                                        name: values.name,
                                        gender: gender,
                                        birthdate: birthdate,
                                        address: values.address,
                                        phone: values.phone
                                    })
                                }
                            }>
                            {({ handleSubmit, handleChange, errors, touched, setFieldTouched }) => (
                                <>
                                    <TextInput
                                        label="Name"
                                        onChangeText={handleChange('name')}
                                        onFocus={() => setFieldTouched('name')}
                                        style={registerStyle.textInput} />
                                    {
                                        touched.name && errors.name ?
                                            <Text style={{ color: "#FF0000" }}>{errors.name}</Text>
                                            : null
                                    }

                                    <View style={registerStyle.textInput} >
                                        <DropDown
                                            label={"Gender"}
                                            mode={"flat"}
                                            visible={showDropDown}
                                            showDropDown={() => setShowDropDown(true)}
                                            onDismiss={() => setShowDropDown(false)}
                                            value={gender}
                                            setValue={setGender}
                                            list={genderList}
                                            onChangeText={handleChange('gender')} />
                                    </View>

                                    <View style={registerStyle.textInput} >
                                        <DatePickerInput
                                            locale="en"
                                            label="Birthdate"
                                            value={inputDate}
                                            onChange={(d) => setInputDate(d)}
                                            inputMode="end"
                                            startYear={startYear}
                                            endYear={endYear}
                                            onChangeText={handleChange('birthdate')} />
                                    </View>

                                    <TextInput
                                        label="Address"
                                        onChangeText={handleChange('address')}
                                        onFocus={() => setFieldTouched('address')}
                                        style={registerStyle.textInput} />
                                    {
                                        touched.address && errors.address ?
                                            <Text style={{ color: "#FF0000" }}>{errors.address}</Text>
                                            : null
                                    }

                                    <TextInput
                                        label="Mobile Number"
                                        onChangeText={handleChange('phone')}
                                        onFocus={() => setFieldTouched('phone')}
                                        style={registerStyle.textInput} />
                                    {
                                        touched.phone && errors.phone ?
                                            <Text style={{ color: "#FF0000" }}>{errors.phone}</Text>
                                            : null
                                    }

                                    <Button mode='contained' onPress={handleSubmit}>Next</Button>
                                </>
                            )}
                        </Formik>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    )
}

