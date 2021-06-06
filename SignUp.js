import React, { Component } from 'react';
import {View, Image, TextInput, ScrollView} from 'react-native';
import {CText, CButton, CSpinner} from '../common/index';
import Utils from '../common/Utils';
import config from '../config/Config';
import styles from '../common/Styles';
import CryptoJS from 'crypto-js';
import Orientation from 'react-native-orientation';

export default class SignUp extends Component{
    state = {
        inpName:'', inpEmail: '' ,inpMobile: '', inpPassword:'', inpConfirmPassword:'',
        inpSecretKey: '', spinnerBool: false, firstInputs: 'flex', secondInputs: 'none', 
        mobileStyle: [styles.bTNone, styles.bBLRad5, styles.bBRRad5]
    };

    componentWillMount(){
        Orientation.lockToPortrait();
    }

    spinnerLoad() {
        if (this.state.spinnerBool)
            return <CSpinner/>;
        return false;
    }

    VerifySignUp()
    {
        const self=this;
        if(self.state.inpSecretKey===''){
            alert('Enter the secret key received on mobile number');
            return false;
        }  else {
            //mobileStyle:[styles.bTLRad5, styles.bTRRad5, styles.mT20]
            self.setState({ firstInputs:'none', secondInputs:'flex', spinnerBool: true });            
            Utils.dbCall(config.routes.verifySignUp, 'POST', null, {  
                phone:Number(self.state.inpMobile),
                otp:self.state.inpSecretKey
                //password:CryptoJS.SHA3(self.state.inpSecretKey).toString(),
             }, function(resp){
                self.setState({ spinnerBool:false });
                if(resp.status){
                    alert("Your registration process successfully completed");
                    self.props.navigation.navigate('login');
                }
            });
        }
    }

    submitSignUp(){
        const self = this;
        if(self.state.inpName === ''){
            alert('Enter your name')
            return false;
        } else if (!Utils.isValidEmail(self.state.inpEmail)) {
            alert('Enter valid email')
            return false;
        } else if(!Utils.isValidMobile(Number(self.state.inpMobile))){
            alert('Enter valid mobile number ')
            return false;
        }else if(!Utils.isValidPassword(self.state.inpPassword)){
            alert('Enter your password');
            return false;
        } else if(!Utils.isValidPassword(self.state.inpConfirmPassword)){
            alert('Enter confirm password');
            return false;
        } else if(self.state.inpPassword !== self.state.inpConfirmPassword){
            alert('Password and confirm password did not match');
            return false;
        } else {
            self.setState({ spinnerBool: true });
            Utils.dbCall(config.routes.signUp, 'POST', null, {
                name:self.state.inpName, phone:Number(self.state.inpMobile), email:self.state.inpEmail,password: self.state.inpPassword, 
            }, function(resp){
                if(resp.status){
                    self.setState({ spinnerBool:false, firstInputs:'none', secondInputs:'flex', 
                    mobileStyle:[styles.bTLRad5, styles.bTRRad5, styles.mT20] });
                } else {
                    alert(resp.message);
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
                        <CText cStyle={[styles.screenHeader, styles.cBlue]}>SIGN UP</CText>
                    </View>
                    <View style={[styles.row, styles.authInputWrap, styles.bTLRad5, styles.bTRRad5, styles.mT20, {display:this.state.firstInputs}]}>
                        <View style={[styles.jCenter, styles.mR10]}><Image style={styles.inputImage} source={require('../images/text-user-icon.png')} /></View>
                        <TextInput style={styles.flex1} placeholder='Your Name' underlineColorAndroid="transparent"
                            value={this.state.inpName} onChangeText={(inpName) => this.setState({inpName})} />
                    </View>
                    <View style={[styles.row, styles.authInputWrap, styles.bTNone, {display:this.state.firstInputs}]}>
                        <View style={[styles.jCenter, styles.mR10]}><Image style={styles.inputImage} source={require('../images/mobile-icon.png')} /></View>
                        <TextInput style={styles.flex1} placeholder='Email id' underlineColorAndroid="transparent"
                            value={this.state.inpEmail} onChangeText={(inpEmail) => this.setState({inpEmail})} />
                    </View>                
                    <View style={[styles.row, styles.authInputWrap, {display:this.state.firstInputs}, this.state.mobileStyle]}>
                        <View style={[styles.jCenter, styles.mR10]}><Image style={styles.inputImage} source={require('../images/mobile-icon.png')} /></View>
                        <TextInput style={styles.flex1} placeholder='Mobile Number' underlineColorAndroid="transparent" 
                        value={this.state.inpMobile} onChangeText={(inpMobile) => this.setState({inpMobile})} />
                    </View>
                    <View style={[styles.row, styles.authInputWrap, styles.bTLRad5, styles.bTRRad5, {display:this.state.secondInputs}]}>
                        <View style={[styles.jCenter, styles.mR10]}><Image style={styles.inputImage} source={require('../images/key-icon.png')} /></View>
                        <TextInput style={styles.flex1} placeholder='Secret Key' underlineColorAndroid="transparent"
                         value={this.state.inpSecretKey} onChangeText={(inpSecretKey) => this.setState({inpSecretKey})} />
                    </View>
                    <View style={[styles.row, styles.authInputWrap, styles.bTNone, {display:this.state.firstInputs}]}>
                        <View style={[styles.jCenter, styles.mR10]}><Image style={styles.inputImage} source={require('../images/key-icon.png')} /></View>
                        <TextInput style={styles.flex1} placeholder='New Password' underlineColorAndroid="transparent"
                         value={this.state.inpPassword} onChangeText={(inpPassword) => this.setState({inpPassword})} secureTextEntry={true}/>
                    </View>
                    <View style={[styles.row, styles.authInputWrap, styles.bBLRad5, styles.bBRRad5, styles.bTNone, {display:this.state.firstInputs}]}>
                        <View style={[styles.jCenter, styles.mR10]}><Image style={styles.inputImage} source={require('../images/key-icon.png')} /></View>
                        <TextInput style={styles.flex1} placeholder='Confirm New Password' underlineColorAndroid="transparent" secureTextEntry={true}
                        value={this.state.inpConfirmPassword} onChangeText={(inpConfirmPassword) => this.setState({inpConfirmPassword})} />
                    </View>
                    <View style={{display:this.state.firstInputs}}>
                        <CButton cStyle={styles.orgButton} onPress={() => this.submitSignUp()}>
                            <CText cStyle={styles.cFFF}>CONTINUE</CText>
                        </CButton>
                    </View>
                    <View style={{display:this.state.secondInputs}}>
                        <CButton cStyle={styles.orgButton} onPress={() => this.VerifySignUp()}>
                            <CText cStyle={styles.cFFF}>GET START</CText>
                        </CButton>
                    </View>
                    <View style={[styles.row, styles.jCenter, styles.mT20]}>
                        <CText>Already have an account? </CText>
                        <CButton onPress={() => this.props.navigation.navigate('login')}><CText cStyle={styles.cBlue}>Login Now</CText></CButton>
                    </View>
                </ScrollView>
            </View>
        );
    }
}