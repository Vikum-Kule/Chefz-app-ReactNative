import React from "react";
import { View, Text, Button, StyleSheet, } from 'react-native';


const Login = ({navigation}) => {
    return (
        <View style = {styles.container}>
            <Text>
                Login
            </Text>
            <Button
                title= 'Click here'
                onPress= {() => navigation.navigate("Login")}
            ></Button>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})