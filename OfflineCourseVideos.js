import React, { Component } from 'react';
import {View,NativeModules, Image, Picker, ScrollView,Modal,TouchableOpacity,TextInput,Text, Button} from 'react-native';
import {CText, CourseVideoBox, CPicker,CourseTestsBox, CourseEBooksBox, CButton, CInput, CSpinner} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';
import VideoScreen from './VideoScreen';
import Utils from '../common/Utils';
import Config from '../config/Config';
import Orientation from 'react-native-orientation';

export default class OfflineCourseVideos extends Component{
    
    state = { showMe:false, doubts:'',
        videoId: '', videoText: '', spinnerBool: false, videoEnableBool: false, videoLink: '',
        tabActiveName: 'VIDEOS', videoActive: styles.brdBottomBlue, testActive:styles.brdBottomNone,
        testsData:[], mainData: [], ErrorCommandState:false, multiPdf: [], topicSelected: ''
    };
    componentWillMount(){
        Orientation.lockToPortrait();
        let tempData = JSON.parse(this.props.navigation.state.params.JsonData);
        this.topicSelected = this.props.navigation.state.params.topicSelected;
        let mainCourseData = [];
        let count = 0;
        for(let i = 0; i < tempData.length; i++){
            if(tempData[i].topicName === this.topicSelected){
                tempData[i].multiPdfStat = 'none';
                tempData[i].id = count;
                mainCourseData.push(tempData[i]);
                count++;
            }
        }
        this.setState({ mainData: mainCourseData });
    }

    spinnerLoad() {
        if (this.state.spinnerBool)
            return <CSpinner/>;
        return false;
    }

    spinner(Videpath,Topicseleced){
        this.setState({spinnerBool:false}, () => {
            this.props.navigation.navigate('offVideoScreen', {
                videoPath: Videpath,
                topicSelected:Topicseleced
            })
        });
    }

    renderMultiPdf(){
        if(this.state.multiPdf){
            let content = [];
            content.push(<Picker.Item key={0} label='Select pdf' value='' />)
            for(let i = 0; i < this.state.multiPdf.length; i++){
                content.push(<Picker.Item key={i+1} label={this.state.multiPdf[i]} value={this.state.multiPdf[i]} />)
            }
            return content;
        } else {
            return <Picker.Item key={0} label='Select pdf' value='' />;
        }
    }

    fetchpdf(PdfPath, Topicselected, iVal){
        let tempPdf = PdfPath.replace('[', '');
        tempPdf = tempPdf.replace(']', '');
        let finalPdfArr = '';
        if(tempPdf.indexOf(',') > -1){
            let tempData = this.state.mainData;
            let mainCourseData = [];
            for(let i = 0; i < tempData.length; i++){
                if(tempData[i].id === iVal){
                    tempData[i].multiPdfStat = 'flex';
                    mainCourseData.push(tempData[i]);
                } else {
                    tempData[i].multiPdfStat = 'none';
                    mainCourseData.push(tempData[i]);
                }
            }
            finalPdfArr = tempPdf.split(',');
            this.setState({ multiPdf: finalPdfArr, topicSelected: Topicselected, mainData: mainCourseData });
        } else {
            finalPdfArr = tempPdf;
            this.props.navigation.navigate('offViewPdf', {
                pdfPath: finalPdfArr,
                topicSelected:Topicselected
            });
        }
    }

    loadpdf(pdfSelected){
        this.props.navigation.navigate('offViewPdf', {
            pdfPath: pdfSelected,
            topicSelected: this.state.topicSelected
        })
    }

    checkStorage(i){
        NativeModules.FetchTests.GetStorage((resp) => {
            if(resp){
                resp=resp.split("$&$");
                if (resp[0]<=400) {
                    alert("Insufficient Internal Storage");
                } else {
                    this.setState({spinnerBool:true}, () => {
                        setTimeout(() => {
                            this.spinner(this.state.mainData[i].videoName, this.topicSelected);
                        }, 2000)
                    })
                }
            }
        });
    }

    renderMainContent(){
        if(this.state.mainData){
            let content = [];
            for(let i = 0; i < this.state.mainData.length; i++){
                this.state['multiPdfVisible' + i] = 'none';
                content.push(<View key={i} style={styles.magazineWrap}>  
                    <CText cStyle={styles.magazineTitle}>{this.state.mainData[i].lessonName}</CText>
                    <View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                    <View style={[styles.jEnd]}>
                        <CButton onPress={() => {
                            this.checkStorage(i);
                        }} cStyle={[styles.roundButton, styles.courseVideoBtn, styles.courseVideoBtnBlue]}>
                            <CText cStyle={[styles.f10, styles.cFFF]}>Play Video</CText>
                        </CButton>
                    </View>
                    <View style={styles.jEnd}>
                        <CButton cStyle={[styles.roundButton, styles.courseVideoBtn]}  onPress={()=>this.fetchpdf(this.state.mainData[i].pdfs, this.topicSelected, this.state.mainData[i].id)} >
                            <CText cStyle={styles.f10}>Lesson PDF</CText>
                        </CButton>
                    </View>
                    <Picker style={{width:100, height:40, borderWidth:1, borderColor:'#DDD', display: this.state.mainData[i].multiPdfStat}} value={this.state['pdf' + i]} 
                        onValueChange={(value) => { this.setState({ ['pdf' + i]:value }, () => { if(value !== '') this.loadpdf(this.state['pdf' + i]); }) }}>
                        {this.renderMultiPdf()}
                    </Picker>
                    {/* <View style={styles.jEnd}>
                        <CButton cStyle={[styles.roundButton, styles.courseVideoBtn]}  >
                            <CText cStyle={styles.f10}>Ask Doubt</CText>
                        </CButton>
                    </View> */}
                </View>
                </View>)
            }
            return content;
        } else {
            return;
        }
    }

    render(){
        return (
            <View style={styles.flex1}>
                {this.spinnerLoad()}
                <MenuHeader
                    Offstatus={true}
                    iconType='BACK'
                    menuClick={() => this.props.navigation.goBack()} 
                    profileClick={()=>this.props.navigation.navigate('profile')} 
                    notificationClick={()=>this.props.navigation.navigate('notification')}  
                />
                <View style={styles.mainLayout}>
                    <ScrollView>
                        {this.renderMainContent()}
                    </ScrollView>
                </View>
            </View>
        );
    }
}