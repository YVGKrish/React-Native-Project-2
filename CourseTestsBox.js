import React from 'react';
import {View} from 'react-native';
import styles from './Styles';
import { CText, CButton } from './index';

const CourseTestsBox = (buttonName) => {
    return (
        <View style={styles.magazineWrap}>
            <CText cStyle={styles.magazineTitle}>Lesson Name</CText>
            <View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                <View style={styles.jEnd}>
                    <CButton cStyle={[styles.roundButton, styles.courseVideoBtn, styles.courseVideoBtnBlue]}>
                        <CText cStyle={[styles.f10, styles.cFFF]}>Start Exam</CText>
                    </CButton>
                </View>
            </View>
        </View>
    );
};

export {CourseTestsBox};