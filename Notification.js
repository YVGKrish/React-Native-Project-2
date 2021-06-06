import React,{Component} from 'react';
import {View, TouchableOpacity, ScrollView, WebView, Linking} from 'react-native';
import MenuHeader from '../common/MenuHeader';
import {CText, CSpinner} from '../common';
import Styles from '../common/Styles';
import Utils from '../common/Utils';
import Config from '../config/Config';

export default class Notification extends Component{

    state = {notifications:[], spinnerBool: true, token:''};

    componentWillMount(){
        const self = this;
        Utils.getToken('UserDetails',function(tResp, tStat){
            if(tStat){
                self.setState({token:tResp.token}, () => {
                    self.loadNotification();
                });
            }
        });
    }

    spinnerLoad() {
        if (this.state.spinnerBool)
            return <CSpinner/>;
        return false;
    }

    loadNotification(){
        Utils.dbCall(Config.routes.getNotifications, 'GET', {token:this.state.token}, {}, (nResp) => {
            this.setState({ spinnerBool: false });
            if(nResp.status){
                let tempNotifyData = nResp.data;
                for(let i = 0; i < tempNotifyData.length; i++){
                    tempNotifyData[i].status = false;
                }
                this.setState({ notifications: tempNotifyData });
            } else {
                if(resp.message.toString().indexOf('401') > -1){
                    AsyncStorage.clear();
                    alert('Your session has expired, Please login');
                    this.props.navigation.navigate('login');
                } else {
                    alert('Could not fetch notifications, try again');
                }
            }
        });
    }

    changeNotifyData(id){
        let tempNotifyData = this.state.notifications;
        for(let i = 0; i < tempNotifyData.length; i++){
            if(tempNotifyData[i]._id === id){
                tempNotifyData[i].status = true;
            } else {
                tempNotifyData[i].status = false;
            }
        }
        this.setState({ notifications: tempNotifyData });
        Utils.dbCall(Config.routes.saveNotificationLog, 'POST', {token:this.state.token}, {nid:id}, (nLogResp) => {
            if(nLogResp.status){
                this.renderMenuHeader();
            }
        });
    }
    
    renderNotifications(){
        if(this.state.notifications){
            let notifyData = this.state.notifications;
            let content = [];
            for(let i = 0; i < notifyData.length; i++){
                let title = notifyData[i].title;
                if(title.length > 35){
                    title = title.substring(0, 35) + '...';
                }
                if(notifyData[i].status){
                    content.push(<View key={i} style={Styles.marV5}>
                        <TouchableOpacity onPress={() => this.changeNotifyData(notifyData[i]._id)} 
                            style={[Styles.row, Styles.jSpaceBet, Styles.notificationHeader]}>
                            <CText cStyle={{color:'#4672B8'}}>{title}</CText>
                            <CText cStyle={{fontSize:16, width:10}}>-</CText>
                        </TouchableOpacity>
                        <ScrollView style={[Styles.notificationContent, {display:'flex'}]}>
                        <WebView style={{minHeight:150}} 
                            source={{html: notifyData[i].notification}} 
                            onNavigationStateChange={(event) => {
                                if (event.url !== notifyData[i].notification) {
                                    //this.webview.stopLoading();
                                    Linking.openURL(event.url);
                                }
                            }} />
                        </ScrollView>
                    </View>);
                } else {
                    content.push(<View key={i} style={Styles.marV5}>
                        <TouchableOpacity onPress={() => this.changeNotifyData(notifyData[i]._id)} 
                            style={[Styles.row, Styles.jSpaceBet, Styles.notificationHeader]}>
                            <CText cStyle={{color:'#4672B8'}}>{title}</CText>
                            <CText cStyle={{fontSize:16, width:10}}>+</CText>
                        </TouchableOpacity>
                    </View>);
                }
            }
            return content;
        } else {
            return;
        }
    }

    render(){
        return(
            <View style={[Styles.flex1, Styles.bgFFF]}>
                {this.spinnerLoad()}
                <MenuHeader
                    iconType='BACK'
                    menuClick={() => this.props.navigation.goBack()} 
                    profileClick={()=>this.props.navigation.navigate('profile')} 
                    notificationClick={()=>this.props.navigation.navigate('notification')}  
                />
                <View style={[Styles.notifyHeadingWrap]}>
                    <CText cStyle={[Styles.f14, Styles.padH5, Styles.notifyHeadingText]}>NOTIFICATIONS</CText>
                </View>
                <ScrollView style={[Styles.p20]}>
                    {this.renderNotifications()}
                </ScrollView>
            </View>
        );
    }
}
