import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import MenuHeader from '../common/MenuHeader';
import MapView, {MAP_TYPES} from 'react-native-maps';
import styles from '../common/Styles';
import Orientation from 'react-native-orientation';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const latitudeDelta = 0.0123;
const longitudeDelta = latitudeDelta * aspectRatio;

export default class Contact extends Component {

    state = {latitude: 17.4201467, longitude: 78.5193629}

    componentWillMount(){
        Orientation.lockToPortrait();
    }

    coordinate() {
        return {
            latitude: this.state.latitude,
            longitude: this.state.longitude
        }
    }

    render() {
        return (
            <View style={[styles.flex1, styles.bgFFF]}>
                <MenuHeader
                    iconType='BACK'
                    menuClick={() => this.props.navigation.goBack()} 
                    profileClick={()=>this.props.navigation.navigate('profile')} 
                    notificationClick={()=>this.props.navigation.navigate('notification')}  
                />
                <View style={[styles.bgBlue, styles.profileWrap]}>
                    <View style={{justifyContent: 'center', alignItems: 'flex-start', 
                        borderBottomWidth:1, borderBottomColor:'#FFF', paddingHorizontal:20, paddingVertical:10 }}>
                        <Text style={{ fontSize: 18, color: 'white' }} >CONTACT US</Text>
                    </View>

                    <View style={{ justifyContent: 'space-around', paddingLeft: 10 }}>
                        <View style={{flexDirection: 'row', paddingTop: 15 }} >
                            <View style={{flexDirection: 'row', alignItems: 'center'}} >
                                <Image style={styles.imgWH20} source={require('../images/contact/contact_mobile.png')} />
                                <Text style={{ color: 'white', paddingLeft: 15 }} >+91-9515986872</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center' }} >
                                <Text style={{ color: 'white' }} >Office: </Text>
                                <Text style={{ color: 'white', paddingLeft: 10 }} >+91-9618702466</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: 'center', marginVertical:10}} >
                            <View style={{ flexDirection: 'row' }} >
                                <Image style={styles.imgWH20} source={require('../images/contact/contact_mail.png')} />
                                <Text style={{ color: 'white', paddingLeft: 20 }} >chakravarthysir@gmail.com</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical:10}} >
                            <View>
                                <Image style={styles.imgWH20} source={require('../images/contact/contact_address.png')} />
                            </View>
                            <View style={{ paddingLeft: 20}} >

                                <Text style={{ color: 'white' }} >No. 102, Sevenhills caliber,</Text>
                                <Text style={{ color: 'white' }} >Road No.2, Indiranagar, </Text>
                                <Text style={{ color: 'white' }} >Warasiguda Secunderabad, 500061</Text>
                                <Text style={{ color: 'white' }} >Telangana, India.</Text>

                            </View>
                        </View>
                    </View>
                </View>
                
                <View style={{flex:1}}>
                    <MapView style={{zIndex: -1,...StyleSheet.absoluteFillObject}} 
                        initialRegion={{latitude: this.state.latitude, longitude: this.state.longitude,
                        latitudeDelta: latitudeDelta, longitudeDelta:longitudeDelta}}>
                        <MapView.Marker coordinate={this.coordinate()} />
                    </MapView>
                </View>

                {/* <View style={{justifyContent: 'space-around' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingRight: 100, paddingLeft: 100 }}>
                        <View style={{ flex: 1,}} >
                            <Image source={require('../images/fb.png')} style={styles.test} />
                        </View>
                        <View style={{ flex: 1,}} >
                            <Image source={require('../images/twi.png')} style={styles.test} />
                        </View>
                        <View style={{ flex: 1,}} >
                            <Image source={require('../images/in.png')} style={styles.test} />
                        </View>
                    </View>
                </View> */}
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5FCFF',
//     },
//     map: {
//         flex: 1,
//         width: Dimensions.get('window').width,
//         ...StyleSheet.absoluteFillObject,
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//     },
//     test: {
//         height: 50,
//         width: 50,

//     },
// });