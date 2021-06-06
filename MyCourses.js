import React, { Component } from 'react';
import {View, Picker,AsyncStorage, Switch} from 'react-native';
import {CText, CButton, CPicker, CSpinner} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';
import axios from 'axios';
import Utils from '../common/Utils';
import Config from '../config/Config';
import Orientation from 'react-native-orientation';

const Token='access_token';
// const tokens='tokens';

export default class MyCourses extends Component{
    state={coursesData: [], course:'', subject:'', lesson:'',subjectData: [],lessonData:[], Res:[],
        token:'', spinnerBool: true, buttonCount: 0, onlineToggleBool: true
    };

    navigateToVideos()
    {
        if(this.state.course==''){
            alert('please select a valid course');
        } else if(this.state.subject==''){
            alert('please select a valid subject');
        } else if(this.state.lesson==''){
            alert('please select a valid chapter');
        } else {
            if(this.state.buttonCount === 0){
                this.setState({ buttonCount: 1 });
                let subjectStr = this.state.subject;
                Utils.dbCall(Config.routes.getOnlineVideos + this.state.lesson, 'GET', {token:this.state.token}, {}, (resp) => {
                    if(resp.status){
                        let chapterId = this.state.lesson.split('###');
                        this.setState({ buttonCount: 0 });
                        this.props.navigation.navigate('courseVideos', { 
                            aStat: resp.aStatus,
                            videosData: Utils.sortByKey(resp.data, 'name'), 
                            chapterId: Utils.splitString(this.state.lesson, '###')[0],
                            courseId: Utils.splitString(this.state.course, '###')[0],
                            subjectId: Utils.splitString(this.state.subject, '###')[0],
                            topic: Utils.splitString(this.state.course, '###')[1] + '>' +
                            Utils.splitString(this.state.subject, '###')[2] + '>' +
                            Utils.regexCheck(Utils.splitString(this.state.lesson, '###')[2], 'string') + '>'
                        });
                    } else {
                        if(resp.message.toString().indexOf('401') > -1){
                            AsyncStorage.clear();
                            alert('Your session has expired, Please login');
                            this.props.navigation.navigate('login');
                        } else {
                            alert(resp.message);
                        }
                    }
                });
            }
        }
    }

    componentWillMount(){
        Orientation.lockToPortrait();
        const self = this;
        Utils.getToken('UserDetails',function(tResp, tStat){
            if(tStat){
                self.setState({token:tResp.token}, () => {
                    self.fetchCourses();
                });
            }
        });
    }

    spinnerLoad() {
        if (this.state.spinnerBool)
            return <CSpinner/>;
        return false;
    }

    fetchCourses(){
        Utils.dbCall(Config.routes.getAllCourses, 'GET', {token:this.state.token}, {}, (resp) => {
            this.setState({ spinnerBool:false, buttonCount: 0 });
            if(resp.status){
                this.setState({ coursesData: resp.data, subject: '', lesson: '', subjectData:[], lessonData:[] });
            } else {
                if(resp.message.toString().indexOf('401') > -1){
                    AsyncStorage.clear();
                    alert('Your session has expired, Please login');
                    this.props.navigation.navigate('login');
                } else {
                    alert(resp.message);
                }
            }
        });
    }

