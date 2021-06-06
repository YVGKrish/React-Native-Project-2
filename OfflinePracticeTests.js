import React, { Component } from 'react';
import {View, Image, Picker, ScrollView,Modal,Text, WebView, NativeModules ,Button, TouchableOpacity} from 'react-native';
import {CText, CButton, CPicker, CInput} from '../common/index';
import styles from '../common/Styles';
import MenuHeader from '../common/MenuHeader';
import Config from '../config/Config';

export default class OfflinePracticeTests extends Component{

state={ 
    Testdir:[] ,multiPdf: [],content:[],multiPdf:'',modalVisible: false,MulPdf:'',MultiplePdfData:[]
}

    componentWillMount(){
        if(this.props.navigation.state.params.topicSelected){
            NativeModules.FetchTests.GetTestFolders(this.props.navigation.state.params.topicSelected, (resp) => {
                this.setState({Testdir:JSON.parse(resp)});
            });
        }else {
                alert('Error, while running the test');
        }
    }
    fetchpdf(PdfPath, Topicselected, iVal){
        let mainCourseData=[];
        if(PdfPath.length>1){
            this.renderMultiPdf(PdfPath);
            this.setState({
                modalVisible:true,
                MultiplePdfData:PdfPath,
            });
        } else {
            this.props.navigation.navigate('OffTestViewPdf', {
                pdfPath: PdfPath[0].folderName,
                topicSelected:Topicselected
            });
    }
    }

    renderMultiPdf(data){
        if(data){
            let content = [];
            content.push(<Picker.Item key={0} label='Select pdf' value='' />)
            for(let i = 0; i < data.length; i++){
                content.push(<Picker.Item key={i+1} label={"PDF - "+parseInt(i+1)} value={data[i].folderName} />)
            }
            return content;
        } else {
            return <Picker.Item key={0} label='Select pdf' value='' />;
        }
    }

    loadpdf(pdfSelected,topic){
        if(pdfSelected){
        this.props.navigation.navigate('OffTestViewPdf', {
            pdfPath: pdfSelected,
            topicSelected:topic
        })
    }
    }

    renderContent(){
        if(this.state.Testdir.length > 0){
            let content=[];
            for(let i=0;i<this.state.Testdir.length;i++){
                if(this.state.Testdir[i].pdfPaths.length>0){
                    content.push(<View key={i} style={styles.magazineWrap}>  
                        <CText cStyle={styles.magazineTitle}>{this.state.Testdir[i].folderName}</CText>
                        <View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                        <View style={styles.jEnd}>
                            <CButton onPress={()=>
                            this.props.navigation.navigate('RenderOffPracticeTests', {
                                TestPath: this.state.Testdir[i].folderName,
                                topicSelected:this.props.navigation.state.params.topicSelected})} 
                cStyle={[styles.roundButton, styles.courseVideoBtn, styles.courseVideoBtnBlue, { width:100}]}  >
                                <CText cStyle={styles.f10}>START TEST</CText>
                            </CButton>
                        </View>
                        <View style={styles.jEnd}>
                            <CButton  cStyle={[styles.roundButton, styles.courseVideoBtn]}  onPress={()=>this.fetchpdf(this.state.Testdir[i].pdfPaths, this.props.navigation.state.params.topicSelected, this.state.Testdir[i].id)}>
                                <CText cStyle={styles.f10}>TEST PDF</CText>
                            </CButton>
                        </View>
                    </View>
                    </View>);
                } else {
                    content.push(<View key={i} style={styles.magazineWrap}>  
                        <CText cStyle={styles.magazineTitle}>{this.state.Testdir[i].folderName}</CText>
                        <View style={[styles.magazineDetails, styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                        <View style={styles.jEnd}>
                            <CButton onPress={()=>this.getTestData(this.state.Testdir[i].folderName)} cStyle={[styles.roundButton, styles.courseVideoBtn, styles.courseVideoBtnBlue, { width:100}]}  >
                                <CText cStyle={styles.f10}>START TEST</CText>
                            </CButton>
                        </View>
                        {/* <View style={styles.jEnd}>
                            <CButton cStyle={[styles.roundButton, styles.courseVideoBtn]}  >
                                <CText cStyle={styles.f10}>TEST PDF</CText>
                            </CButton>
                        </View> */}
                    </View>
                    </View>);
                }
            }
            return content;
        }else {
            return;
        }
    }
    render(){
        return (
            <View style={[styles.flex1,styles.bgFFF]}>
                <Modal
                transparent={true}
                visible={this.state.modalVisible}
                animationType={'slide'}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignContent:'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}>
                        <View style={{alignItems:'center',alignSelf:'center',justifyContent:'center',padding:10,backgroundColor:'white',width:"90%",}}>
                        <Picker style={{width:200, height:50, borderWidth:1, borderColor:'#DDD' }} value = {this.state.MulPdf}
                        onValueChange={(value) => { this.setState({ MulPdf:value }, () => { if(value !== '') {
                            this.setState({
                                modalVisible:false
                            });
                            this.loadpdf(value,this.props.navigation.state.params.topicSelected);
                            } }) }}>
                            {this.renderMultiPdf(this.state.MultiplePdfData)}
                        </Picker>
                        <Button
                            onPress={() => this.setState({modalVisible:false})}
                            title="Close">
                        </Button>
                        </View>
                        </View>
                </Modal>
                <MenuHeader
                    Offstatus={true}
                    iconType='BACK'
                    menuClick={() => this.props.navigation.goBack()}  
                    profileClick={()=>this.props.navigation.navigate('profile')} 
                    notificationClick={()=>this.props.navigation.navigate('notification')}  
                />
                <View style={[styles.bgFFF,styles.m10,styles.jCenter,styles.aitCenter]}>
                    <CText cStyle={[styles.screenHeader, styles.cBlue]}>OFFLINE PRACTICE TESTS</CText>
                </View>
                <View style={styles.mainLayout}>
                    <ScrollView>
                    {this.renderContent()}
                    </ScrollView>
                </View>
            </View> 
        );
    }
}