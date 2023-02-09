import React, { useEffect } from 'react';


export const preventTabPress() => {
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('tabPress', (e) => {
            e.preventDefault();
        });
        return unsubscribe;
    }, [props.navigation]);
}