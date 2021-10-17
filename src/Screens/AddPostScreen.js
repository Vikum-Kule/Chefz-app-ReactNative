import React, {useState, useContext, setState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import DropDownPicker from "react-native-custom-dropdown";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPost';

import { AuthContext } from '../Auth/AuthProvider';

const AddPostScreen = () => {
  const {user, logout} = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [postTitle, setpostTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(null);
  
  const [userData, setUserData] = useState(null);

  const getUser = async() => {
    console.log(user.uid);
    await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      console.log('User Data', documentSnapshot);
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    getUser();
  }, []);


  const SetCategory = (item) =>{
      setCategory(item.value)
  }

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('description: ', postTitle);

    firestore()
    .collection('posts')
    .add({
      userId: user.uid,
      username:userData.username,
      postTitle: postTitle,
      postImg: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
      category: category,
      description: description,
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      setpostTitle(null);
      setDescription(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }

  const uploadImage = async () => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <InputWrapper>
        {image != null ? <AddImage source={{uri: image}} /> : null}

        <DropDownPicker
            items={[
                {label: 'Rice', value: 'Rice'},
                {label: 'Noodles', value: 'Noodles'},
                {label: 'Sweet', value: 'Sweet'},
                {label: 'Desserts', value: 'Desserts'},
            ]}
            defaultValue={category}
            containerStyle={{height: 40, width: "92%", borderRadius: 8}}
            style={{backgroundColor: '#2e64e515', borderRadius: 8}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            placeholder= 'Select Category'
            placeholderStyle= {
                {
                    color: "gray",
                    fontSize: 20
                }
            }
            onChangeItem={item => SetCategory(item)}
        />

        <InputField
          placeholder="Recipe Title"
          multiline
          numberOfLines={2}
          value={postTitle}
          onChangeText={(content) => setpostTitle(content)}
        />
        <InputField
          placeholder="description"
          multiline
          numberOfLines={6}
          value={description}
          onChangeText={(content) => setDescription(content)}
        />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={submitPost}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}
      </InputWrapper>
      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>

      </ScrollView>
      
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  viewStyle: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    width: "92%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemStyle: {
    fontSize: 10,
    fontFamily: "Roboto-Regular",
    color: "#007aff"
  },
  pickerStyle: {
    width: "100%",
    height: 40,
    color: "#007aff",
    fontSize: 14,
    fontFamily: "Roboto-Regular"
  },
  textStyle: {
    fontSize: 14,
    fontFamily: "Roboto-Regular"
  },
  scrollView:{
    width:"100%"
  }
});