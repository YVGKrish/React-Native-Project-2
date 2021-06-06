import React, { Component } from 'react';
import {View, Image, Picker, ScrollView} from 'react-native';
import {CText, CButton, CInput} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';

export default class BankExams2 extends Component{
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
                            <CText>Name</CText>
                            <CInput />
                        </View>
                        <View>
                            <CText>E-Mail ID</CText>
                            <CInput />
                        </View>
                        <View>
                            <CText>Phone Number</CText>
                            <CInput />
                        </View>
                        <View>
                            <CText>Product Information</CText>
                            <CInput />
                        </View>
                        <View>
                            <CButton cStyle={styles.orgButton} onPress={() => this.props.navigation.navigate('bankExams3')}>
                                <CText cStyle={styles.cFFF}>Next</CText>
                            </CButton>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}