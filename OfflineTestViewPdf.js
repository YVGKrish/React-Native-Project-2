import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  NativeModules
} from 'react-native';
import Pdf from 'react-native-pdf';

export default class OfflineTestViewPdf extends Component {

  state = {pdfLink:'', pdfBool: false};

  componentWillMount() {
      if (this.props.navigation.state.params.pdfPath) {
        this.setState({ pdfBool: true, pdfLink: this.props.navigation.state.params.pdfPath });
      } else {
        alert("Could not load PDF, try again");
      }
  }

  renderPdf(){
    if(this.state.pdfBool){
      const source = {uri: this.state.pdfLink, cache:true};
      return (<Pdf source={source} style={styles.pdf} onLoadComplete={(numberOfPages,filePath,page)=>{
          ToastAndroid.showWithGravityAndOffset('number of pages:'+ numberOfPages, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      }} onError={(error)=>{ console.log(error); }} />);
    } else {
      return;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderPdf()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
}
});
