import {Platform, Dimensions} from 'react-native';

const {winW, winH} = Dimensions.get('window');

const AndroidStyles = {
    mainLayout:{
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 30
    },
    logoImgStyle:{
        width: winW,
        height: 180,
        resizeMode: 'contain'
    },
    inputImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },

    // Login, Signup, Forgotpwd
    authInputWrap:{
        alignSelf: 'stretch', 
        borderWidth:1, 
        borderColor:'#DDD',
        paddingHorizontal: 10
    },
    screenHeader: { fontSize: 20, fontWeight: 'bold' },

    // Common usage classes
    jStart: { justifyContent:'flex-start' },
    jCenter: { justifyContent: 'center' },
    jEnd: { justifyContent:'flex-end'},
    aitStart: { alignItems: 'flex-start' },
    aitCenter: { alignItems: 'center' },
    aitEnd: { alignItems: 'flex-end' },
    aslStretch: { alignSelf: 'stretch' },
    aslCenter: { alignSelf: 'center' },
    aslEnd: {alignSelf:'flex-end'},
    row:{flexDirection:'row'},
    jSpaceBet: {justifyContent:'space-between'},
    jSpaceArd: {justifyContent:'space-around'},
    txtAlignCen: {textAlign:'center'},
    txtAlignLt: {textAlign:'left'},
    txtAlignRt: {textAlign:'right'},
    alignCenter:{ alignItems:'center', justifyContent:'center' },
    
    // Margins
    mB5: { marginBottom: 5 },
    mB10: {marginBottom:10},
    mR5: {marginRight:5},
    mR10: {marginRight:10},

    mT5:{ marginTop:5 },
    mT10:{ marginTop:10 },    
    mT20:{ marginTop:20 },
    mT30:{ marginTop:30 },
    // Margins
    m3:{ margin: 3 },
    m5:{ margin: 5 },
    m8:{ margin: 8 },
    m10:{ margin: 10 },
    m15:{ margin: 15 },
    m20:{ margin: 20 },
    mLt5:{ marginLeft: 5 },
    mLt10:{ marginLeft: 10 },
    mLt15:{ marginLeft: 15 },
    mLt20:{ marginLeft: 20 },
    mLt70minus: { marginLeft: -70 },
    mTop10minus: { marginTop: -10 },
    mTop30minus: { marginTop: -30 },
    mRt5:{ marginRight: 5 },
    mRt10:{ marginRight: 10 },
    mRt15:{ marginRight: 15 },
    mRt20:{ marginRight: 20 },
    mTop3:{ marginTop: 3 },
    mTop5:{ marginTop: 5 },
    mTop10:{ marginTop: 10 },
    mTop15:{ marginTop: 15 },
    mTop20:{ marginTop: 20 },
    mTop30:{ marginTop: 30 },
    mTop40:{ marginTop: 40 },
    mBtm10:{ marginBottom: 10 },
    mBtm20:{ marginBottom: 20 },
    mBtm50:{ marginBottom: 50 },
    mBtm70:{ marginBottom: 70 },
    marH5:{ marginHorizontal:5 },

    marH10:{ marginHorizontal:10 },
    marH20:{ marginHorizontal:20 },
    marH30:{ marginHorizontal:30 },
    marH40:{ marginHorizontal:40 },
    marH75:{ marginHorizontal:75 },
    marV5:{ marginVertical:5 },
    marV10:{ marginVertical:10 },
    marV15:{ marginVertical:15 },
    marV20:{ marginVertical:20 },
    marV30:{ marginVertical:30 },

    p5:{ padding: 5 },
    p10:{ padding: 10 },
    p15:{ padding: 15 },
    p20:{ padding: 20 },
    pTop10:{paddingTop:10},
    pTop20:{paddingTop:20},
    padLt25:{ paddingLeft:25 },
    pBtm5:{ paddingBottom:5 },
    padV5:{ paddingVertical:5 },
    padV10:{ paddingVertical:10 },
    padV15:{ paddingVertical:15 },
    padV20:{ paddingVertical:20 },
    padH5:{ paddingHorizontal:5 },
    padH10:{ paddingHorizontal:10 },
    padH15:{ paddingHorizontal:15 },
    padH20:{ paddingHorizontal:20 },
    padH40:{ paddingHorizontal:40 },

    f14:{fontSize:16},
    fBold: {fontWeight:'600'},

    // Text colors used
    cFFF:{ color: '#FFF' },
    c333:{ color: '#333' },
    c666:{ color: '#666' },
    c777:{ color: '#777' },
    cBlue:{ color: '#2B7DE1' },
    cOrg: { color: '#F89A1E'},
    
    // Border radius
    bNone: { borderWidth:0 },
    bTNone: { borderTopWidth: 0 },
    bBLRad5:{ borderBottomLeftRadius: 5 },
    bBRRad5:{ borderBottomRightRadius: 5 },
    bTLRad5:{ borderTopLeftRadius: 5 },
    bTRRad5:{ borderTopRightRadius: 5 },

    // Flex
    flex1:{ flex: 1 },
    fadeBg: {backgroundColor:'rgba(0,0,0,0.7)', position:'absolute', top:0, bottom:0,
        left:0, right:0},
    bgFFF: {backgroundColor:'#FFF'},
    bgBlue: {backgroundColor:'#2B7DE1'},

    // Buttons
    orgButton:{
        backgroundColor: '#F89A1E',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginVertical: 20
    },

    // Text fields
    pickerWrapStyle:{
        alignSelf: 'stretch', 
        borderWidth:1, 
        borderColor:'#DDD',
        borderRadius: 5,
        paddingHorizontal: 5,
        marginVertical: 5
    },
    pickerStyle:{
        height: 40
    },
    inputWrapStyle:{
        alignSelf: 'stretch', 
        borderWidth:1, 
        borderColor:'#DDD',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5
    },
    inputStyle:{
        height: 40
    },
    menuHeaderStyle:{
        backgroundColor: '#2B7DE1',
        padding: 20
    },
    notifyCountStyle:{
        backgroundColor:'#2B7DE1',
        position: 'absolute',
        top: 0, right: 0, zIndex: 1,
        width: 15, height: 15, borderRadius: 20,
        borderWidth: 1, borderColor: '#FFF',
        justifyContent: 'center', alignItems: 'center'
    },
    dashboardButtons:{
        backgroundColor:'#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 15,
        marginVertical: 10
    },
    dashboardBtnBlueBg:{
        backgroundColor:'#2B7DE1'
    },
    roundButton:{
        backgroundColor:'#FFF',
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 15,
        marginVertical: 10,
        width: 130
    },
    mroundButton:{
        backgroundColor:'#FFF',
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 15,
        marginVertical: 10,
        width: 200
    },
    magazineDetailBtn:{
        width: 80,backgroundColor: '#2B7DE1'
    },
    courseVideoBtn:{
        borderWidth: 1,
        borderColor: '#DDD',
        width: 80
    },
    courseVideoBtnBlue:{
        backgroundColor: '#2B7DE1'
    },
    courseDisableGreyBtn:{ backgroundColor: '#DDD'},
    askDoubtPopupMainBg:{position:'absolute', top:80, left:20, right:20, borderRadius:5},
    askDoubtPopupCloseImg: {width:30,height:30},
    askDoubtBtns:{ paddingHorizontal:15, paddingVertical:5, borderRadius: 15, borderWidth:1, borderColor:'#EEE', margin:5 },
    askDoubtBtnBlue:{ backgroundColor: '#2B7DE1' },

    // Accordion 
    accordWrap:{
        borderWidth: 1,
        borderColor: '#EEE',
        marginVertical: 10
    },
    accordHeader:{
        backgroundColor: '#EEE',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    accordBody:{
        padding: 10
    },
    accordDiscussWrap:{
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 5,
    },
    accordBtnBlue:{
        backgroundColor: '#2B7DE1',
        width: 150
    },

    magazineWrap:{
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginVertical: 10
    },
    magazineTitle:{
        fontSize: 15
    },

    f10:{ fontSize:10 },
    f12:{ fontSize:12 },
    f16:{ fontSize:16 },
    f18:{ fontSize:18 },
    f20:{ fontSize:20 },

    bankExamTitle:{ 
        backgroundColor:'#EEE',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD'
    },
    brdBottomBlue:{
        borderBottomWidth: 2,
        borderBottomColor: '#2B7DE1'
    },
    brdBottomNone:{
        borderBottomWidth: 0,
    },
    brdBottomProfile:{
        borderBottomWidth: 1,
        borderBottomColor: '#EEE'
    },
    innerTabs:{
        justifyContent:'space-around', 
        borderBottomWidth:1, 
        borderBottomColor:'#DDD',
        paddingTop: 5,
        backgroundColor: '#FFF'
    },
    modalView: {
        backgroundColor:'white',
        height: 350,
        width:350,
        justifyContent:'center',
        alignItems:'center',
        marginTop:150,
        marginLeft:35,
        marginRight:35
      },
      closeText:{
        backgroundColor:'#333',
        color:'#bbb',
        padding: 5,
        margin:20,
        alignSelf:'flex-end'
      },
      openText:{
        backgroundColor:'#333',
        color:'#bbb',
        padding: 5,
        margin:20
      },
      
      profileForm: {
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        backgroundColor: 'white',
        position:'absolute',
        top: 50,
        left:20,
        right: 20
     },

     profileWrap:{
        borderTopWidth:1,
        borderTopColor: '#76b8f7'
     },
     profileUpdateIcon:{position:'absolute', top:10, right:20},
     profileImgEditIcon:{position:'absolute', top:0, paddingLeft:100, alignItems:'center'},
    imgWH20: { resizeMode:'contain', width: 20, height:20 },
    profileImage:{ width: 80, height: 80, resizeMode:'contain' },
    profilePicWrap:{width:105, height:105, borderWidth:2, borderColor:'#badcff', borderRadius:55, justifyContent:'center', alignItems:'center'},

    notifyHeadingWrap:{borderBottomWidth:1, borderBottomColor:'#EEE', paddingBottom:0},
    notifyHeadingText:{borderBottomWidth:2, borderBottomColor:'#2482DF', width:180, paddingLeft:20, paddingTop:10, color:'#327DD4'},
    notificationHeader:{paddingVertical:4, borderBottomWidth:0.5, borderBottomColor:'#9CB4C9'},
    notificationContent:{paddingHorizontal:13, paddingVertical:5, borderWidth:1, borderColor:'#9CB4C9'},
    videoNetworkError: {
        position:'absolute', top:0, left:0, right:0, bottom:0, backgroundColor:'#FF8F8F',
        justifyContent:'center', alignItems:'center', 
    },
    networkErrorText:{color:'#FFF', fontSize:16, marginTop:10},
    videoSeekBar: {position:'absolute', left:0, right:0, bottom:0, zIndex: 999,
    height:50, backgroundColor:'#rgba(0,0,0,0.3)', flexDirection:'row'},
    videoLogoBox:{backgroundColor:'#EEE', width:'24%', position:'absolute', right:0, bottom: 0, zIndex:99, height:50, 
    paddingHorizontal:5, justifyContent:'center', alignItems:'center'},

    ptOptions:{ width:20, height:20, borderWidth:1, borderColor:'#DDD', borderRadius:20, padding:10 },
    ptNavBtns:{ backgroundColor:'#2A7CE0', paddingHorizontal:15, paddingVertical:5, borderRadius: 15 },
};
const IosStyles = {

};
const style = Platform.OS === 'ios' ? IosStyles : AndroidStyles;

export default style;