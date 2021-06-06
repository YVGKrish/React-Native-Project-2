import React, { Component } from 'react';
import {View, Image, TextInput} from 'react-native';
import {CText, CButton} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';

export default class Dashboard extends Component{

    navigateToScreen(screenName){
        this.props.navigation.navigate(screenName);
    }

    render(){
        
        return (
            <View style={styles.flex1}>
                <MenuHeader menuClick={() => this.props.navigation.navigate('DrawerToggle')} profileClick={()=>this.props.navigation.navigate('profile')} notificationClick={()=>this.props.navigation.navigate('notification')} />
                <View style={[styles.mainLayout, {paddingTop: 20}]}>
                    <View style={styles.aitCenter}>
                        <CText>DASHBOARD</CText>
                    </View>
                    <View>
                        <CButton onPress={() => this.navigateToScreen('subscribeCourse')} 
                            cStyle={[styles.dashboardButtons, styles.dashboardBtnBlueBg]}>
                            <CText cStyle={styles.cFFF}>Subscribe Course</CText>
                        </CButton>
                        <CButton onPress={() => this.navigateToScreen('doubtsForum')}
                            cStyle={[styles.dashboardButtons]}>
                            <CText cStyle={styles.cBlue}>Doubts Forum</CText>
                        </CButton>
                        <CButton onPress={() => this.navigateToScreen('Contact')}
                            cStyle={[styles.dashboardButtons]}>
                            <CText cStyle={styles.cBlue}>Free Content</CText>
                        </CButton>
                        <CButton onPress={() => this.navigateToScreen('mockTest')}
                            cStyle={[styles.dashboardButtons]}>
                            <CText cStyle={styles.cBlue}>Mock Test</CText>
                        </CButton>
                        <CButton onPress={() => this.navigateToScreen('subscribeNewMockTest')}
                            cStyle={[styles.dashboardButtons]}>
                            <CText cStyle={styles.cBlue}>Subscribe Mock Test</CText>
                        </CButton>
                    </View>
                </View>
            </View>
        );
    }
}