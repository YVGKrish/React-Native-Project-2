import React, { Component } from 'react';
import {View, Image, Picker, ScrollView} from 'react-native';
import {CText, CButton, CInput} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';

export default class BankExams1 extends Component{
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
                            <CText>Course Name</CText>
                            <CInput />
                        </View>
                        <View>
                            <CText>Type</CText>
                            <CInput />
                        </View>
                        <View>
                            <CText>Mode</CText>
                            <CInput />
                        </View>
                        <View>
                            <CText>Duration</CText>
                            <CInput />
                        </View>
                        <View>
                            <CText>Price</CText>
                            <CInput />
                        </View>
                        <View>
                            <CButton cStyle={styles.orgButton} onPress={() => this.props.navigation.navigate('bankExams2')}>
                                <CText cStyle={styles.cFFF}>Next</CText>
                            </CButton>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}