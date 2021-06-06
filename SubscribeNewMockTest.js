import React, { Component } from 'react';
import {View, Image, Picker, ScrollView} from 'react-native';
import {CText, CButton, CPicker, CInput} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';

export default class SubscribeNewMockTest extends Component{
    render(){
        return (
            <View style={styles.flex1}>
                <MenuHeader />
                <ScrollView style={styles.mainLayout}>
                    <View style={[styles.aitCenter,styles.mT20]}>
                        <CText cStyle={[styles.screenHeader, styles.cBlue]}>SUBSCRIBE COURSE</CText>
                    </View>
                    <View style={styles.mT20}>
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
                            <CButton cStyle={styles.orgButton} onPress={() => this.props.navigation.navigate('mockBuyNow')}>
                                <CText cStyle={styles.cFFF}>SUBSCRIBE</CText>
                            </CButton>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}