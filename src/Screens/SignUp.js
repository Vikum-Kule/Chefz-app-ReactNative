import React, {useContext, useState}  from "react";
import { View, Text, Button,Image,TouchableOpacity, Platform, ScrollView, StyleSheet, } from 'react-native';
import FormInput from '../components/Forminput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../Auth/AuthProvider'


const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
//   const {login, googleLogin, fbLogin} = useContext(AuthContext);

  const { register} = useContext(AuthContext)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Chefz</Text>
        
      <FormInput
        labelValue={username}
        onChangeText={(name) => setUsername(name)}
        placeholderText="Username"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail.trim())}
        placeholderText="Email"
        iconType="envelope"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Signup"
        onPress={() => register(username,email, password)}
      />


      {/* {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => {}}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() =>{}}
          />
        </View>
      ) : null} */}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={()=> navigation.navigate("Login")}>
        <Text style={styles.navButtonText}>
          Don you have already acount? Login
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
      },
      logo: {
        height: 150,
        borderRadius: 15,
        width: 150,
        resizeMode: 'cover',
      },
      text: {
        fontFamily: 'sans-serif',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 28,
        textShadowRadius: 4,
        textShadowOffset: {width: 2, height: 2},
        marginBottom: 10,
        color: '#051d5f',
      },
      navButton: {
        marginTop: 15,
      },
      forgotButton: {
        marginVertical: 35,
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
      },
})