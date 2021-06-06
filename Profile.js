import React,{Component} from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity,
    Modal, Button, TextInput, AsyncStorage } from 'react-native';
import {CText, CSpinner} from '../common/index';
import styles from '../common/Styles';
import Utils from '../common/Utils';
import Config from '../config/Config';
import MenuHeader from '../common/MenuHeader';
import Orientation from 'react-native-orientation';

export default class Profile extends Component{
    state = {
        modalVisible: false, profileData: [], token:'', fatherName: '', cityName: '', userName: '', profilePic: '',
        spinnerBool: true
     }

    componentWillMount(){
        Orientation.lockToPortrait();
        const self = this;
        AsyncStorage.getItem('chakravarthysir:UserDetails', (err, resp) => {
            if(err)
                callBack('Error fetching token', false);
            else {
                let tResp = JSON.parse(resp);
                self.setState({token:tResp.token}, () => {
                    self.fetchProfileDetails();
                });
            }
        });
    }

    spinnerLoad() {
        if (this.state.spinnerBool)
            return <CSpinner/>;
        return false;
    }

    fetchProfileDetails(){
        Utils.dbCall(Config.routes.getprofile, 'GET', {token:this.state.token}, {}, (resp) => {
            this.setState({ spinnerBool: false });
            if(resp.status){
                if(resp.data.hasOwnProperty('profilePic')){
                    this.setState({ profilePic: resp.data.profilePic });
                }
                if(resp.data.fathername && resp.data.city){
                    this.setState({ profileData:resp.data, userName:resp.data.name, fatherName: resp.data.fathername, cityName: resp.data.city });
                } else {
                    this.setState({ profileData:resp.data, userName:resp.data.name });
                }
            } else {
                if(resp.message.toString().indexOf('401') > -1){
                    AsyncStorage.clear();
                    alert('Your session has expired, Please login');
                    this.props.navigation.navigate('login');
                } else {
                    alert(resp.message);
                }
            }
        })
    }
    
    submitProfileDetails(){
        if(this.state.fatherName === ''){
            alert('Please provide your father name');
            return false;
        } else if(this.state.cityName === ''){
            alert('Please provide your city name');
            return false;
        } else {
            this.setState({ spinnerBool: true });
            Utils.dbCall(Config.routes.editProfile, 'POST', {token:this.state.token}, {
                name: this.state.profileData.name,
                email: this.state.profileData.email,
                phone: this.state.profileData.phone,
                _id: this.state.profileData._id,
                fathername: this.state.fatherName,
                city: this.state.cityName
            }, (proUpResp) => {
                this.setState({ spinnerBool: false });
                if(proUpResp.status){
                    alert('Your profile updated successfully');
                    this.edit(false);
                    this.fetchProfileDetails();
                } else {
                    alert('Could not update your profile, try again later');
                }
            });
        }
    }

    edit(visible) {
        this.setState({ modalVisible: visible });
    }

    renderUpdateFields(value){
        if(value){
            return <CText>{value}</CText>;
        } else {
            return <CText>-</CText>;
        }
    }

    renderProfilePic(){
        if(this.state.profilePic){
            return <Image style={styles.profileImage} source={{uri:Config.routes.base + Config.routes.profileImg + this.state.profilePic}} />;
        } else {
            return <Image style={[styles.profileImage]} source={require('../images/profile.png')} />;
        }
    }

    render(){
        return(
            <View style={[styles.flex1, styles.bgFFF]}>
                {this.spinnerLoad()}
                <MenuHeader
                    iconType='BACK'
                    menuClick={() => this.props.navigation.goBack()} 
                    profileClick={()=>this.props.navigation.navigate('profile')} 
                    notificationClick={()=>this.props.navigation.navigate('notification')}  
                />
                <View style={[styles.bgBlue, styles.profileWrap]}>
                    <View style={[styles.jCenter, styles.aitCenter]}>
                        <View>
                            <CText cStyle={[styles.cFFF, styles.p10, styles.f18]}>MY PROFILE</CText>
                        </View>
                        <View style={styles.profileUpdateIcon}>
                            <TouchableOpacity onPress={() => (this.edit(true))} >
                                <Image style={styles.imgWH20} source={require('../images/contact/contact_edit_profile.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.jCenter, styles.aitCenter, styles.marV10]}>
                        <View style={styles.profilePicWrap}>
                            {this.renderProfilePic()}
                        </View>
                        {/* <View style={styles.profileImgEditIcon}>
                            <Image source={require('../images/edit.png')} style={styles.imgWH20} />
                        </View> */}
                    </View> 
                </View>
                <Modal onRequestClose={() => null}
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <View style={styles.fadeBg}>
                        <View style={[styles.profileForm, styles.p10]}>
                            <TouchableOpacity style={[styles.aslStretch]} onPress={() => this.edit(false)}>
                                <CText cStyle={[styles.padH20, styles.padV5, styles.f18, styles.txtAlignRt]}>X</CText>
                            </TouchableOpacity>
                            <TextInput style={{width:250}} value={this.state.userName} placeholder="Username" editable={false} 
                                selectTextOnFocus={false} onChangeText={(value) => this.setState({ userName:value })} />
                            <TextInput style={{width:250}} value={this.state.fatherName} placeholder="Father Name"
                                onChangeText={(value) => this.setState({ fatherName:value })} />
                            <TextInput style={{width:250}} value={this.state.cityName} placeholder="City"
                                onChangeText={(value) => this.setState({ cityName:value })}  />
                            <Button title='Submit' style={[styles.bgBlue, {borderRadius:5}]} onPress={() => this.submitProfileDetails()} />
                        </View>
                    </View>
                </Modal>

                <View style={[styles.jCenter]}>
                    <View style={[styles.row, styles.p10, styles.padV15, styles.brdBottomProfile]}>
                        <CText cStyle={styles.fBold}>Name: </CText>
                        <CText>{this.state.profileData.name}</CText>
                    </View>
                    <View style={[styles.row, styles.p10, styles.padV15, styles.brdBottomProfile]}>
                        <CText cStyle={styles.fBold}>Mobile Number: </CText>
                        <CText>{this.state.profileData.phone}</CText>
                    </View>
                    <View style={[styles.row, styles.p10, styles.padV15, styles.brdBottomProfile]}>
                        <CText cStyle={styles.fBold}>Email ID: </CText>
                        <CText>{this.state.profileData.email}</CText>
                    </View>
                    <View style={[styles.row, styles.p10, styles.padV15, styles.brdBottomProfile]}>
                        <CText cStyle={styles.fBold}>Father Name: </CText>
                        {this.renderUpdateFields(this.state.profileData.fathername)}
                    </View>
                    <View style={[styles.row, styles.p10, styles.padV15, styles.brdBottomProfile]}>
                        <CText cStyle={styles.fBold}>City: </CText>
                        {this.renderUpdateFields(this.state.profileData.city)}
                    </View>
                </View>
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#F5FCFF',
//     },
    
//   });