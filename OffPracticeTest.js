import React, { Component } from 'react';
import {View, Image, Picker,Text, ScrollView,NativeModules,WebView, TouchableOpacity} from 'react-native';
import {CText, CButton, CPicker, CInput} from '../common/index';
import styles from '../common/Styles';

export default class OffPracticeTest extends Component{

    state = { 
        practiceTestData:[], 'A':'#FFF', 'B':'#FFF', 'C':'#FFF', 'D':'#FFF', 'E':'#FFF', answeredBool:false, qCount:0,
        previousBtnBool: 'none', nextBtnBool:'flex', hintBool: 'none',rootpath:'',Hintdatabool:false,Desdatabool:false,Himgpath:'',
        Htext:'',Dimgpath:'',Dtext:'',
    };

    componentWillMount(){
        this.hintText = ''; this.hintImg = '';
        this.descText = ''; this.descImg = '';
            NativeModules.FetchTests.GetTestData (this.props.navigation.state.params.TestPath, (resp) => {
                this.setState({practiceTestData:JSON.parse(resp),hintBool: 'none'})
                NativeModules.FetchTests.getRootPath((resp)=>{
                    this.setState({rootpath:resp})
                })
            });
    }

    renderQuestions(){
        if(this.state.practiceTestData.length>0){
            let practiceData = this.state.practiceTestData;
            let content = [];
            var hintMatch=''; let descMatch = ''; let hintBoolVal = false; let descBoolVal = false; 
            let hintData = this.state.practiceTestData[this.state.qCount].hint;
            let DirectionData=this.state.practiceTestData[this.state.qCount].directions;
            if(hintData.indexOf('<img') > -1){
                hintMatch = hintData.match(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/);
                let mainSrc = hintMatch[1];
                this.hintText = hintData.split(hintMatch[0]).join("");
                mainSrc = mainSrc.replace('./','');
                hintData = hintData.split('./' + mainSrc).join("file://"+ this.state.rootpath + mainSrc);
                this.hintImg = "file://"+ this.state.rootpath + mainSrc;
                hintBoolVal = true;
            } else {
                this.hintText = hintData;
            }

            if(DirectionData.indexOf('<img') > -1){
                descMatch = DirectionData.match(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/);
                let mainSrc = descMatch[1];
                this.descText = DirectionData.split(descMatch[0]).join("");
                mainSrc = mainSrc.replace('./','');
                DirectionData = DirectionData.split('./'+mainSrc).join("file://"+ this.state.rootpath + mainSrc);
                this.descImg = "file://"+ this.state.rootpath + mainSrc;
                descBoolVal = true;
            }else{
                this.descText = DirectionData;
            }

            content.push(<View key={this.state.qCount} style={[styles.marV5]}>
                <CText cStyle={{position:'absolute', top:12, left:5, fontWeight:'600', color:'#000'}}>{this.state.qCount + 1}. </CText>
                <ScrollView style={[styles.notificationContent, {display:'flex', paddingLeft:20}]}>
                        {this.rendercustomdesc(descBoolVal)}
                <WebView style={[styles.notificationContent,{minHeight:150,paddingBottom:10}]} source={{html: practiceData[this.state.qCount].question}}/>
                </ScrollView>
                <View style={[styles.row, styles.aitCenter, styles.jCenter, styles.mTop5]}>
                    <TouchableOpacity style={[styles.ptOptions, {backgroundColor:this.state['A']}]} onPress={() => this.verifyAnswer('A', practiceData[this.state.qCount].correctAnswer)}></TouchableOpacity>
                    <WebView style={{minHeight:30, marginLeft:5}} source={{html: practiceData[this.state.qCount].optionA}} />
                </View>
                <View style={[styles.row, styles.aitCenter, styles.jCenter, styles.mTop5]}>
                    <TouchableOpacity style={[styles.ptOptions, {backgroundColor:this.state['B']}]} onPress={() => this.verifyAnswer('B', practiceData[this.state.qCount].correctAnswer)}></TouchableOpacity>
                    <WebView style={{minHeight:30, marginLeft:5}} source={{html: practiceData[this.state.qCount].optionB}} />
                </View>
                <View style={[styles.row, styles.aitCenter, styles.jCenter, styles.mTop5]}>
                    <TouchableOpacity style={[styles.ptOptions, {backgroundColor:this.state['C']}]} onPress={() => this.verifyAnswer('C', practiceData[this.state.qCount].correctAnswer)}></TouchableOpacity>
                    <WebView style={{minHeight:30, marginLeft:5}} source={{html: practiceData[this.state.qCount].optionC}} />
                </View>
                <View style={[styles.row, styles.aitCenter, styles.jCenter, styles.mTop5]}>
                    <TouchableOpacity style={[styles.ptOptions, {backgroundColor:this.state['D']}]} onPress={() => this.verifyAnswer('D', practiceData[this.state.qCount].correctAnswer)}></TouchableOpacity>
                    <WebView style={{minHeight:30, marginLeft:5}} source={{html: practiceData[this.state.qCount].optionD}} />
                </View>
                <View style={[styles.row, styles.aitCenter, styles.jCenter, styles.mTop5]}>
                    <TouchableOpacity style={[styles.ptOptions, {backgroundColor:this.state['E']}]} onPress={() => this.verifyAnswer('E', practiceData[this.state.qCount].correctAnswer)}></TouchableOpacity>
                    <WebView style={{minHeight:30, marginLeft:5}} source={{html: practiceData[this.state.qCount].optionE}} />
                </View>
                <View style={{display: this.state.hintBool, borderTopWidth:1, borderTopColor:'#EEE', paddingTop:5, marginTop:5}}>
                    <CText cStyle={[styles.mBtm10, styles.aitCenter, {fontWeight:'600'}]}>SOLUTION:</CText>
                        {this.rendercustomhint(hintBoolVal)}
                </View>
            </View>);
            //}
            return content;
        } else {
            return;
        }
    }

