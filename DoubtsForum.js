import React, { Component } from 'react';
import {View,Text, ScrollView,AsyncStorage, FlatList} from 'react-native';
import CAccordion from '../common/CAccordion';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';
import Utils from '../common/Utils';
import Config from '../config/Config';
import { CText, CSpinner } from '../common/index';
import Orientation from 'react-native-orientation';

const Token='Token';
const i=0;
export default class DoubtsForum extends Component{
    
    state = {
        token:'',
        doubtsData:[], spinnerBool: true
    };

    spinnerLoad() {
        if (this.state.spinnerBool)
            return <CSpinner/>;
        return false;
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
                    self.fetchDoubts();
                });
            }
        });
    }

    fetchDoubts(){
        Utils.dbCall(Config.routes.doubtsForums, 'GET', {token:this.state.token}, {}, (resp) => {
            this.setState({ spinnerBool:false });
            if(resp.status){
                let tempDoubtData = resp.data;
                for(let i = 0; i < tempDoubtData.length; i++){
                    tempDoubtData[i].accordStatus = 'none';
                }
                this.setState({ doubtsData:tempDoubtData });
            } else {
                if(resp.message.toString().indexOf('401') > -1){
                    AsyncStorage.clear();
                    alert('Your session has expired, Please login');
                    this.props.navigation.navigate('login');
                } else {
                    // alert(resp.message);
                }
            }
        })
    }

    accordClicked(value) {
        this.setState({ spinnerBool:true });
        Utils.dbCall(Config.routes.commentLink + value, 'GET', {token:this.state.token}, {}, (resp) => {
            this.setState({ spinnerBool:false });
            if(!resp.status){
                alert(resp.message);  
            }
            let tempDoubtData = this.state.doubtsData;
            for(let i = 0; i < tempDoubtData.length; i++){
                if(tempDoubtData[i]._id === value){
                    tempDoubtData[i].accordStatus = 'flex';
                    tempDoubtData[i].singleData = resp.data;
                } else {
                    tempDoubtData[i].accordStatus = 'none';
                    tempDoubtData[i].singleData = '';
                }
            }
            this.setState({ doubtsData:tempDoubtData });
        });
    }

    renderMainContent(){
        if(this.state.doubtsData.length > 0){
            return (<FlatList
                data={this.state.doubtsData}
                extraData={this.state}
                renderItem={({item, i}) => <CAccordion data={item} token={this.state.token} 
                    accordClick={() => this.setState({ spinnerBool: true }, () => {
                        this.accordClicked(item._id);
                    })} callBackAccord={this.refreshDoubts} />}
                keyExtractor={(item, index) => (index)}
            />)
        } else {
            return <CText cStyle={[styles.txtAlignCen, styles.f16]}>No Doubts data at present!!</CText>
        }
    }

    refreshDoubts = (value) => {
        this.setState({ spinnerBool:true });
        Utils.dbCall(Config.routes.commentLink + value, 'GET', {token:this.state.token}, {}, (resp) => {
            this.setState({ spinnerBool:false });
            // if(!resp.status){
            //     alert(resp.message);  
            // }
            let tempDoubtData = this.state.doubtsData;
            for(let i = 0; i < tempDoubtData.length; i++){
                if(tempDoubtData[i]._id === value){
                    tempDoubtData[i].accordStatus = 'flex';
                    tempDoubtData[i].singleData = resp.data;
                } else {
                    tempDoubtData[i].accordStatus = 'none';
                    tempDoubtData[i].singleData = '';
                }
            }
            this.setState({ doubtsData:tempDoubtData });
        });
    };

    render(){
        return (
            <View style={styles.flex1}>
                {this.spinnerLoad()}
                <MenuHeader
                    iconType='MENU'
                    menuClick={() => this.props.navigation.navigate('DrawerToggle')}
                    profileClick={()=>this.props.navigation.navigate('profile')} 
                    notificationClick={()=>this.props.navigation.navigate('notification')}  
                />
                <ScrollView style={[styles.mainLayout, styles.pTop20]}>
                    {this.renderMainContent()}
                </ScrollView>
            </View>
        );
    }
}