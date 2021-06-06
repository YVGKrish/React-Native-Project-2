import React, { Component } from 'react';
import {View, Image, Picker, ScrollView} from 'react-native';
import {CText, CButton, CInput} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';

export default class BankExams3 extends Component{
    render(){
        return (
            <View style={styles.flex1}>
                <MenuHeader />
                <View style={[styles.bankExamTitle, styles.aitCenter]}>
                    <CText cStyle={[styles.cBlue, styles.f16]}>BANK EXAMS</CText>
                </View>
                <ScrollView style={styles.mainLayout}>
                    <View style={styles.mT20}>
                        <View>
                            <CText>Address</CText>
                            <CInput multiline={true} />
                        </View>
                        <View>
                            <CText>City/Town</CText>
                            <CInput />
                        </View>
                        <View>
                            <CText>State</CText>
                            <CInput />
                        </View>
                        <View>
                            <CText>Pin Code</CText>
                            <CInput />
                        </View>
                        <View>
                            <CButton cStyle={styles.orgButton}>
                                <CText cStyle={styles.cFFF}>PURCHASE</CText>
                            </CButton>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}