    rendercustomhint(boolCheck){
        if(boolCheck){
            return this.renderImgHint(this.hintImg, this.hintText);
        }else{
            return this.renderHint(this.hintText);
        }
    }

    renderImgHint(img,text){
        if(img){
        return(
            <View>
                <Image source={{uri:img}} style={{height:250,width:250}} />
                <WebView style={{minHeight:150,borderBottomWidth:1, borderBottomColor:'#EEE'}} source={{html: text}}/>
            </View>
        );
    }
    }

    renderHint(hintData){
        if(hintData){
            return(
            <WebView style={{minHeight:150}} source={{html: hintData}}/>
            );
        }
    }

    rendercustomdesc(boolCheck){
        if(boolCheck){
            return this.renderImgDirection(this.descImg,this.descText);
        }else{
            return this.renderDirection(this.descText);
        }
    }

    renderDirection(question){
        if(question){
            return (<View><CText cStyle={[styles.aitCenter, {fontWeight:'600', paddingLeft:8, paddingTop:5}]}>Description:</CText>
                <WebView style={{minHeight:150,borderBottomWidth:1, borderBottomColor:'#EEE'}} source={{html: question}}/>
                <CText cStyle={[styles.pTop10, styles.aitCenter, {fontWeight:'600', paddingLeft:8}]}>Question:</CText></View>);
        } else {
            return <CText cStyle={[styles.aitCenter, {fontWeight:'600', paddingLeft:8, paddingTop:5}]}>Question:</CText>;
        }
    }

    renderImgDirection(img,text){
        if(img){
            return (<View><CText cStyle={[styles.aitCenter, {fontWeight:'600', paddingLeft:8, paddingTop:5,flexDirection:'column'}]}>Description:</CText>
                <Image source={{uri:img}} style={{height:250,width:250}} />
                <WebView style={{minHeight:150,borderBottomWidth:1, borderBottomColor:'#EEE'}} source={{html: text}}/>                
                <CText cStyle={[styles.pTop10, styles.aitCenter, {fontWeight:'600', paddingLeft:8}]}>Question:</CText></View>);
        } else {
            return <CText cStyle={[styles.aitCenter, {fontWeight:'600', paddingLeft:8, paddingTop:5}]}>Question:</CText>;
        }
    }


    verifyAnswer(selected, answer){
        if(!this.state.answeredBool){
            if(selected === answer){
                this.setState({ [answer]: '#00e600', answeredBool:true, hintBool: 'flex' });
            } else {
                this.setState({ [selected]: '#F00', [answer]: '#0F0', answeredBool:true, hintBool: 'flex' });
            }
        } else {
            alert('Already answered');
        }
    }

    showNextQuestion(){
        this.setState({ 'A':'#FFF', 'B':'#FFF', 'C':'#FFF', 'D':'#FFF', 'E':'#FFF', answeredBool:false, qCount: this.state.qCount + 1, hintBool: 'none' }, () => {
            if(this.state.qCount > 0){
                this.setState({ previousBtnBool:'flex'});
            }
            if(this.state.qCount >= this.state.practiceTestData.length - 1){
                this.setState({ nextBtnBool:'none'});
            }
        });
    }

    showPreviousQuestion(){
        this.setState({ 'A':'#FFF', 'B':'#FFF', 'C':'#FFF', 'D':'#FFF', 'E':'#FFF', answeredBool:false, qCount: this.state.qCount - 1, hintBool: 'none' }, () => {
            if(this.state.qCount < 1){
                this.setState({ previousBtnBool:'none'});
            }
            if(this.state.qCount <= this.state.practiceTestData.length - 1){
                this.setState({ nextBtnBool:'flex'});
            }
        });
    }
    render(){
        return (
            <View style={styles.flex1}>
                <ScrollView style={styles.mainLayout}>
                    <View style={[styles.aitCenter,styles.mT20]}>
                        <CText cStyle={[styles.screenHeader, styles.cBlue]}>{this.props.navigation.state.params.topicSelected}</CText>
                    </View>
                    <ScrollView>
                        {this.renderQuestions()}
                    </ScrollView>
                    <View style={[styles.row, styles.jCenter, styles.aitCenter, styles.padV10, {borderTopWidth:1, borderTopColor:'#EEE'}]}>
                        <CButton cStyle={[styles.ptNavBtns, styles.mRt10, {display:this.state.previousBtnBool}]} onPress={() => this.showPreviousQuestion()}>
                            <CText cStyle={styles.cFFF}>Prev</CText>
                        </CButton>
                        <CButton cStyle={[styles.ptNavBtns, styles.mLt10, {display:this.state.nextBtnBool}]} onPress={() => this.showNextQuestion()}>
                            <CText cStyle={styles.cFFF}>Next</CText>
                        </CButton>
                    </View>
                </ScrollView>
            </View>
        );
    }
}