import React, { Component } from 'react';
import {View, Image,TouchableOpacity, AsyncStorage} from 'react-native';
import {CText} from './index';
import styles from './Styles';
import Utils from './Utils';
import Config from '../config/Config';

export default class MenuHeader extends Component {

    state = {notifyCount:0, token:'',Offbool:'flex'}

    componentWillMount(){
        const self = this;
        if(this.props.Offstatus){
            this.setState({
                Offbool:'none'
            });
        }else{
        Utils.getToken('UserDetails',function(tResp, tStat){
            if(tStat){
                self.setState({token:tResp.token});
                Utils.dbCall(Config.routes.getNotificationCount, 'GET', {token:tResp.token}, {}, (nResp) => {
                    if(nResp.status){
                        self.setState({ notifyCount: nResp.data });
                    } else {
                        if(nResp.message.toString().indexOf('401') > -1){
                            AsyncStorage.clear();
                            alert('Your session has expired, Please login');
                            this.props.navigation.navigate('login');
                        } else {
                            //alert(resp.message);
                        }
                    }
                });
            } else {
                AsyncStorage.clear();
                this.props.navigation.navigate('login');
            }
        });
    }
    }

    renderLeftIcon(typeVal){
        if(typeVal === 'BACK'){
            return <Image style={{width:30, height:25,resizeMode:'contain'}} source={require('../images/back-icon.png')} />;
        } else {
            return <Image style={{width:30, height:25}} source={require('../images/menu-icon.png')} />;
        }
    }

    render() {
        return (
            <View>
                <View style={[styles.row, styles.menuHeaderStyle, {justifyContent:'space-between'}]}>
                    <TouchableOpacity style={[styles.padH10]} onPress={this.props.menuClick}>
                        {this.renderLeftIcon(this.props.iconType)}
                    </TouchableOpacity>
                    <View style={[styles.row,{display:this.state.Offbool}]}  >
                        <TouchableOpacity onPress={this.props.profileClick} >
                        <Image style={{width:30, height:25, marginRight: 10, resizeMode:'contain'}} source={require('../images/user-icon.png')} />
                        </TouchableOpacity>                        
                        <View>
                        <TouchableOpacity style={{flex:1}} onPress={this.props.notificationClick} >
                            <View style={styles.notifyCountStyle}>
                                <CText cStyle={{color:'#FFF', fontSize:8}}>{this.state.notifyCount}</CText></View>
                                <Image style={{width:30, height:25, resizeMode:'contain'}} source={require('../images/notification-icon.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}