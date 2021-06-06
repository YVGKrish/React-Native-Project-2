import React, { Component } from 'react';
import {View, Image, Picker, ScrollView,Modal,TouchableOpacity,TextInput,Text, Button} from 'react-native';
import {CText, CourseVideoBox, CourseTestsBox, CourseEBooksBox, CButton, CInput, CSpinner} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';
import VideoScreen from './VideoScreen';
import Utils from '../common/Utils';
import Config from '../config/Config';
// import YouTube, {YouTubeStandaloneAndroid} from 'react-native-youtube';
import Orientation from 'react-native-orientation';

export default class CourseVideos extends Component{
    
    state = { showMe:false, doubts:'', videosData:this.props.navigation.state.params.videosData, token:'',
        videoId: '', videoText: '', spinnerBool: false, videoEnableBool: false, videoLink: '',
        tabActiveName: 'VIDEOS', videoActive: styles.brdBottomBlue, ebookActive: styles.brdBottomNone, testActive:styles.brdBottomNone,
        ebooksData: [], aVidStatus: this.props.navigation.state.params.aStat, testsData:[]
    };

    componentWillMount(){
        Orientation.lockToPortrait();
        if(this.props.navigation.state.params.videosData){
            const self = this;
            Utils.getToken('UserDetails',function(tResp, tStat){
                if(tStat){
                    self.setState({token:tResp.token}, () => {
                        // self.fetchEbooks();
                    });
                }
            });
        } else {
            alert('Could not fetch data');
        }
    }

    spinnerLoad() {
        if (this.state.spinnerBool)
            return <CSpinner/>;
        return false;
    }

    openModalAskDoubt(){
        this.setState({ showMe: !this.state.showMe });
    }

    fetchEbooks() {
        this.setState({ spinnerBool:true });
        Utils.dbCall(Config.routes.Ebooks + this.props.navigation.state.params.chapterId, 'GET', {token:this.state.token}, {}, (resp) => {
            this.setState({ spinnerBool:false });
            if(resp.status){
                this.setState({ ebooksData: Utils.sortByKey(resp.data, 'name') });
            } else {
                alert(resp.message);
            }
        });
    }

    fetchPracticeTests(){
        this.setState({ spinnerBool:true });
        Utils.dbCall(Config.routes.getPracticeTestList + this.props.navigation.state.params.chapterId, 'GET', {token:this.state.token}, {}, (resp) => {
            this.setState({ spinnerBool:false });
            if(resp.status){
                this.setState({ testsData: resp.data });
            } else {
                alert(resp.message);
            }
        });
    }

    renderAskDoubtPopup(){
        return (<Modal visible={this.state.showMe} transparent={true} style={{zIndex: 999}}
            onRequestClose={()=>console.warn('this is a close Request')}>
                <View style={[styles.flex1, styles.fadeBg]}>
                    <View style={[styles.bgFFF, styles.askDoubtPopupMainBg, styles.p20]}>
                        <View style={[styles.row, styles.jSpaceBet, styles.aitCenter]}>
                            <CText>Add New Doubt</CText>
                            <TouchableOpacity onPress={() => this.openModalAskDoubt()}>
                                <Image source={require('../images/close.png')} style={styles.askDoubtPopupCloseImg}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <CInput multiline={true} value={this.state.doubts} onChangeText={(doubts) => this.setState({doubts})} />
                        </View>
                        <View style={styles.aitEnd}>
                            <View style={[styles.row, styles.jSpaceArd]}>
                                <CButton cStyle={[styles.askDoubtBtns]} onPress={() => this.openModalAskDoubt()}>
                                    <CText cStyle={styles.c222}>Cancel</CText>
                                </CButton>
                                <CButton cStyle={[styles.askDoubtBtns, styles.askDoubtBtnBlue]} onPress={() =>this.submitAskDoubts()}>
                                    <CText cStyle={styles.cFFF}>Add</CText>
                                </CButton>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>)
    }

    submitAskDoubts() {
        const self = this;
        if(this.state.doubts!=''){
            this.setState({ spinnerBool:true });
            Utils.dbCall(Config.routes.AskDoubts, 'POST',{token:this.state.token},{ 
                chapterId: this.props.navigation.state.params.chapterId, 
                courseId: this.props.navigation.state.params.courseId, 
                subjectId: this.props.navigation.state.params.subjectId, 
                topic: this.props.navigation.state.params.topic + this.state.videoText, 
                videoId: this.state.videoId,
                doubt:this.state.doubts
            }, function(resp){
                self.setState({ spinnerBool:false });
                if(resp.status){
                    alert(resp.message);
                    self.setState({ showMe: !self.state.showMe });
                } else {
                    alert(resp.message);
                }
            });
        }
    }

