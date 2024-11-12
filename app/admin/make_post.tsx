import React from 'react';
import { StyleSheet, Button, Text, TextInput, View, Image, ScrollView, TouchableOpacity } from 'react-native';



export default function Post() {
    return (
        <View style={styles.parentContainer}>
            <Image 
              style={styles.profilePic}
              source={require('../../assets/images/pfp4.png')}
              />
            <View style={styles.textContainer}>
                <TextInput
                placeholder = "placeholder text :)"
                keyboardType = 'twitter'
                autoFocus={true}
                style={styles.input}
                multiline={true}
                textAlignVertical='top'
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    profilePic: {
        marginTop: 20,
        marginLeft: 10,
        width: 40,
        height: 40,
      },
    parentContainer: {
        backgroundColor: "#C4AA3F",
        padding: 0,
        flex: 1,
        flexDirection:'row',
      },
    textContainer: {
        backgroundColor: "#C4AA3F",
        borderColor: 'black',
        alignContent: "center",
        marginTop: 20,
        margin: 10,
        
      },
    input: {
        backgroundColor: "#C4AA3F",
        flexShrink:1,
        flexWrap: 'wrap',
        width: 330,
        height: 500,
        padding: 10,
        
    },
});