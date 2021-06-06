import React, { Component } from 'react';
import {View, Image, Picker, ScrollView} from 'react-native';
import {CText, CMagazine} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';

export default class SubscribeMagazine extends Component{
    render(){
        return (
            <View style={styles.flex1}>
                <MenuHeader />
                <View style={[styles.aitCenter, styles.row, styles.innerTabs]}>
                    <CText cStyle={[styles.screenHeader, {paddingBottom:5}]}>New</CText>
                    <CText cStyle={[styles.screenHeader, styles.brdBottomBlue, {paddingBottom:5}]}>Subscribed</CText>
                </View>
                <View style={styles.mainLayout}>
                    <ScrollView>
                        <CMagazine buttonName='View' />
                        <CMagazine buttonName='View' />
                        <CMagazine buttonName='View' />
                    </ScrollView>
                </View>
            </View>
        );
    }
}