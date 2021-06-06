import React, { Component } from 'react';
import {View,Picker, AsyncStorage, NativeModules, Alert, Switch, Image, ScrollView,Modal,TouchableOpacity,TextInput,Text, Button} from 'react-native';
import {CText, CourseVideoBox, CPicker,CourseTestsBox, CourseEBooksBox, CButton, CInput, CSpinner} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';
import axios from 'axios';
import Utils from '../common/Utils';
import Config from '../config/Config';
import Orientation from 'react-native-orientation';


export default class OfflineMyCourses extends Component{
    state={dir1: [],dir2:[],dir3:[],topicName:[], jsondata:[],course:'', subject:'', lesson:'',coursesData: [],lessonData:[],
     Res:[],selected:'',selectedcourse:'', onlineToggleBool:false, token:'', buttonCount: 0, courseDisplayBool:'none', courseViewBorder: {borderWidth:0},
        fileJsonData: [], alreadyActivate: 'flex', imeiDeviceId: '', spinnerBool: true,
        tabActiveName: 'VIDEOS', videoActive: styles.brdBottomBlue, testActive:styles.brdBottomNone,
        testsData:[],Offsubject:'', Offlesson:'',Testdir2:[],Testsubject:'',Testdir3:[],TestLesson:'',coursesTestData:[]
    };

