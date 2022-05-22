import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Platform, Await } from 'react-native'
import MlkitOcr, { MlkitOcrResult } from 'react-native-mlkit-ocr';

class OCRSearch extends React.Component {


    constructor(props) {
        super (props)
        this.state = {
            result : [React.useState<MlkitOcrResult | undefined>(null)],
            isLoading: true
        }
    }

    _displayLoading() {
        if (this.state.result != undefined) {
            return (
                <View style={styles.loading_container}>
                  <ActivityIndicator size='large' />
                </View>
              )
        }
    }

    _displayOCRResult(){
        if (this.state.result !== undefined){
            return (
                <Text
                    style={styles.description_text} >
                        {this.state.result}</Text>
            )
        }
    }

    render() {
        return(
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayOCRResult()}
            </View>
        )
    }
    //Photo has been charged, start OCR
    componentDidMount(){
        async () => {
            setResult(await MlkitOcr.detectFromUri(response.uri));
        }
        
        // MlkitOcr.detectFromUri(this.state.localUri).then(data => {
        //     this.setState({
        //         result: data,
        //         isLoading: false
        //     })
        // });
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
      },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height:169,
        margin: 5
    },
    description_text: {
        textAlign: 'left',
        fontStyle: 'italic',
        fontSize: 15,
        flex: 1,
        marginLeft: 1,
        marginRight: 1,
        marginBottom: 10,
        color: '#302c2c'
    }
})

//Connect app state to Component state
const mapStateToProps = (state) => {
    return {
        localUri: state.localUri
    }
  }

  export default OCRSearch
