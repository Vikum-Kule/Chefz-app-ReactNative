import React from "react";
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { windowHeight, windowWidth } from "../utils/Diamentions";
import {SocialIcon} from 'react-native-elements';

const SocialButton = ({buttonTitle,
    btnType,
    color,
    backgroundColor,
    ...rest}) => {
        let bgColor = backgroundColor;
    return (
        <TouchableOpacity style = {[styles.buttonContainer, {backgroundColor: bgColor}]} {...rest}>

            <View style={styles.iconWrapper}>
                <SocialIcon
                  type="foursquare"
                  onPress={() => {
                    alert('foursquare');
                  }}
                />
            </View>
            <View style={styles.btnTxtWrapper}>
                <Text style= {styles.buttonText}>{buttonTitle}
                </Text>
             </View>

            {/* <View style={styles.iconWrapper}>
                <FontAwesome name={btnType} style={styles.icon} size={22} color={color} />
            </View>
            <View style={styles.btnTxtWrapper}>
                <Text style = {styles.buttonText}>{buttonTitle}</Text>
            </View> */}
            
        </TouchableOpacity>
    );
}

export default SocialButton;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 13,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 10,
      },
      iconWrapper: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        fontWeight: 'bold',
      },
      btnTxtWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Lato-Regular',
      },
});