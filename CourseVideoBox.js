import React from 'react';
import {View} from 'react-native';
import styles from './Styles';
import { CText, CButton } from './index';
import config from '../config/Config';


const CourseVideoBox = ({ data, aStatus, buttonName, props, askDoubtClick, PDFClick, videoClick}) => {
    function renderViewByCondition(){
        if(aStatus === 'trail'){
            if(data.trail === true || data.trail === 'true'){
                return (<View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                    <View style={styles.jEnd}>
                        <CButton onPress={videoClick} cStyle={[styles.roundButton, styles.courseVideoBtn, styles.courseVideoBtnBlue]}>
                            <CText cStyle={[styles.f10, styles.cFFF]}>Play Video</CText>
                        </CButton>
                    </View>
                    <View style={styles.jEnd}>
                        <CButton cStyle={[styles.roundButton, styles.courseVideoBtn]} onPress={PDFClick}  >
                            <CText cStyle={styles.f10}>Lesson PDF</CText>
                        </CButton>
                    </View>
                    <View style={styles.jEnd}>
                        <CButton cStyle={[styles.roundButton, styles.courseVideoBtn]} onPress={askDoubtClick} >
                            <CText cStyle={styles.f10}>Ask Doubt</CText>
                        </CButton>
                    </View>
                </View>);
            } else {
                return (<View><View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                    <View style={[styles.roundButton, styles.courseVideoBtn, styles.courseDisableGreyBtn]}>
                        <CText cStyle={[styles.f10]}>Play Video</CText>
                    </View>
                    <View style={[styles.roundButton, styles.courseVideoBtn, styles.courseDisableGreyBtn]}>
                        <CText cStyle={styles.f10}>Lesson PDF</CText>
                    </View>
                    <View style={[styles.roundButton, styles.courseVideoBtn, styles.courseDisableGreyBtn]}>
                        <CText cStyle={styles.f10}>Ask Doubt</CText>
                    </View>
                </View>
                <View>
                    <CText cStyle={{color:'#D20000', fontSize:12}}>*Purchase the lesson to use</CText>
                </View></View>)
            }
        } else {
            return (<View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                <View style={styles.jEnd}>
                    <CButton onPress={videoClick} cStyle={[styles.roundButton, styles.courseVideoBtn, styles.courseVideoBtnBlue]}>
                        <CText cStyle={[styles.f10, styles.cFFF]}>Play Video</CText>
                    </CButton>
                </View>
                <View style={styles.jEnd}>
                    <CButton cStyle={[styles.roundButton, styles.courseVideoBtn]} onPress={PDFClick}  >
                        <CText cStyle={styles.f10}>Lesson PDF</CText>
                    </CButton>
                </View>
                <View style={styles.jEnd}>
                    <CButton cStyle={[styles.roundButton, styles.courseVideoBtn]} onPress={askDoubtClick} >
                        <CText cStyle={styles.f10}>Ask Doubt</CText>
                    </CButton>
                </View>
            </View>);
        }
    }

    return (
        <View style={styles.magazineWrap}>
            <CText cStyle={styles.magazineTitle}>{data.name}</CText>
            {renderViewByCondition()}
        </View>
    );
};

export {CourseVideoBox};