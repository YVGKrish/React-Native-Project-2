import React, { Component } from 'react';
import {View, Text, Image, Platform, TextInput, ScrollView} from 'react-native';
import {CText, CButton} from '../common/index';
import styles from '../common/Styles';
import Utils from '../common/Utils';
import config from '../config/Config';
import CryptoJS from 'crypto-js';
import Orientation from 'react-native-orientation';

export default class ForgotPassword extends Component{
   
    state = {
        inpPassword: '', inpConpassword: '',inpMobile:'',inpEmail:''
    }; 

    componentWillMount(){
        Orientation.lockToPortrait();
    }

    submitForgot() {
        const self=this;
        if(!Utils.isValidMobile(Number(self.state.inpMobile))){
            alert('Please enter valid mobile number');
            return false;
        } else {
            Utils.dbCall(config.routes.forgotPassword, 'POST', null, { 
                phone:Number(self.state.inpMobile)
            }, function(resp){
                self.setState({ spinnerBool:false });
                if(resp.status){
                    alert('Please check your mobile for new password!!');
                    self.props.navigation.navigate('login');
                }
            });
        }
    }
    render(){
        return (
            <ScrollView style={styles.mainLayout}>
                <View>
                    <Image style={styles.logoImgStyle} source={require('../images/logo.png')} />
                </View>
                <View style={styles.aitCenter}>
                    <CText cStyle={[styles.screenHeader, styles.cBlue]}>FORGOT PASSWORD</CText>
                </View>
                {/* <View style={[styles.row, styles.authInputWrap, styles.bTLRad5, styles.bTRRad5, styles.mT20]}>
                    <View style={[styles.jCenter, styles.mR10]}><Image style={styles.inputImage} source={require('../images/mobile-icon.png')} /></View>
                    <TextInput style={styles.flex1} placeholder='New Password' underlineColorAndroid="transparent" secureTextEntry={true}
                    value={this.state.inpPassword} onChangeText={(inpPassword) => this.setState({inpPassword})}        />
                </View>
                <View style={[styles.row, styles.authInputWrap, styles.bBLRad5, styles.bBRRad5, styles.bTNone]}>
                    <View style={[styles.jCenter, styles.mR10]}><Image style={styles.inputImage} source={require('../images/mobile-icon.png')} /></View>
                    <TextInput style={styles.flex1} placeholder='Confirm Password' underlineColorAndroid="transparent" secureTextEntry={true} 
                    value={this.state.inpConpassword} onChangeText={(inpConpassword) => this.setState({inpConpassword})}/>
                </View> */}
                <View style={[styles.row, styles.authInputWrap, styles.bTLRad5, styles.bTRRad5, styles.mT20]}>
                        <View style={[styles.jCenter, styles.mR10]}><Image style={styles.inputImage} source={require('../images/mobile-icon.png')} /></View>
                        <TextInput style={styles.flex1} placeholder='Mobile Number' underlineColorAndroid="transparent"
                            value={this.state.inpMobile} onChangeText={(inpMobile) => this.setState({inpMobile})} keyboardType="numeric" />
                    </View>
                    {/* <View style={[styles.row, styles.authInputWrap, styles.bTLRad5, styles.bTRRad5, styles.mT20]}>
                        <View style={[styles.jCenter, styles.mR10]}><Image style={styles.inputImage} source={require('../images/mobile-icon.png')} /></View>
                        <TextInput style={styles.flex1} placeholder='Email' underlineColorAndroid="transparent"
                            value={this.state.inpEmail} onChangeText={(inpEmail) => this.setState({inpEmail})}  />
                    </View> */}
                <View>
                    <CButton onPress={() => this.submitForgot()}cStyle={styles.orgButton}><CText cStyle={styles.cFFF}>SUBMIT</CText></CButton>
                </View>
            </ScrollView>
        );
    }
}