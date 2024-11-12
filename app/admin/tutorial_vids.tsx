import React, {useState, useCallback } from 'react';
import { StyleSheet, Button, Linking, Text, TextInput, View, Image, ScrollView, TouchableOpacity } from 'react-native';




export default function Vids() {
  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <View style={styles.buttonStyle}>
                <TouchableOpacity
                style={[styles.buttonStyle, {borderTopWidth: 4}]}
                onPress={() => linkPressed('https://youtube.com/playlist?list=PL3BkFpaieDNIRzmFf-_irRmenZ9ICZFAZ&si=1cEeNilCQd4Cl1Zb')}
                >
                    <Text style= {styles.textStyle}>LEARN TO RIDE</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonStyle}>
                <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => linkPressed('https://youtube.com/playlist?list=PL3BkFpaieDNKd8j7Wn-VpSpKYsIG5gDS_&si=tnH7OQLXzHg0TEAV')}
                >
                    <Text style= {styles.textStyle}>LEARN TO SHUVIT/POP SHUVIT</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonStyle}>
                <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => linkPressed('https://youtube.com/playlist?list=PL3BkFpaieDNI52fTh7LpjRl9jp0pSqHkF&si=bZmgMuapBuNX5ucN')}
                >
                    <Text style= {styles.textStyle}>LEARN TO OLLIE</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonStyle}>
                <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => linkPressed('https://youtube.com/playlist?list=PL3BkFpaieDNIYhm1C3crgVsqMzguUokF1&si=oV5PoFG_GRbSU5R1')}
                >
                    <Text style= {styles.textStyle}>USING RAMPS/DROPPING IN</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonStyle}>
                <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => linkPressed('https://youtube.com/playlist?list=PL3BkFpaieDNJgKDlEW688DLaCA9ipZunv&si=RfyQiQixlzKkpOWx')}
                >
                    <Text style= {styles.textStyle}>LEARN TO NO COMPLY</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonStyle}>
                <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => linkPressed('https://youtube.com/playlist?list=PL3BkFpaieDNKJIpTW_2gcL-lk4T77maDu&si=SggNKDPYR7nJ4HCa')}
                >
                    <Text style= {styles.textStyle}>LEARN TO HEELFLIP</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonStyle}>
                <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => linkPressed('https://youtube.com/playlist?list=PL3BkFpaieDNIGSfxP4G5FsMrRGz8pK4u-&si=--ABSzJS_gJq9ZZ8')}
                >
                    <Text style= {styles.textStyle}>LEARN TO FRONTSIDE 180</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonStyle}>
                <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => linkPressed('https://youtube.com/playlist?list=PL3BkFpaieDNI70RBT96TxMtlLM80Ec5dj&si=Mh3-8xbjwHQknyvx')}
                >
                    <Text style= {styles.textStyle}>LEARN TO KICKFLIP</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonStyle}>
                <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => linkPressed('https://youtube.com/playlist?list=PL3BkFpaieDNK_AZTk_vLVlXbb5OoVs5v-&si=3hdMvjNwYsBUZKBP')}
                >
                    <Text style= {styles.textStyle}>LEARN TO TRE FLIP</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonStyle}>
                <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => linkPressed('https://youtube.com/playlist?list=PL3BkFpaieDNKVUBL8U0GYJUD6yKOG1Eeg&si=Beb_yxddvapiJ4Up')}
                >
                    <Text style= {styles.textStyle}>LEARN TO LASER FLIP</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonStyle}>
                <TouchableOpacity
                style={[styles.buttonStyle, {borderBottomWidth: 4}]}
                onPress={() => linkPressed('https://youtube.com/playlist?list=PL3BkFpaieDNJN6QTJl0JbW59xDHi7-a_W&si=C3D7SC5WaZmcjG1_')}
                >
                    <Text style= {styles.textStyle}>LEARN TO CASPER FLIP</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
    
  );
};

function linkPressed(url: string){
    Linking.openURL(url)
}

const styles = StyleSheet.create({
    textStyle: {
        fontWeight:'500', 
        fontSize: 20,
        textDecorationLine: 'underline',
    },
    scrollView: {
        backgroundColor: '#C4AA3F',
        padding: 20,
    },
    buttonStyle: {
        justifyContent:'center',
        alignItems: 'center',
        height: 100,
        width: '100%',
        borderWidth: 2,
        borderLeftColor: '#C4AA3F',
        borderRightColor: '#C4AA3F',
        elevation: 0,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: "#C4AA3F",
    },
    video: {
        width: '100%',
        height: 300,
    },
});





     
