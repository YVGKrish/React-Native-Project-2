import React from 'react';
import {View, TextInput} from 'react-native';
import styles from './Styles';

const CInput = ({cStyle, keyboardType, onChangeText, placeholder, multiline, value}) => {
    return (
        <View style={styles.inputWrapStyle}>
            <TextInput style={[styles.inputStyle, styles.c333, cStyle]} onChangeText={onChangeText} keyboardType={keyboardType}
                underlineColorAndroid="transparent" value={value}
                placeholder={placeholder} multiline={multiline || false}
            />
        </View>
    );
};

export {CInput};