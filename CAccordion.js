import React, { Component } from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import styles from './Styles';
import { CInput, CText, CButton } from './index';
import Utils from './Utils';
import Config from '../config/Config';

export default class CAccordion extends Component{
    state = {};
    componentWillMount() {
        this.doubtData = this.props.data;
        this.token = this.props.token;
        this.iVal = this.props.data._id;
    }

    renderToggleIcon(typeBool){
        if(typeBool === 'none'){
            return <CText cStyle={[styles.f18, {marginRight:5}]}>+</CText>;
        } else {
            return <CText cStyle={[styles.f18, {marginRight:5}]}>-</CText>;
        }
    }

    submitComments(doubtText, doubtId) {
        if(this.state['commentTxt' + this.iVal] === ''){
            alert('Please provide your comments');
            return false;
        }
        Utils.dbCall(Config.routes.askDoubtComment, 'POST', {token: this.token} , {
            comment: this.state['commentTxt' + this.iVal],
            doubt: doubtText,
            doubtId: doubtId
        }, (resp) => {
            alert(resp.message);
            this.setState({['commentTxt' + this.iVal]:'' });
            this.props.callBackAccord(doubtId);
        });
    }

    renderAllComments(singleData){
        if(singleData){
            let content = [];
            for(let i = 0; i < singleData.length; i++){
                if(singleData[i].userType === 'admin'){
                    content.push(<CText key={i}>{singleData[i].comment}</CText>);
                } else {
                    content.push(<CText key={i} cStyle={styles.txtAlignRt}>{singleData[i].comment}</CText>);
                }
            }
            return content;
        } else {
            return;
        }
    }

    setUnitsNo(iVal, thisVal){
        this.setState({ ['commentTxt' + iVal]: thisVal }, () => {

        });
    }

    render(){
        return (
            <View>
                <TouchableOpacity onPress={this.props.accordClick} style={styles.accordWrap}>
                    <View style={styles.accordHeader}>
                        <View>
                            <CText cStyle={styles.cBlue}>
                                {`${this.doubtData.courseId.name} > ${this.doubtData.subjectId.name}`}
                            </CText>
                            <CText cStyle={styles.cBlue}>
                                {`${this.doubtData.chapterId.name} > ${this.doubtData.videoId.name}`}
                            </CText>
                        </View>
                        <View>{this.renderToggleIcon(this.doubtData.accordStatus)}</View>
                    </View>
                    <View style={[styles.accordBody]}>
                        <View style={{display:this.doubtData.accordStatus}}>
                            <View style={styles.accordDiscussWrap}>
                                <CText>{this.doubtData.doubt}</CText>
                                <ScrollView>
                                    {this.renderAllComments(this.doubtData.singleData)}
                                </ScrollView>
                            </View>
                            <CInput value={this.state['commentTxt' + this.iVal]} multiline={true}
                                onChangeText={(value) => {
                                    this.setState({ ['commentTxt' + this.iVal]: value }, () => {
                                    })
                                }} />
                            <CButton onPress={() => this.submitComments(this.doubtData.doubt, this.doubtData._id)} cStyle={[styles.mroundButton, styles.accordBtnBlue]}>
                                <CText cStyle={[styles.cFFF]}>Add Comment</CText>
                            </CButton>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}