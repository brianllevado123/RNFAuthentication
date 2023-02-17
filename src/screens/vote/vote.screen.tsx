import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { Button, List, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { voteStyle } from './vote.style';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useForm, useController } from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { PaperSelect } from 'react-native-paper-select';
import { format } from 'date-fns'
import { LogicProps } from 'react-native-paper-form-builder/dist/Types/Types';
import { userSession } from '../../hooks/userSession';

interface VoteScreenProps {
    navigation: any;
}

export const VoteScreen = (props: VoteScreenProps) => {

    const session = userSession();

    const signOut = () => {
        auth()
            .signOut()
    }

    const currentMonth = format(new Date(), 'LLLL');
    const currentYear = format(new Date(), 'yyyy')

    const { control, setFocus, handleSubmit, reset } = useForm({
        defaultValues: {
            vote: '',
            comment: '',
        },
        mode: 'onChange',
    });

    return (
        <SafeAreaView style={voteStyle.containerStyle}>
            <ScrollView contentContainerStyle={voteStyle.scrollViewStyle}>
                <Text>{currentMonth + ' ' + currentYear}</Text>
                <FormBuilder
                    control={control}
                    setFocus={setFocus}
                    formConfigArray={[
                        {
                            name: 'vote',
                            type: 'custom',
                            JSX: dropDown,
                        },
                        {
                            name: 'comment',
                            type: 'text',
                            textInputProps: {
                                label: 'Comment',
                                multiline: true,
                                numberOfLines: 5
                            },
                        },
                    ]}
                />
                <Button
                    mode={'contained'}
                    onPress={handleSubmit((data: any) => {
                        firestore()
                            .collection('votes/' + currentMonth + '_' + currentYear + '/one_point')
                            .doc(session.uid)
                            .set({
                                voted: data.vote,
                                comment: data.comment,
                            })
                    })}>
                    Submit
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
};

const dropDown = (props: LogicProps) => {
    const { name, rules, shouldUnregister, defaultValue, control } = props;
    const { field } = useController({
        name,
        rules,
        shouldUnregister,
        defaultValue,
        control,
    });

    const [voteFor, setVoteFor] = useState({
        value: '',
        selectedList: [],
        error: '',
    });

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            firestore()
                .collection('user_info')
                .orderBy('name', 'asc')
                .get()
                .then(querySnapshot => {
                    const employees = []
                    querySnapshot.forEach(documentSnapshot => {
                        employees.push({
                            _id: documentSnapshot.id,
                            value: documentSnapshot.data().name
                        })
                    });
                    return setEmployees(employees);
                });
        }

        fetchData();
    }, [])

    return (
        <PaperSelect
            label="Vote"
            value={voteFor.value}
            onSelection={(value: any) => {
                setVoteFor({
                    ...voteFor,
                    value: value.text,
                    selectedList: value.selectedList,
                    error: '',
                });
                field.onChange(value.selectedList[0].value)
            }}
            arrayList={[...employees]}
            selectedArrayList={voteFor.selectedList}
            errorText={voteFor.error}
            multiEnable={false}
        />
    );
}