    fetchSubjects(){
        if(this.state.course && this.state.course !== '###undefined'){
            this.setState({ spinnerBool:true });
            Utils.dbCall(Config.routes.getSubjects + Utils.splitString(this.state.course, '###')[0], 'GET', {token:this.state.token}, {}, (resp) => {
                this.setState({ spinnerBool:false, buttonCount: 0 });
                if(resp.status){
                    this.setState({ subjectData: resp.data, lesson:'' });
                } else {
                    if(resp.message.toString().indexOf('401') > -1){
                        AsyncStorage.clear();
                        alert('Your session has expired, Please login');
                        this.props.navigation.navigate('login');
                    } else {
                        alert(resp.message);
                    }
                }
            });
        } else {
            this.setState({ subject: '', lesson: '', subjectData:[], lessonData:[] });
        }
    }
    fetchLesson(aSubId){
        if(this.state.subject){
            this.setState({ spinnerBool:true });
            Utils.dbCall(Config.routes.chapter + aSubId + '&courseId='+ Utils.splitString(this.state.course, '###')[0] +
                '&device=webOnline&subjectId=' + Utils.splitString(this.state.subject, '###')[0],
                'GET', {token:this.state.token}, {}, (resp) => {
                this.setState({ spinnerBool:false, buttonCount: 0 });
                if(resp.status){
                    this.setState({ lessonData: Utils.sortByKey(resp.data, 'name') });
                } else {
                    if(resp.message.toString().indexOf('401') > -1){
                        AsyncStorage.clear();
                        alert('Your session has expired, Please login');
                        this.props.navigation.navigate('login');
                    } else {
                        alert(resp.message);
                    }
                }
            });
        } else {
            this.setState({ lesson: '', lessonData:[] });
        }
    }

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
                <View style={styles.mainLayout}>
                    <View style={{marginTop:20}}>

                        <View style={[styles.row, styles.jCenter, styles.aitCenter, styles.mBtm10]}>
                            <CText cStyle={[styles.mRt10]}>OFFLINE</CText>
                            <Switch onTintColor="#EEE" tintColor="#CCC" thumbTintColor="#3AB54A" onValueChange={(value) => this.setState({ onlineToggleBool: value }, () => {
                                this.props.navigation.navigate('offMyCourses')
                            })} 
                                value={this.state.onlineToggleBool}  /> 
                            <CText cStyle={[styles.mLt10]}>ONLINE</CText>
                        </View>
                        
                        <CPicker value={this.state.course} onChange={(value) => { 
                            let val = Utils.splitString(value, '###');
                            this.setState({course:val[0]+'###'+val[1]}, () => {
                                this.fetchSubjects(); 
                            })
                        }}>
                            <Picker.Item label='Select Course' value='' />
                            {
                                this.state.coursesData.map((data, i) => {
                                    return (<Picker.Item key={i} label={data.name} value={data._id+'###'+data.name} />);
                                })
                            }
                        </CPicker>
                        <CPicker value={this.state.subject} onChange={(value) => { 
                            let val = Utils.splitString(value, '###');
                            this.setState({subject:val[0]+'###'+val[1]+'###'+val[2]}, () => {
                                if(val[1]) this.fetchLesson(val[1]);
                            })
                        }}>
                            <Picker.Item label="Subject" value="" />
                            {
                                this.state.subjectData.map((data, i) => {
                                    return (<Picker.Item key={i} label={data.name} value={data._id+'###'+data.asubId+'###'+data.name} />);
                                })
                            }
                        </CPicker >
                        <CPicker value={this.state.lesson} onChange={(value) => { 
                            let val = Utils.splitString(value, '###');
                            this.setState({lesson:val[0]+'###'+val[1]+'###'+val[2]});
                            //if(val[1] === true || val[1] === 'true') this.setState({lesson:val[0]+'###'+val[1]+'###'+val[2]});
                            //else if(val[1] === false || val[1] === 'false'){ alert('This lesson is not availble for trial'); this.setState({lesson:''}); }
                        }}>
                            <Picker.Item label="Lesson Name" value="" />
                            {
                                this.state.lessonData.map((data, i) => {
                                    return (<Picker.Item key={i} label={data.name} value={data._id+'###'+data.trail+'###'+data.name} />);
                                })
                            }
                        </CPicker>
                        <View>
                            <CButton onPress={() => {
                                this.navigateToVideos();
                            }} 
                                cStyle={styles.orgButton}>
                                <CText cStyle={styles.cFFF}>GO</CText>
                            </CButton>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}