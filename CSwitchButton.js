import React, { Component } from 'react';
import { Switch, View } from 'react-native';
import { CText } from './index';

const CSwitchButton = ({leftTitle, rightTitle, value, onValueChange, tintColor, onTintColor}) =>  {
    return (
        <View>
            <CText>{leftTitle}</CText>
            <View>
                <Switch
                    onValueChange={onValueChange}
                    value={value}
                    thumbTintColor='#fff'
                    tintColor={tintColor}
                    onTintColor= {onTintColor}
                />
            </View>
            <CText>{rightTitle}</CText>
        </View>

    );
};

export {CSwitchButton};