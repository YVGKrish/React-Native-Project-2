import React, { Component } from 'react';
import {View} from 'react-native';
import {CText, CInput, CButton} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';

export default class Magazine extends Component{
    render(){
        return (
            <View style={styles.flex1}>
                <MenuHeader menuClick={() => this.props.navigation.navigate('DrawerToggle')}  />
                <View style={styles.mainLayout}>
                    <View style={[styles.aitCenter, styles.mT20]}>
                        <CText cStyle={[styles.screenHeader, styles.cBlue]}>SUBSCRIBE MAGAZINE</CText>
                    </View>
                    <View style={styles.mT20}>
                        <CInput placeholder='Magazine Name' />
                        <CInput placeholder='January' />
                        <CInput placeholder='2017' />
                        <CInput placeholder='500' />
                        <View>
                            <CButton onPress={() => this.props.navigation.navigate('subscribeMagazine')} cStyle={styles.orgButton}><CText cStyle={styles.cFFF}>SUBSCRIBE</CText></CButton>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}