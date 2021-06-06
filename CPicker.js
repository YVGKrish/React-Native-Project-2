import React from 'react';
import {View, Picker} from 'react-native';
import styles from './Styles';

const CPicker = ({value, onChange, children, cStyle, brdNone}) => {
    return (
        <View style={[styles.pickerWrapStyle, brdNone]}>
            <Picker style={[styles.pickerStyle, styles.c333, cStyle]} selectedValue={value} onValueChange={onChange}>
                {children}
            </Picker>
        </View>
    );
};

export {CPicker};