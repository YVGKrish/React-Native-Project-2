import React, { Component } from 'react';
import {View, Image, TextInput, ScrollView,AsyncStorage} from 'react-native';
import {CText, CButton, CSpinner} from '../common/index';
import styles from '../common/Styles';
import Utils from '../common/Utils';
import config from '../config/Config';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import Orientation from 'react-native-orientation';

export default class Login extends Component{
    state = {
        inpMobile: '', inpPassword: '', spinnerBool: false,data:[],location:[]
    };
    componentWillMount()
    {
        Orientation.lockToPortrait();
        axios.get('http://ip-api.com/json').then(response=>this.setState({data:response.data}))
    }
    
    spinnerLoad() {
        if (this.state.spinnerBool)
            return <CSpinner/>;
        return false;
    }

    submitLogin(){
        const self = this;
        let mobileEmailTxt = self.state.inpMobile;
        if (Utils.isValidNumber(mobileEmailTxt) && !Utils.isValidMobile(Number(mobileEmailTxt))) {
            alert('Enter valid phone number');
            return false;
        } else if (!Utils.isValidNumber(mobileEmailTxt) && !Utils.isValidEmail(mobileEmailTxt)) {
            alert('Enter valid email id');
            return false;
        } else if(!Utils.isValidPassword(self.state.inpPassword)){
            alert('Enter valid password');
            return false;
        } else {
            if(Utils.isValidNumber(mobileEmailTxt)){
                mobileEmailTxt = Number(mobileEmailTxt);
            }
            self.setState({ spinnerBool:true });
            Utils.dbCall(config.routes.login, 'post', null, { 
                    phone: mobileEmailTxt, 
                    password:(self.state.inpPassword.toString()),
                    location:({ device: 'Mobile', city: this.state.data.city, lat: this.state.data.lat,
                    lon: this.state.data.lon, state: this.state.data.regionName, zip: this.state.data.zip}) 
                }, function(resp){
                    self.setState({ spinnerBool:false });
                    if(resp.status){
                        Utils.setToken('UserDetails', resp, function(tResp, tStat){
                            if(tStat){
                                self.props.navigation.navigate('dashboard');
                                // self.props.navigation.navigate('offMyCourses');
                            }
                        });
                    } else {
                        alert('Could not process, try again!!');
                    }
            }); 
        }
    }

    render(){
        return (
            <View style={styles.flex1}>
                {this.spinnerLoad()}
                <ScrollView style={styles.mainLayout}>
                    <View>
                        <Image style={styles.logoImgStyle} source={require('../images/logo.png')} />
                    </View>
                    <View style={styles.aitCenter}>
                        <CText cStyle={[styles.screenHeader, styles.cBlue]}>LOGIN</CText>
                    </View>
                    <View style={[styles.row, styles.authInputWrap, styles.bTLRad5, styles.bTRRad5, styles.mT20]}>
                        <View style={[styles.jCenter, styles.mR10]}><Image style={styles.inputImage} source={require('../images/mobile-icon.png')} /></View>
                        <TextInput style={styles.flex1} placeholder='Mobile No/ Email-id' underlineColorAndroid="transparent"
                            value={this.state.inpMobile} onChangeText={(inpMobile) => this.setState({inpMobile})} />
                    </View>
                    <View style={[styles.row, styles.authInputWrap, styles.bBLRad5, styles.bBRRad5, styles.bTNone]}>
                        <View style={[styles.jCenter, styles.mR10]}><Image style={styles.inputImage} source={require('../images/key-icon.png')} /></View>
                        <TextInput style={styles.flex1} placeholder='Password' underlineColorAndroid="transparent" secureTextEntry={true}
                            value={this.state.inpPassword} onChangeText={(inpPassword) => this.setState({inpPassword})} />
                    </View>
                    <View>
                        <CButton onPress={() => this.submitLogin()} cStyle={styles.orgButton}><CText cStyle={styles.cFFF}>LOGIN</CText></CButton>
                    </View>
                    <View style={[styles.aitCenter]}>
                        <CButton onPress={() => this.props.navigation.navigate('forgotPassword')}><CText>Forgot Password?</CText></CButton>
                    </View>
                    <View style={[styles.row, styles.jCenter, styles.mT30]}>
                        <CText>Don't have an account? </CText>
                        <CButton onPress={() => this.props.navigation.navigate('signUp')}><CText cStyle={styles.cBlue}>Sign Up</CText></CButton>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


// pwd:422vpk