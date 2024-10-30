import { Text, View, TextInput, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function Index() {
  const router = useRouter()

  return (
    <View
      style={{
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={styles.parentContainer}
      >
        <View
          style={styles.pad}
        >
          <Image
            style={styles.logo}
            
            source={require('../assets/images/app_logo.png')}
            resizeMode="contain"
          />
        </View>
        <View
          style={styles.loginContainer}
        >
          <TextInput
            placeholder = "email address"
            keyboardType = "email-address"
            style={styles.input}
            />
          <TextInput
            placeholder = "username"
            keyboardType = "email-address"
            style={styles.input}
            />
            <TextInput
            placeholder = "password"
            keyboardType = "email-address"
            style={styles.input}
            />
            <View style={styles.buttonStyle}>
              <Button
                onPress={() => router.navigate('../')}
                color={"#2C2C2C"}
                title='Register'
              />
            </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: "#C4AA3F",
    padding: 0,
    flex: 1,
  },
  buttonContainer: {
    height: 50,
    width: 240,
    alignContent: "center",
    paddingTop: 10,
  },

  buttonStyle: {
    alignContent: "center",
    alignSelf: "center",
    height: 40,
    margin: 7,
    marginTop: 15,
    width: 200,
  },

  input: {
    backgroundColor: "#FFFFE4",
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: 240,
  },
  
  title: {
    fontSize: 50,
    alignSelf: 'center',
  },
  loginContainer: {
    borderColor: 'black',
    alignContent: "center",
    borderWidth: 0,
    paddingTop: 50,
    paddingHorizontal: 100,
    flex: 3,
  },
  pad: {
    borderColor: 'black',
    borderWidth: 0,
    flex: 2,
    marginTop: 50,
  },
  logo: {
    borderWidth: 1,
    alignSelf: 'center',
    flex: 1,
  },
});