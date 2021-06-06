
import React from 'react';
import {Image, View, Text, AsyncStorage, TouchableOpacity, Alert} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';

import Dashboard from './screens/Dashboard';
import SubscribeCourse from './screens/SubscribeCourse';
import DoubtsForum from './screens/DoubtsForum';
import FreeContent from './screens/FreeContent';
import MockTest from './screens/MockTest';
import SubscribeNewMockTest from './screens/SubscribeNewMockTest';

import MyCourses from './screens/MyCourses';
import CourseVideos from './screens/CourseVideos';

import Magazine from './screens/Magazine';
import SubscribeMagazine from './screens/SubscribeMagazine';

import Contact from './screens/Contact';
import Notification from './screens/Notification';
import Profile from './screens/Profile';
import Viewpdf from './screens/Viewpdf';

import MockBuyNow from './screens/MockBuyNow';
import BankExams1 from './screens/BankExams1';
import BankExams2 from './screens/BankExams2';
import BankExams3 from './screens/BankExams3';
import VideoScreen from './screens/VideoScreen';

import OfflineCourseVideos from './screens/OfflineCourseVideos';
import OfflineMyCourses from './screens/OfflineMyCourses';
import OfflineVideoScreen from './screens/OfflineVideoScreen';
import OfflineViewPdf from './screens/OfflineViewPdf';
import PracticeTest from './screens/PracticeTest';
import OfflinePracticeTests from './screens/OfflinePracticeTests';
import OfflineTestViewPdf from './screens/OfflineTestViewPdf';
import OffPracticeTest from './screens/OffPracticeTest';

