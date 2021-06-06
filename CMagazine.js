import React from 'react';
import {View, ScrollView} from 'react-native';
import styles from './Styles';
import { CText, CButton } from './index';

const CMagazine = (buttonName) => {
    return (
        <View style={styles.magazineWrap}>
            <CText cStyle={styles.magazineTitle}>Magazine Name</CText>
            <View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                <View>
                    <CText>Posted On:</CText>
                    <CText>January | 2017 | 500</CText>
                </View>
                <View style={styles.jEnd}>
                    <CButton cStyle={[styles.roundButton, styles.magazineDetailBtn]}>
                        <CText cStyle={styles.cFFF}>View</CText>
                    </CButton>
                </View>
            </View>
        </View>
    );
};

export {CMagazine};