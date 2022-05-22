import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import MlkitOcr, { MlkitOcrResult } from 'react-native-mlkit-ocr';

import * as ImagePicker from 'expo-image-picker';
import OCRSearch from './Components/OCRSearch';

export default function App() {
  // The path of the picked image
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [ocrResult, setOcrResult] = React.useState(MlkitOcrResult | null);

  let showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
  
    const imagePickingResult = await ImagePicker.launchImageLibraryAsync();
  
    // Explore the result
    console.log(imagePickingResult);
  
    if (imagePickingResult.cancelled) {
      return;
    }
    else {
      setSelectedImage({ localUri: imagePickingResult.uri });
      setOcrResult(await MlkitOcr.detectFromUri(imagePickingResult.uri));
      //MlkitOcr.detectFromUri(imagePickingResult.uri)
      //console.log(ocrResult);
    }
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <Button onPress={showImagePicker} title="Charger une austre image à scanner!" />
        <Text
          style={styles.description_text} >
            {ocrResult}
        </Text>
        {/* <OCRSearch localUri={selectedImage.localUri}/> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button onPress={showImagePicker} title="Charger une image à scanner!" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
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
});