export default Router = (loginStatus) => {
    return StackNavigator({
        login: {
            screen: Login,
            navigationOptions: ({ navigation }) => ({
                //headerTitle: 'Login'
                header: null
            })
        },
        signUp: {
            screen: SignUp,
            navigationOptions: {
                header: null
            }
        },
        forgotPassword: {
            screen: ForgotPassword,
            navigationOptions: {
                header: null
            }
        },
        dashboard: {
            screen: Draw,
            navigationOptions: { header: null }
        },
        subscribeCourse: {
            screen: SubscribeCourse,
            navigationOptions: {
                header: null
            }
        },
        
        freeContent: {
            screen: FreeContent,
            navigationOptions: {
                header: null
            }
        },
        
        mockTest: {
            screen: MockTest,
            navigationOptions: {
                header: null
            }
        },
        subscribeNewMockTest: {
            screen: SubscribeNewMockTest,
            navigationOptions: {
                header: null
            }
        },
        subscribeMagazine:{
            screen: SubscribeMagazine,
            navigationOptions: {
                header: null
            }
        },
        mockBuyNow:{
            screen: MockBuyNow,
            navigationOptions: {
                header: null
            }
        },
        bankExams1:{
            screen: BankExams1,
            navigationOptions: {
                header: null
            }
        },
        bankExams2:{
            screen: BankExams2,
            navigationOptions: {
                header: null
            }
        },
        bankExams3:{
            screen: BankExams3,
            navigationOptions: {
                header: null
            }
        },
        courseVideos:{
            screen: CourseVideos,
            navigationOptions: {
                header: null
            }
        },
        doubtsForum: {
            screen: DoubtsForum,
            navigationOptions: {
                header: null
            }
        },
        Viewpdf:{
            screen:Viewpdf,
            navigationOptions:{
                header:null
            }
        },
        profile:{
            screen:Profile,
            navigationOptions:{
                header:null
            }
        },
        contact:{
            screen:Contact,
            navigationOptions:{
                header:null
            }
        },
        notification:{
            screen:Notification,
            navigationOptions:{
                header:null
            }
        },
        videoScreen: {
            screen: VideoScreen,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        offCourseVideos: {
            screen: OfflineCourseVideos,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        offMyCourses: {
            screen: OfflineMyCourses,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        offVideoScreen: {
            screen: OfflineVideoScreen,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        offViewPdf: {
            screen: OfflineViewPdf,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        OffTestViewPdf: {
            screen: OfflineTestViewPdf,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        OffPracticeTests: {
            screen: OfflinePracticeTests,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        RenderOffPracticeTests: {
            screen: OffPracticeTest,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        practiceTest: {
            screen: PracticeTest,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        }
    },{
        initialRouteName: loginStatus ? 'dashboard' : 'login'
    });
};

const styles = {
    tabImg:{width:20, height:20},
    tabLabel:{fontSize:12}
};

const TabScreens = TabNavigator({
    // dashboard: {
    //     screen: Dashboard,
    //     navigationOptions:{
    //         //tabBarLabel: (<Text style={styles.tabLabel}>Dashboard</Text>),
    //         tabBarIcon: (<Image style={styles.tabImg} source={require('./images/dashboard-icon-grey.png')}/>)
    //     }
    // },
    myCourses: {
        screen: MyCourses,
        navigationOptions:{
            tabBarLabel: ({tintColor}) => (<Text style={[styles.tabLabel, {color:tintColor}]}>My Courses</Text>),
            tabBarIcon: ({tintColor}) => (<Image style={[styles.tabImg, {tintColor: tintColor}]} source={require('./images/course-icon-grey.png')}/>)
        }
    },
    doubtsForum: {
        screen: DoubtsForum,
        navigationOptions:{
            tabBarLabel: ({tintColor}) => (<Text style={[styles.tabLabel, {color:tintColor}]}>Doubts Forum</Text>),
            tabBarIcon: ({tintColor}) => (<Image style={[styles.tabImg, {tintColor: tintColor}]} source={require('./images/doubts-icon-grey.png')}/>)
        }
    },
    // magazine: {
    //     screen: Magazine,
    //     navigationOptions:{
    //         //tabBarLabel: (<Text style={styles.tabLabel}>Magazine</Text>),
    //         tabBarIcon: (<Image style={styles.tabImg} source={require('./images/magazine-icon-grey.png')}/>)
    //     }
    // },
}, {
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions:{
        activeTintColor: '#2B7DE1',
        inactiveTintColor: '#333',
        showIcon: true,
        //showLabel:false,
        style: {
            backgroundColor:'#FFF',
            borderTopWidth:1, borderTopColor:'#EEE',
            elevation:2
        },
        indicatorStyle: { display:'none' },
        allowFontScaling: true
    },
    tabBarVisible: false
});

const Draw = DrawerNavigator({
    // dashboard:{ screen:TabScreens, navigationOptions: ({navigation}) => 
    //     ({ drawerLabel: getDrawableText('Home', navigation.navigate('myCourses'))
    // })},
    myCourses: { screen: TabScreens, navigationOptions: ({navigation}) => 
        ({ drawerLabel: getDrawableText('My Courses', navigation, 'myCourses', require('./images/menu/Menu_Course.png')) 
    })},
    offMyCourses: { screen: OfflineMyCourses, navigationOptions: ({navigation}) => 
        ({ drawerLabel: getDrawableText('My Courses Offline', navigation, 'offMyCourses', require('./images/menu/Menu_Course.png')) 
    })},
    notification: { screen: Notification, navigationOptions: ({navigation}) => 
        ({ drawerLabel: getDrawableText('Notifications', navigation, 'notification', require('./images/menu/Menu_Notifications.png')) 
    })},
    contact: { screen: Contact, navigationOptions: ({navigation}) => 
        ({ drawerLabel: getDrawableText('Contact', navigation, 'contact', require('./images/menu/Menu_Contactus.png')) 
    })},
    profile: { screen: Profile, navigationOptions: ({navigation}) => 
        ({ drawerLabel: getDrawableText('My Profile', navigation, 'profile', require('./images/menu/Menu_My_Profile.png')) 
    })},
    login: { screen: Login, navigationOptions: ({navigation}) => 
        ({ drawerLabel: getDrawableText('Logout', navigation, 'login', require('./images/menu/Menu_Logout.png'))
    })},
},{
    drawerBackgroundColor:'#2B7DE1',
}
);

function getDrawableText(text, navigation, screenName, imageName){
    return (<TouchableOpacity onPress={() => {
            if(text === 'Logout'){
                Alert.alert('Logout','Are you sure you want to logout',
                    [{text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'YES', onPress: () => {AsyncStorage.clear(); navigation.navigate(screenName);}}]
                  )
            } else {
                navigation.navigate(screenName);
            }
        }} style={{ flex:1, flexDirection:'row', paddingHorizontal:20, paddingVertical:15, borderBottomWidth:1, borderBottomColor:'#76B8F7'}}>
        <Image style={[styles.tabImg, {marginRight:10}]} source={imageName}/>
        <Text style={{color:'#FFF'}}>{text}</Text>
    </TouchableOpacity>);
}



