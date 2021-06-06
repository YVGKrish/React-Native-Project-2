import React, { Component } from 'react';
import {View, Image, Picker, ScrollView} from 'react-native';
import {CText, CButton, CPicker, CInput} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';

export default class MockBuyNow extends Component{
    render(){
        return (
            <View style={styles.flex1}>
                <MenuHeader />
                <ScrollView style={styles.mainLayout}>
                    <View style={styles.mT20}>
                        <View>
                            <CText cStyle={[styles.cBlue]}>Mock Test Categories</CText>
                        </View>
                        
                        <View style={{backgroundColor:'#EEE',marginVertical:2,padding:5, borderLeftWidth:3,
                            borderLeftColor:'#DDD'}}>
                            <CText>IBPS PO Preliminary</CText>
                        </View>

                        <View style={[styles.aitCenter,styles.mT10, styles.mB10]}>
                            <CText cStyle={[styles.cBlue]}>5000</CText>
                        </View>
                        <View>
                            <CButton cStyle={styles.orgButton} onPress={() => this.props.navigation.navigate('bankExams1')}>
                                <CText cStyle={styles.cFFF}>BUY NOW</CText>
                            </CButton>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}