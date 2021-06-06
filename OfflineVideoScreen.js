import React, { Component } from 'react';
import {View, WebView,Text, NativeModules,Slider, StyleSheet, Dimensions, Image, TouchableOpacity , Alert} from 'react-native';
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import {CText} from '../common/index';

export default class OfflineVideoScreen extends Component {

    state = { videoRenderPath:'' };

    constructor(props) {
        super(props)
        this.state = { 
            // videoRenderPath:'/mnt/sdcard/decvideo.mp4',
            videoRenderPath:'',
            path:"" ,
            VarVolume:1.0,
            picVolume:require('../images/Video/volume3.png')
            
        };
    }

    componentWillMount(){
        this.topicName =  this.props.navigation.state.params.topicSelected;
        let sendVideoPath = "/" + this.props.navigation.state.params.topicSelected + '/' + this.props.navigation.state.params.videoPath;
        NativeModules.FetchVideos.GetAllOfflineVideos(sendVideoPath, (resp) => {
            if(resp==="Error"){
                Alert("Path or File not found!!");
            }else{
                this.setState({ videoRenderPath: resp });
            }
        });
    }

    componentDidMount(){
        Orientation.lockToLandscape();
    }

    componentWillUnmount(){
        Orientation.lockToPortrait();
        // let temp=this.state.path;
        NativeModules.FetchVideos.DeleteOfflineVideos((resp) => {
        });
    }

    mute(){
        this.setState({
            VarVolume:true
        })
      }
      _onProgress(data){
        }

        VolumeIcon(vol){
            this.setState({ VarVolume:vol}) 
            if(vol==0.0){
                this.setState({
                    picVolume:require('../images/Video/volume00.png')
                })
            }else if(vol<=0.3){
                this.setState({
                    picVolume:require('../images/Video/volume0.png')
                })
            }else if(vol<=0.6){
                this.setState({
                    picVolume:require('../images/Video/volume1.png')
                })
            }else if(vol<=0.9){
                this.setState({
                    picVolume:require('../images/Video/volume2.png')
                })
            }else{
                this.setState({
                    picVolume:require('../images/Video/volume3.png') 
                })               
            }
        }

    renderVideo(){
        if(this.state.videoRenderPath !== ''){
            return (
            // <VideoPlayer 
            //     source={{uri:this.state.videoRenderPath}}
            //     title= {this.topicName}
            //     onBack={() => null}
            //     disableBack={ true }
            // />
            <View style={{flex:1}} >
                <View style={{flex:1}}>
                <Video source={{uri: this.state.videoRenderPath}}   // Can be a URL or a local file. 
                    ref={(ref) => {
                        this.player = ref
                    }} 
                    seek={10000.0}                                  // Store reference 
                    rate={1.0}                              // 0 is paused, 1 is normal. 
                    volume={this.state.VarVolume}                            // 0 is muted, 1 is normal. 
                    muted={false}                           // Mutes the audio entirely. 
                    paused={false}                          // Pauses playback entirely. 
                    repeat={true}                           // Repeat forever. 
                    currentTime={this.state.Time}
                    playInBackground={false}                // Audio continues to play when app entering background. 
                    playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown. 
                    resizeMode="cover"                      // Fill the whole screen at aspect ratio.* 
                    ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual. 
                    progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms) 
                    onLoadStart={this.loadStart}            // Callback when video starts to load 
                    onLoad={this.setDuration}               // Callback when video loads 
                    onProgress={this.setTime}               // Callback every ~250ms with currentTime 
                    onEnd={this.onEnd}                      // Callback when playback finishes 
                    onError={this.videoError}               // Callback when video cannot be loaded 
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering 
                    onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata 
                    controls={true}
                    fullscreen={true}
                    onPlaybackRateChange={this.all}
                    style={styles.backgroundVideo} />
                </View>
                {/* <TouchableOpacity onPress={()=>this.fastfarward()} style={{flex:1,position:'absolute'}}>
                        <Text style={{fontSize:50}} >10X</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={()=>this.mute()} style={{flex:1,position:'absolute',top:0,right:0}}>
                        <Text style={{fontSize:50}} >Mute</Text>
                </TouchableOpacity> */}
                <View style={{position:'absolute', top:10, right:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <CText cStyle={{marginRight:60}}>{this.topicName}</CText>
                    <TouchableOpacity style={{paddingHorizontal:5, paddingVertical:3}} onPress={() => {
                        if(this.state.VarVolume === 0.0){
                            this.setState({ VarVolume: 1.0, picVolume:require('../images/Video/volume3.png') });
                        } else {
                            this.setState({ VarVolume: 0.0, picVolume:require('../images/Video/volume00.png') });
                        }
                    }}><Image style={{width:20, height:20}} source={this.state.picVolume} /></TouchableOpacity>
                    <Slider style={{width:180,height:50}} minimumValue={0.0} maximumValue={1.0}  step={0.1} value={this.state.VarVolume} onValueChange={val => {
                        this.VolumeIcon(val)}} thumbTintColor='#000' maximumTrackTintColor='#000' minimumTrackTintColor='#000' />
                </View>
            </View>
        )
        } else {
            return;
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                {this.renderVideo()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
  });