    playVideo(link, id, name){
        this.setState({ videoLink:link, videoEnableBool:true, videoEnableName: name });
        // this.setState({ spinnerBool:true });
        // YouTubeStandaloneAndroid.playVideo({
        //     apiKey: 'AIzaSyBepjYd5T1qGZ683Iie4PbaBm9LpFCM3F8',     // Your YouTube Developer API Key
        //     videoId: link,     // YouTube video ID
        //     autoplay: true,             // Autoplay the video
        //     startTime: 0,             // Starting point of video (in seconds)
        //     modestbranding: true
        //   })
        //     .then(() => {
        //         console.log('Standalone Player Exited');
        //         this.setState({ spinnerBool:false });
        //     })
        //     .catch(errorMessage => console.error(errorMessage))
    }

    renderVideo(){
        if(this.state.videoEnableBool){
            //return (<VideoScreen videoId={this.state.videoLink} />);
            //return (<VideoScreen videoId='tCqmcSr0rYs' />);
            this.props.navigation.navigate('videoScreen', { 
                videoId: this.state.videoLink,
                chapterId: this.props.navigation.state.params.chapterId,
                startDate: new Date(),
                videoName: this.state.videoEnableName
            });
            // return (<YouTube videoId={this.state.videoLink} play={true} fullscreen={true} loop={true} controls={2}
            //     apiKey='AIzaSyBepjYd5T1qGZ683Iie4PbaBm9LpFCM3F8'
            //     onReady={e => this.setState({ isReady: true })}
            //     onChangeState={e => this.setState({ status: e.state })}
            //     onChangeQuality={e => this.setState({ quality: e.quality })}
            //     onError={e => this.setState({ error: e.error })}
            //     style={{height: 0 }} //resumePlayAndroid={false}
            // />);
        } else {
            return;
        }
    }

    renderMainContent (){
        let aStat = '';
        if(this.state.aVidStatus){
            aStat = this.state.aVidStatus;
        }
        if(this.state.tabActiveName === 'VIDEOS'){
            return this.state.videosData.map((data, i) => {
                return (<CourseVideoBox key={i}
                    data={data}
                    aStatus={aStat}
                    videoClick={() => this.playVideo(data.link, data._id, data.name)}
                    askDoubtClick={() => this.setState({
                        videoEnableBool: false,
                        videoId: data._id,
                        videoText: Utils.regexCheck(data.name, 'string') + ' ' + (i + 1)
                    }, () => { this.openModalAskDoubt(); })} 
                    PDFClick={() => {
                        this.setState({videoEnableBool: false});
                        this.props.navigation.navigate('Viewpdf', {
                            pdfLink: Config.routes.base + Config.routes.chapterPdfLink + data._id + '.pdf',
                        });
                    }}
                />)
            });
        } else if(this.state.tabActiveName === 'EBOOKS'){
            if(this.state.ebooksData){
                let eData = this.state.ebooksData;
                let content = [];
                for(let i = 0; i < eData.length; i++){
                    if(aStat === 'trail'){
                        if(eData[i].trail === true || eData[i].trail === 'true'){
                            content.push(<View key={i} style={styles.magazineWrap}>
                                <CText cStyle={styles.magazineTitle}>{eData[i].name}</CText>
                                <View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                                    <View style={styles.jEnd}>
                                        <CButton onPress={() => this.props.navigation.navigate('Viewpdf', {
                                            pdfLink: Config.routes.base + Config.routes.ebooksPdfLink + eData[i]._id + '.pdf',
                                        })} cStyle={[styles.roundButton, styles.courseVideoBtn, styles.courseVideoBtnBlue]} >
                                            <CText cStyle={[styles.f10, styles.cFFF]}>View PDF</CText>
                                        </CButton>
                                    </View>
                                </View>
                            </View>);
                        } else {
                            content.push(<View key={i} style={styles.magazineWrap}>
                                <CText cStyle={styles.magazineTitle}>{eData[i].name}</CText>
                                <View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                                    <View style={styles.jEnd}>
                                        <View style={[styles.roundButton, styles.courseVideoBtn, styles.courseDisableGreyBtn]}>
                                            <CText cStyle={[styles.f10, styles.cFFF]}>View PDF</CText>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <CText cStyle={{color:'#D20000', fontSize:12}}>*Purchase the lesson to use</CText>
                                </View>
                            </View>);
                        }
                    } else {
                        content.push(<View key={i} style={styles.magazineWrap}>
                            <CText cStyle={styles.magazineTitle}>{eData[i].name}</CText>
                            <View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                                <View style={styles.jEnd}>
                                    <CButton onPress={() => this.props.navigation.navigate('Viewpdf', {
                                        pdfLink: Config.routes.base + Config.routes.ebooksPdfLink + eData[i]._id + '.pdf',
                                    })} cStyle={[styles.roundButton, styles.courseVideoBtn, styles.courseVideoBtnBlue]} >
                                        <CText cStyle={[styles.f10, styles.cFFF]}>View PDF</CText>
                                    </CButton>
                                </View>
                            </View>
                        </View>);
                    }
                }
                return content;
            }
        } else if(this.state.tabActiveName === 'TESTS'){
            if(this.state.testsData){
                let content = [];
                let pTestData = this.state.testsData;
                for(let i = 0; i < pTestData.length; i++){
                    content.push(<View key={i} style={styles.magazineWrap}>
                        <CText cStyle={styles.magazineTitle}>{pTestData[i].name}</CText>
                        <View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                            <View style={styles.jEnd}>
                                <CButton onPress={() => this.startTestCall(pTestData[i]._id)} cStyle={[styles.roundButton, styles.courseVideoBtn, styles.courseVideoBtnBlue, { width:100}]} >
                                    <CText cStyle={[styles.f10, styles.cFFF]}>START TEST</CText>
                                </CButton>
                            </View>
                        </View>
                    </View>);
                }
                return content;
            }
        } else {
            return;
        }
    }

