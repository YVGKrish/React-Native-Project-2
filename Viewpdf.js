import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ToastAndroid
} from 'react-native';
import Pdf from 'react-native-pdf';

export default class Viewpdf extends Component {

  componentWillMount() {
    this.link = this.props.navigation.state.params.pdfLink;
  }

  render() {
    const source = {uri: this.link,cache:true};
    return (
      <View style={styles.container}>
        <Pdf 
        source={source} 
        style={styles.pdf}
        onLoadComplete={(numberOfPages,filePath,page)=>{
          ToastAndroid.showWithGravityAndOffset(
            'number of pages:'+ numberOfPages,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
      }}
      onPageChanged={(page,numberOfPages)=>{
          // ToastAndroid.showWithGravityAndOffset(
          //   page +'/'+ numberOfPages,
          //   ToastAndroid.SHORT,
          //   ToastAndroid.BOTTOM,
          //   25,
          //   50
          // );
      }}
      onError={(error)=>{
          console.log(error);
      }}
        />
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
