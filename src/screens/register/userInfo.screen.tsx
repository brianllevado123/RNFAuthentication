import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useController, useForm } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { LogicProps } from 'react-native-paper-form-builder/dist/Types/Types';
import { registerStyle } from './register.style';
import firestore from '@react-native-firebase/firestore';

interface UserInfoScreenProps {
    navigation: any;
}

export const UserInfoScreen = (props: UserInfoScreenProps) => {
    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            gender: '',
            address: '',
            phone: ''
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
                            type: 'text',
                            name: 'name',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Name is required',
                                },
                            },
                            textInputProps: {
                                label: 'Name',
                            },
                        },
                        {
                            name: 'gender',
                            type: 'select',
                            rules: {
                                required: {
                                    value: true,
                                    message: 'Gender is required',
                                },
                            },
                            textInputProps: {
                                label: 'Gender',
                            },
                            options: [
                                {
                                    value: 'Male',
                                    label: 'Male',
                                },
                                {
                                    value: 'Female',
                                    label: 'Female',
                                },
                                {
                                    value: 'Others',
                                    label: 'Others',
                                },
                            ],
                        },
                        {
                            type: 'text',
                            name: 'address',
                            rules: {
                                required: {
                                    value: true,
                                    message: 'Address is required',
                                },
                            },
                            textInputProps: {
                                label: 'Address',
                            },
                        },
                        {
                            type: 'text',
                            name: 'phone',
                            rules: {
                                required: {
                                    value: true,
                                    message: 'Mobile number is required',
                                },
                            },
                            textInputProps: {
                                label: 'Mobile Number',
                            },
                        },
                    ]}
                />
                <Button
                    mode={'contained'}
                    onPress={handleSubmit((data: any) => {
                        props.navigation.navigate('Email & Password', {
                            formData: data,
                        })
                    })}>
                    Next
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}

const selBirthDate = (props: LogicProps) => {
    const { name, rules, shouldUnregister, defaultValue, control } = props;
    const { field } = useController({
        name,
        rules,
        shouldUnregister,
        defaultValue,
        control,
    });
    const [inputDate, setInputDate] = useState(undefined);
    const startYear = new Date().getFullYear() - 100;
    const endYear = new Date().getFullYear();

    return (
        <View>
            <DatePickerInput
                mode="outlined"
                locale="en"
                label="Birthdate"
                value={inputDate}
                onChange={(d) => setInputDate(d)}
                inputMode="end"
                startYear={startYear}
                endYear={endYear}
                onChangeText={() => { field.onChange(inputDate) }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    scrollViewStyle: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    headingStyle: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 40,
    },
});
