import React, { Component } from 'react';
import {View, WebView, Slider, Dimensions, Image, Alert, TouchableOpacity, NativeModules} from 'react-native';
import Orientation from 'react-native-orientation';
import Utils from '../common/Utils';
import Config from '../config/Config';
import { CText } from '../common/index';
import styles from '../common/Styles';

export default class VideoScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { videoStartTime: 0, videoBool: false, videoEndTime:'', token:'', isConnected:true, loadingBool: 'none' };
    }

    componentWillMount(){
        // var hms = '01:16:17';   // your input string
        // var a = hms.split(':'); // split it at the colons
        // // minutes are worth 60 seconds. Hours are worth 60 minutes.
        // var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
        // var trash = this.setState.distance;
        if(this.props.navigation.state.params.videoId){
            const self = this;
            Utils.getToken('UserDetails',function(tResp, tStat){
                if(tStat){
                    self.setState({token:tResp.token});
                    self.videoId = self.props.navigation.state.params.videoId;
                    fetch('https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id='+ self.videoId +'&key=AIzaSyBepjYd5T1qGZ683Iie4PbaBm9LpFCM3F8')
                    .then((response) => response.json())
                    .then( (responseData) => {
                        if(responseData.hasOwnProperty('items')){
                            if(responseData.items[0].hasOwnProperty('contentDetails')){
                                if(responseData.items[0].contentDetails.hasOwnProperty('duration')){
                                    self.setState({ 
                                        videoBool: true, 
                                        videoEndTime: self.ytDurationToSeconds(responseData.items[0].contentDetails.duration)
                                    });
                                }
                            }
                        } else {
                            alert('Error playing video');
                        }
                    })
                    .done();
                }
            });
        } else {
            alert('Could not fetch data');
        }
    }

    componentDidMount(){
        Orientation.lockToLandscape();
        NativeModules.FetchVideos.GetNetInfo((resp) => {
            if(!resp){
                this.setState({ loadingBool:'flex'});
            }
        });
    }

    componentWillUnmount(){
        Orientation.lockToPortrait();
        Utils.dbCall(Config.routes.saveVideoLog, 'POST', {token:this.state.token}, {
            chapterId: this.props.navigation.state.params.chapterId,
            device: 'mobile',
            startDate: this.props.navigation.state.params.startDate,
            videoName: this.props.navigation.state.params.videoName
        }, (resp) => {
            //no response to be taken care, as this is only for saving logtime.
        });
    }

    ytDurationToSeconds(duration) {
        var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        match = match.slice(1).map(function(x) {
          if (x != null) {
              return x.replace(/\D/, '');
          }
        });
        var hours = (parseInt(match[0]) || 0);
        var minutes = (parseInt(match[1]) || 0);
        var seconds = (parseInt(match[2]) || 0);
        return hours * 3600 + minutes * 60 + seconds;
    }
    renderMainContent(){
        if(this.state.videoBool){
            return (<View style={{flex:1, padding:5}}>
                <TouchableOpacity onPress={() => console.log('hi')} activeOpacity={0.8} style={{flex:1}} onLongPress ={()=>{
                    this.setState({ videoStartTime: this.state.videoStartTime + 2 });
                    Alert.alert('Warning', 'Sorry, This feature is not available.',
                        [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false })
                }}>
                    <WebView
                        source={{uri: 'https://www.youtube.com/embed/'+ this.videoId +'?autoplay=1&controls=0&rel=0&showinfo=0&start='+
                            this.state.videoStartTime + '&end=' + this.state.videoEndTime + '&iv_load_policy=3&cc_load_policy=0&cc_lang_pref=en&wmode=transparent&modestbranding=1&disablekb=1&origin=http%3A%2F%2F52.66.98.65%3A3000&enablejsapi=1&widgetid=1'}}
                        style={{alignSelf:'stretch'}} 
                    />
                </TouchableOpacity>
                <View style={[styles.videoNetworkError, {display:this.state.loadingBool}]}>
                    <Image source={require('../images/error-icon.png')} style={{width:100, height:72, resizeMode:'contain'}} />
                    <CText cStyle={styles.networkErrorText}>Could not connect to network. Please check your internet connection.</CText>
                </View>
                <View style={styles.videoSeekBar}>
                    <Slider step={1} minimumValue={0} maximumValue={this.state.videoEndTime} minimumTrackTintColor = "#009688"
                        value={this.state.videoStartTime} style = {{width: '75%'}} 
                        onValueChange={val => {
                            NativeModules.FetchVideos.GetNetInfo((resp) => {
                                if(resp){
                                    this.setState({ videoStartTime: val, loadingBool:'none' });
                                } else {
                                    this.setState({ loadingBool:'flex'});
                                }
                            });
                        }}
                    />
                </View>
                <View style={styles.videoLogoBox}>
                    <Image style={{width:120, height:70, resizeMode:'contain'}} source={require('../images/logo.png')} />
                </View>
            </View>);
        }
        return;
    }

    render() {
        return (
            <View style={{flex:1, padding:0, margin:0}}>
                {this.renderMainContent()}
            </View>
        );
    }
}