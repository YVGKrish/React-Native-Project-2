import React from 'react';
import {View} from 'react-native';
import styles from './Styles';
import { CText, CButton } from './index';
import Viewpdf from '../screens/Viewpdf';

const CourseEBooksBox = ({data, eBookClick}) => {
    function renderEbooksCondition(){
        if(data.trail === true || data.trail === 'true'){
            return (<View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                <View style={styles.jEnd}>
                    <CButton onPress={eBookClick} cStyle={[styles.roundButton, styles.courseVideoBtn, styles.courseVideoBtnBlue]} >
                        <CText cStyle={[styles.f10, styles.cFFF]}>View PDF</CText>
                    </CButton>
                </View>
            </View>);
        } else {
            return (
                <View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                <View style={styles.jEnd}>
                    <View style={[styles.roundButton, styles.courseVideoBtn, styles.courseDisableGreyBtn]}>
                        <CText cStyle={[styles.f10, styles.cFFF]}>View PDF</CText>
                    </View>
                </View>
            </View>)
        }
    }

    return (
        <View style={styles.magazineWrap}>
            <CText cStyle={styles.magazineTitle}>{data.name}</CText>
            {/* {renderEbooksCondition()} */}
        </View>
    );
};

export {CourseEBooksBox};