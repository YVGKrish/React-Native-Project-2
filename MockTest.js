import React, { Component } from 'react';
import {View, Image, Picker, ScrollView, WebView, TouchableOpacity} from 'react-native';
import {CText, CButton, CPicker, CInput} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';

export default class MockTest extends Component{

    state = { jsonData:[{
        "_id": "598f36cbae66a424bc8d0c8d",
        "simpleTestID": "598f35d7ae66a424bc8d0c8c",
        "correctAnswer": "A",
        "directions": "",
        "hint": "<p><img alt=\"./testYourSelfTests/BANK + SSC/QUANTITATIVE APTITUDE/AVERAGES/AVERAGES TEST 1/1.PNG\" src=\"./testYourSelfTests/BANK + SSC/QUANTITATIVE APTITUDE/AVERAGES/AVERAGES TEST 1/1.PNG\" />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>\n",
        "optionA": "<p><strong>2</strong></p>\n",
        "optionB": "<p><strong>3</strong></p>\n",
        "optionC": "<p><strong>4</strong></p>\n",
        "optionD": "<p><strong>6</strong></p>\n",
        "optionE": "<p><strong>NONE OF THESE</strong></p>\n",
        "question": "<p><strong>A student finds the average of ten 2- digit numbers. While copying numbers, by mistake, he writes one number with its digits interchanged. As a result his answer is 1.8 less than the correct answer, the difference of the digits of the number in which he made mistake, is</strong></p>\n",
        "__v": 0,
        "directionImage": null,
        "folderName": null
      }] };
    
    renderQuestions(){
        if(this.state.jsonData){
            let notifyData = this.state.jsonData;
            let content = [];
            for(let i = 0; i < notifyData.length; i++){
                content.push(<View key={i} style={styles.marV5}>
                <ScrollView style={[styles.notificationContent, {display:'flex'}]}>
                <WebView style={{minHeight:150}} source={{html: notifyData[i].question}}/>
                </ScrollView>
                <WebView style={{minHeight:150}} source={{html: notifyData[i].hint}}/>
                <TouchableOpacity onPress={() => alert('OPTION A')}><WebView style={{minHeight:50}} source={{html: notifyData[i].optionA}} /></TouchableOpacity>
                <WebView style={{minHeight:50}} source={{html: notifyData[i].optionB}} 
                    onNavigationStateChange={(event) => {}} />
                <WebView style={{minHeight:50}} source={{html: notifyData[i].optionC}} 
                    onNavigationStateChange={(event) => {}} />
                <WebView style={{minHeight:50}} source={{html: notifyData[i].optionD}} 
                    onNavigationStateChange={(event) => {}} />
                <WebView style={{minHeight:50}} source={{html: notifyData[i].optionE}} 
                    onNavigationStateChange={(event) => {}} />
                </View>);
            }
            return content;
        } else {
            return;
        }
    }

    render(){
        return (
            <View style={styles.flex1}>
                <MenuHeader />
                <ScrollView style={styles.mainLayout}>
                    <View style={[styles.aitCenter,styles.mT20]}>
                        <CText cStyle={[styles.screenHeader, styles.cBlue]}>MOCK TESTS</CText>
                    </View>
                    <ScrollView>
                        {this.renderQuestions()}
                    </ScrollView>
                    {/* <View style={styles.mT20}>
                        <CPicker>
                            <Picker.Item label="Course Type" value="" />
                        </CPicker>
                        <CPicker>
                            <Picker.Item label="Type" value="" />
                        </CPicker>
                        <View style={{backgroundColor:'#EEE', borderWidth:1, marginVertical: 10,
                            borderColor:'#DDD', alignItems:'center', padding:10, borderRadius:4}}>
                            <CText>Number of Days Left: 364</CText>
                        </View>
                        <View>
                            <CButton cStyle={styles.orgButton}><CText cStyle={styles.cFFF}>GO</CText></CButton>
                        </View> 
                    </View>*/}
                </ScrollView>
            </View>
        );
    }
}