    startTestCall(selectedTestId){
        // alert(selectedTestId);
        this.setState({ spinnerBool:true });
        Utils.dbCall(Config.routes.startPracticeTest + selectedTestId, 'GET', {token:this.state.token}, {}, (resp) => {
            this.setState({ spinnerBool:false });
            if(resp.status){
                let tempStr = resp.data;
                for(let i = 0; i < tempStr.length; i++){
                    if(i === 0)
                        tempStr[i].aStatus = 'flex';
                    else
                        tempStr[i].aStatus = 'none';
                }
                this.props.navigation.navigate('practiceTest', { pData: tempStr });
            } else {
                alert(resp.message);
            }
        });
    }

    render(){
        return (
            <View style={styles.flex1}>
                {this.spinnerLoad()}
                <MenuHeader
                    iconType='BACK'
                    menuClick={() => this.props.navigation.goBack()} 
                    profileClick={()=>this.props.navigation.navigate('profile')} 
                    notificationClick={()=>this.props.navigation.navigate('notification')}  
                />
                <View style={[styles.aitCenter, styles.row, styles.innerTabs]}>
                    <TouchableOpacity onPress={() => this.setState({ 
                        tabActiveName: 'VIDEOS', 
                        videoActive: styles.brdBottomBlue,
                        testActive: styles.brdBottomNone,
                        ebookActive: styles.brdBottomNone
                    })}>
                        <CText cStyle={[styles.screenHeader, this.state.videoActive, {paddingBottom:5}]}>Videos</CText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>  this.setState({
                        videoEnableBool: false,
                        tabActiveName: 'EBOOKS',
                        videoActive: styles.brdBottomNone,
                        testActive: styles.brdBottomNone,
                        ebookActive: styles.brdBottomBlue
                    }, () => {
                        this.fetchEbooks();
                    })}>
                        <CText cStyle={[styles.screenHeader, this.state.ebookActive, {paddingBottom:5}]}>e-Books</CText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({
                        testActive: styles.brdBottomBlue,
                        videoActive: styles.brdBottomNone,
                        ebookActive: styles.brdBottomNone,
                        tabActiveName: 'TESTS',
                    }, () => {
                        this.fetchPracticeTests();
                    })}>
                        <CText cStyle={[styles.screenHeader, {paddingBottom:5}]}>Tests</CText>
                    </TouchableOpacity>
                </View>
                <View style={styles.mainLayout}>
                    <ScrollView>
                        
                        {this.renderMainContent()}
                        {this.renderVideo()}
                        <View>
                            {this.renderAskDoubtPopup()}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}