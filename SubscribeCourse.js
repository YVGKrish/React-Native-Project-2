import React, { Component } from 'react';
import {View, Image, Picker, ScrollView} from 'react-native';
import {CText, CButton, CPicker, CInput} from '../common/index';
import styles from '../common/Styles';

export default class SubscribeCourse extends Component{
    render(){
        return (
            <ScrollView style={styles.mainLayout}>
                <View>
                    <Image style={styles.logoImgStyle} source={require('../images/logo.png')} />
                </View>
                <View style={styles.aitCenter}>
                    <CText cStyle={[styles.screenHeader, styles.cBlue]}>SUBSCRIBE COURSE</CText>
                </View>
                <View style={{marginTop:20}}>
                    <CPicker>
                        <Picker.Item label="Course Type" value="" />
                    </CPicker>
                    <CPicker>
                        <Picker.Item label="Mode" value="" />
                    </CPicker>
                    <CPicker>
                        <Picker.Item label="Duration" value="" />
                    </CPicker>
                    <CInput placeholder='Price' />
                    <View>
                        <CButton cStyle={styles.orgButton}><CText cStyle={styles.cFFF}>SUBSCRIBE</CText></CButton>
                    </View>
                    <View style={[styles.aitCenter, styles.mT10]}>
                        <CButton onPress={() => this.props.navigation.navigate('dashboard')}><CText>SKIP</CText></CButton>
                    </View>
                </View>
            </ScrollView>
        );
    }
}