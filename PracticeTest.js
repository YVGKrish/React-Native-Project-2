import React, { Component } from 'react';
import {View, Image, Picker, ScrollView, WebView, TouchableOpacity} from 'react-native';
import {CText, CButton, CPicker, CInput} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';
import Config from '../config/Config';

export default class PracticeTest extends Component{

    state = { practiceTestData:[], 'A':'#FFF', 'B':'#FFF', 'C':'#FFF', 'D':'#FFF', 'E':'#FFF', answeredBool:false, qCount:0,
        previousBtnBool: 'none', nextBtnBool:'flex', hintBool: 'none'
    };

    componentWillMount(){
        if(this.props.navigation.state.params.pData){
            this.setState({ practiceTestData: this.props.navigation.state.params.pData, hintBool: 'none' });
        } else {
            alert('Error, while running the test');
        }
    }
    
    renderQuestions(){
        if(this.state.practiceTestData){
            let practiceData = this.state.practiceTestData;
            let content = [];
            //for(let i = 0; i < notifyData.length; i++){
                let hintData = practiceData[this.state.qCount].hint;
                let tempData = hintData;
                let imgPath = '';
                if(hintData.indexOf('<img') > -1){
                    tempData = tempData.split(' ');
                    imgPath = tempData[2].split('src=');
                    imgPath = imgPath[1].split('\"').join('');
                    hintData = hintData.replace(imgPath, Config.routes.base + '/' + imgPath);
                }
                
                content.push(<View key={this.state.qCount} style={[styles.marV5]}>
                    <CText cStyle={{position:'absolute', top:12, left:5, fontWeight:'600', color:'#000'}}>{this.state.qCount + 1}. </CText>
                    <ScrollView style={[styles.notificationContent, {display:'flex', paddingLeft:20}]}>
                        {this.renderDirection(practiceData[this.state.qCount].direction)}
                        <WebView style={[styles.notificationContent,{minHeight:150,paddingBottom:10}]} source={{html: practiceData[this.state.qCount].question}}/>
                    </ScrollView>
                    <View style={[styles.row, styles.aitCenter, styles.jCenter, styles.mTop5]}>
                        <TouchableOpacity style={[styles.ptOptions, {backgroundColor:this.state['A']}]} onPress={() => this.verifyAnswer('A', practiceData[this.state.qCount].answer)}></TouchableOpacity>
                        <WebView style={{minHeight:30, marginLeft:5}} source={{html: practiceData[this.state.qCount].optionA}} />
                    </View>
                    <View style={[styles.row, styles.aitCenter, styles.jCenter, styles.mTop5]}>
                        <TouchableOpacity style={[styles.ptOptions, {backgroundColor:this.state['B']}]} onPress={() => this.verifyAnswer('B', practiceData[this.state.qCount].answer)}></TouchableOpacity>
                        <WebView style={{minHeight:30, marginLeft:5}} source={{html: practiceData[this.state.qCount].optionB}} />
                    </View>
                    <View style={[styles.row, styles.aitCenter, styles.jCenter, styles.mTop5]}>
                        <TouchableOpacity style={[styles.ptOptions, {backgroundColor:this.state['C']}]} onPress={() => this.verifyAnswer('C', practiceData[this.state.qCount].answer)}></TouchableOpacity>
                        <WebView style={{minHeight:30, marginLeft:5}} source={{html: practiceData[this.state.qCount].optionC}} />
                    </View>
                    <View style={[styles.row, styles.aitCenter, styles.jCenter, styles.mTop5]}>
                        <TouchableOpacity style={[styles.ptOptions, {backgroundColor:this.state['D']}]} onPress={() => this.verifyAnswer('D', practiceData[this.state.qCount].answer)}></TouchableOpacity>
                        <WebView style={{minHeight:30, marginLeft:5}} source={{html: practiceData[this.state.qCount].optionD}} />
                    </View>
                    <View style={[styles.row, styles.aitCenter, styles.jCenter, styles.mTop5]}>
                        <TouchableOpacity style={[styles.ptOptions, {backgroundColor:this.state['E']}]} onPress={() => this.verifyAnswer('E', practiceData[this.state.qCount].answer)}></TouchableOpacity>
                        <WebView style={{minHeight:30, marginLeft:5}} source={{html: practiceData[this.state.qCount].optionE}} />
                    </View>
                    <View style={{display:this.state.hintBool, borderTopWidth:1, borderTopColor:'#EEE', paddingTop:5, marginTop:5}}>
                        <CText cStyle={[styles.mBtm10, styles.aitCenter, {fontWeight:'600'}]}>SOLUTION:</CText>
                        <WebView style={{minHeight:150}} source={{html: hintData}}/>
                    </View>
                </View>);
            //}
            return content;
        } else {
            return;
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
                <MenuHeader />
                <ScrollView style={styles.mainLayout}>
                    <View style={[styles.aitCenter,styles.mT20]}>
                        <CText cStyle={[styles.screenHeader, styles.cBlue]}>PRACTICE TESTS</CText>
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