    componentWillMount(){
        Orientation.lockToPortrait();
        const self = this;
        Utils.getToken('UserDetails',function(tResp, tStat){
            if(tStat){
                self.setState({token:tResp.token}, () => {
                    NativeModules.FetchVideos.GetVersion((resp) => {
                        // alert(resp);
                        if (resp[0] === "P") {
                            alert(resp);
                        } else {
                            NativeModules.FetchVideos.GetValidFileExists((existBool) => {
                                NativeModules.FetchVideos.GetAllFirstFolders((resp) => {
                                    let folderResp = resp;
                                    if(!existBool){
                                        NativeModules.FetchVideos.GetDeviceId((deviceId) => {
                                            // alert(resp);
                                            self.setState({ imeiDeviceId: deviceId, dir1: JSON.parse(folderResp), courseDisplayBool: 'flex' }, () => {
                                                if(deviceId){
                                                    self.fetchCourses();
                                                } else {
                                                    alert('Could not retrieve courses');
                                                }
                                            });
                                        });
                                    } else {
                                        NativeModules.FetchVideos.GetValidFileInfo((readResp) => {
                                            let respString = JSON.parse(readResp);
                                            self.setState({ fileJsonData: respString, course: respString[0].courseName, spinnerBool:false }, () => {                                                
                                                self.fetchOfflineSubjects(respString[0].courseName);
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    });// GET VERSION
                    
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
                this.setState({ coursesData: resp.data,coursesTestData: resp.data, courseViewBorder: {borderWidth:1}, subject: '', lesson: '', subjectData:[], lessonData:[] });
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
        if(this.state.course){
            this.setState({ spinnerBool:true });
            let liveCourses = this.state.course;
            let localCourses = this.state.dir1;
            let showSelectedCourse = [];
            for(let i = 0; i < localCourses.length; i++){
                for(let j = 0; j < liveCourses.length; j++){
                    if(localCourses[i].folderName === liveCourses.split('#$#')[1]){
                        showSelectedCourse.push({ _id:liveCourses.split('#$#')[0], name:liveCourses.split('#$#')[1] });
                    }
                }
            }
            if(showSelectedCourse.length > 0){
                this.setJsonFile(showSelectedCourse);
            } else {
                // alert('You need to purchase the course');
                alert('could not retrieve the course information');
            }
        }
    }

    setJsonFile(courseObj){
        const self = this;
        Utils.dbCall(Config.routes.cardValidity, 'POST', { token: self.state.token}, {
            courseId: courseObj[0]._id, imeiNo: self.state.imeiDeviceId
        }, (resp) => {
            if(resp.status){
                let respJson = [];
                for(let i = 0; i < resp.data.length; i++){
                    respJson.push({
                        imeiNo: self.state.imeiDeviceId,
                        aSubId: resp.data[i]._id,
                        courseName: resp.data[i].courseId.name,
                        mode: resp.data[i].mode,
                        subjectName: resp.data[i].subjectId.name,
                        noOfDays: resp.data[i].noOfDays,
                        activateDate: new Date() - 0
                    });
                }
                NativeModules.FetchVideos.CreateValidFileInfo(JSON.stringify(respJson), (fResp) => {
                    if(fResp === 'Success'){
                        // self.setState({ fileJsonData: respJson, spinnerBool:false }, () => { self.fetchOfflineSubjects(courseObj[0].name); });
                                
                         Utils.dbCall(Config.routes.saveJsonValidityDetails, 'POST', {token: self.state.token}, respJson, (sjResp) => {
                            self.setState({ spinnerBool:false });
                            if(sjResp.status){
                                alert(sjResp.message);
                                self.setState({ fileJsonData: respJson });
                                self.fetchOfflineSubjects(courseObj[0].name);
                            } else {
                                if(sjResp.message == 'Activation already completed'){
                                    alert('Activation already completed, Please close & reopen the app');
                                } else {
                                    alert(sjResp.message);
                                }
                                self.setState({ fileJsonData: [], alreadyActivate: 'none' });
                                // delete the validity file.
                            }
                        });
                    }
                });
            } else {
                alert(resp.message)
            }
        });
    }

    fetchOfflineSubjects(courseName){
        if(courseName){
            // alert(courseName)
            if(this.state.fileJsonData.length > 0){
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(this.state.fileJsonData[0].activateDate);
                var secondDate = new Date();
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                if (diffDays <= this.state.fileJsonData[0].noOfDays) {
                    NativeModules.FetchVideos.GetAllSecondFolders(courseName, (resp) => {
                        this.setState({dir2:JSON.parse(resp)});
                    });
                } else {
                    alert('Sorry, your validity is expired.');
                }
            } else {
                alert('Could not retrieve subjects');
            }
        }
    }

    fetchOfflineTestSubjects(){
        let temp = '';
        let homepath='';
        NativeModules.FetchVideos.TestTempPath((resp)=>{
            homepath=resp;
            temp=resp+"testYourSelfTests"+"/"+this.state.course;
        if(this.state.course){
            if(this.state.fileJsonData.length > 0){
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(this.state.fileJsonData[0].activateDate);
                var secondDate = new Date();
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                if (diffDays <= this.state.fileJsonData[0].noOfDays) {
                    NativeModules.FetchTests.GetAllSecondFolders(temp,homepath, (resp) => {
                        this.setState({Testdir2:JSON.parse(resp)});
                    });
                } else {
                    alert('Sorry, your validity is expired.');
                }
            } else {
                alert('Could not retrieve subjects');
            }
        }
    });
    }

    fetchLesson(){
        if(this.state.subject){
            NativeModules.FetchVideos.GetAllThirdFolders(this.state.subject, (resp) => {
                let topic='', check=0;
                let topicArr = [];
                this.setState({jsondata:resp});
                for(let i = 0;i < JSON.parse(resp).length;i++){
                    topic=JSON.parse(resp)[i].topicName;
                    if(topicArr.indexOf(topic) === -1){
                        topicArr.push(topic);
                    }
                }
                this.setState({ topicName:topicArr });
            });
        }
    }

    fetchTestLesson(){
        if(this.state.Testsubject){
            NativeModules.FetchTests.GetAllThirdFolders(this.state.Testsubject, (resp) => {
                this.setState({Testdir3:JSON.parse(resp)});
            });
        }
    }

    renderCourses(){
        if(this.state.coursesData.length > 0){
            let content = [];
            content.push(<Picker.Item key={0} label='Select Course' value='' />)
            for(let i = 0; i < this.state.coursesData.length; i++){
                content.push(<Picker.Item key={i+1} label={this.state.coursesData[i].name} value={this.state.coursesData[i]._id +'#$#'+this.state.coursesData[i].name} />)
            }
            return content;
        } else {
            return <Picker.Item key={0} label='Select Course' value='' />;
        }
    }

    renderTestCourses(){
        if(this.state.coursesTestData.length > 0){
            let content = [];
            content.push(<Picker.Item key={0} label='Select Course' value='' />)
            for(let i = 0; i < this.state.coursesTestData.length; i++){
                content.push(<Picker.Item key={i+1} label={this.state.coursesTestData[i].name} value={this.state.coursesTestData[i]._id +'#$#'+this.state.coursesTestData[i].name} />)
            }
            return content;
        } else {
            return <Picker.Item key={0} label='Select Course' value='' />;
        }
    }

    renderSubjects(){
        console.warn('renderSubjects');
        if(this.state.dir2.length > 0){
            let content = [];
            content.push(<Picker.Item key={0} label='Select Subject' value='' />)
            for(let i = 0; i < this.state.dir2.length; i++){
                content.push(<Picker.Item key={i+1} label={this.state.dir2[i].folderName} value={this.state.dir2[i].folderName} />)
            }
            return content;
        } else {
            return <Picker.Item key={0} label='Select Subject' value='' />;
        }
    }

    renderTestSubjects(){
        if(this.state.Testdir2.length > 0){
            let content = [];
            content.push(<Picker.Item key={0} label='Select Subject' value='' />)
            for(let i = 0; i < this.state.Testdir2.length; i++){
                content.push(<Picker.Item key={i+1} label={this.state.Testdir2[i].folderName} value={this.state.Testdir2[i].folderName} />)
            }
            return content;
        } else {
            return <Picker.Item key={0} label='Select Subject' value='' />;
        }
    }

    renderLessonsDirList(){
        if(this.state.dir3.length > 0){
            let content = [];
            content.push(<Picker.Item key={0} label='Select Lesson' value='' />)
            for(let i = 0; i < this.state.dir3.length; i++){
                content.push(<Picker.Item key={i+1} label={this.state.dir3[i].folderName} value={this.state.dir3[i].folderName} />)
            }
            return content;
        } else {
            return <Picker.Item key={0} label='Select Lesson' value='' />;
        }
    }

    renderLessons(){
        if(this.state.topicName.length > 0){
            let content = [];
            content.push(<Picker.Item key={0} label='Select Lesson' value='' />)
            for(let i = 0; i < this.state.topicName.length; i++){
                content.push(<Picker.Item key={i+1} label={this.state.topicName[i]} value={this.state.topicName[i]} />)
            }
            return content;
        } else {
            return <Picker.Item key={0} label='Select Lesson' value='' />;
        }
    }

    renderTestLessons(){
        if(this.state.Testdir3.length > 0){
            let content = [];
            content.push(<Picker.Item key={0} label='Select Lesson' value='' />)
            for(let i = 0; i < this.state.Testdir3.length; i++){
                content.push(<Picker.Item key={i+1} label={this.state.Testdir3[i].folderName} value={this.state.Testdir3[i].folderName} />)
            }
            return content;
        } else {
            return <Picker.Item key={0} label='Select Lesson' value='' />;
        }
    }

    redirectCourseVideos(){
        if(!this.state.course){
            alert('Please select valid course');
            return false;
        } else if(!this.state.subject){
            alert('Please select valid subject');
            return false;
        } else if(!this.state.lesson){
            alert('Please select valid lesson');
            return false;
        } else {
            this.props.navigation.navigate('offCourseVideos', {JsonData:this.state.jsondata, topicSelected: this.state.lesson});
        }
    }

    redirectOfflineCourseVideos(){
        if(!this.state.course){
            alert('Please select valid course');
            return false;
        } else if(!this.state.Testsubject){
            alert('Please select valid subject');
            return false;
        } else if(!this.state.TestLesson){
            alert('Please select valid lesson');
            return false;
        } else {
            this.props.navigation.navigate('OffPracticeTests',{topicSelected: this.state.TestLesson});
        }
    }

    renderMainContent(){
        if(this.state.tabActiveName === 'VIDEOS'){
            return(
              <View>
                <CPicker brdNone={this.state.courseViewBorder} cStyle={{display: this.state.courseDisplayBool}} value={this.state.course} onChange={(value) => {
                    this.setState({ course:value }, () => { this.fetchSubjects(); })
                }}>
                    {this.renderCourses()}
                </CPicker>
                
                <CPicker value={this.state.subject} onChange={(value) => {
                    this.setState({ subject:value }, () => { this.fetchLesson(); })
                }}>
                    {this.renderSubjects()}
                </CPicker>

                <CPicker value={this.state.lesson} onChange={(value) => {
                    this.setState({ lesson:value }, () => { 
                    })
                }}>
                    {this.renderLessons()}
                </CPicker>

                <View>
                    <CButton 
                        cStyle={styles.orgButton}
                        onPress={()=> this.redirectCourseVideos()}>
                        <CText cStyle={styles.cFFF}>GO</CText>
                    </CButton>
                </View>
              </View>
            );
        }
        else if(this.state.tabActiveName === 'TESTS'){
            return(
                <View>
                <CPicker brdNone={this.state.courseViewBorder} cStyle={{display: this.state.courseDisplayBool}} value={this.state.course} onChange={(value) => {
                    this.setState({ course:value }, () => { this.fetchSubjects(); })
                }}>
                    {this.renderTestCourses()}
                </CPicker>
                
                <CPicker value={this.state.Testsubject} onChange={(value) => {
                    this.setState({ Testsubject:value }, () => { this.fetchTestLesson(); })
                }}>
                    {this.renderTestSubjects()}
                </CPicker>

                <CPicker value={this.state.TestLesson} onChange={(value) => {
                    this.setState({ TestLesson:value }, () => {  })
                }}>
                    {this.renderTestLessons()}
                </CPicker>

                <View>
                    <CButton 
                        cStyle={styles.orgButton}
                        onPress={()=> this.redirectOfflineCourseVideos()}
                        >
                        <CText cStyle={styles.cFFF}>GO</CText>
                    </CButton>
                </View>
              </View>
            )
        }
    }

    render(){
      
        return (
            <View style={styles.flex1}>
                {this.spinnerLoad()}
                <MenuHeader
                    Offstatus={true}
                    iconType='MENU'
                    menuClick={() => this.props.navigation.navigate('DrawerToggle')} 
                    profileClick={()=>this.props.navigation.navigate('profile')} 
                    notificationClick={()=>this.props.navigation.navigate('notification')}  
                />
                <View style={styles.mainLayout}>
                    <View style={{marginTop:20, display:this.state.alreadyActivate}}>
                        <View style={[styles.row, styles.jCenter, styles.aitCenter, styles.mBtm10]}>
                            <CText cStyle={[styles.mRt10]}>OFFLINE</CText>
                            <Switch onTintColor="#EEE" tintColor="#CCC" thumbTintColor="#3AB54A" onValueChange={(value) => this.setState({ onlineToggleBool: value }, () => {
                                this.props.navigation.navigate('myCourses')
                            })} 
                                value={this.state.onlineToggleBool}  /> 
                            <CText cStyle={[styles.mLt10]}>ONLINE</CText>
                        </View>
                        <View style={[styles.aitCenter, styles.row, styles.innerTabs]}>
                <TouchableOpacity onPress={() => this.setState({ 
                        tabActiveName: 'VIDEOS', 
                        videoActive: styles.brdBottomBlue,
                        testActive: styles.brdBottomNone,
                    })}>
                        <CText cStyle={[styles.screenHeader, this.state.videoActive, {paddingBottom:5}]}>Videos</CText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.setState({
                        tabActiveName: 'TESTS',                        
                        testActive: styles.brdBottomBlue,
                        videoActive: styles.brdBottomNone,
                    }, () => {
                        this.fetchOfflineTestSubjects();
                    })}>
                        <CText cStyle={[styles.screenHeader,this.state.testActive, {paddingBottom:5}]}>Tests</CText>
                    </TouchableOpacity>
                </View>
                {/* <ScrollView> */}
                        {this.renderMainContent()}
                    {/* </ScrollView> */}
                    </View>
                </View>
            </View>
        );
    }
}

