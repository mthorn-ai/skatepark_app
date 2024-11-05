import { Text, View, TextInput, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Suspense, useState } from "react";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from "expo-sqlite";
import { migrate } from '../scripts/dbManagement';

interface User {
  username: string
  password: string
  email: string
  admin: number
};

export default function Register() {
  const router = useRouter()

  return (
    <View
      style={{
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Suspense fallback={<Text>Loading. . .</Text>}>
        <SQLiteProvider databaseName="myDatabase.db" onInit={migrate} useSuspense>
          <RegisterComp/>
        </SQLiteProvider>
      </Suspense>
    </View>
  );
};

function RegisterComp() {
  const router = useRouter();
  const db = useSQLiteContext();

  const [username, changeUsernameTxt] = useState("");
  const [password, changePasswordTxt] = useState("");
  const [email, changeEmailTxt] = useState("");

  const register = async (username: string, password: string, email: string, db: SQLiteDatabase) => {
    try {
      if (!username || !password || !email) {
        return Promise.reject("Invalid Input")
      };
      
      const result = await db.getAllAsync<User>('SELECT * FROM users WHERE username = ?', username);
      if (result) {
        return Promise.reject("Username Taken");
      };
      await db.runAsync('INSERT INTO users (username, password, email, admin) VALUES (?, ?, ?, ?)', username, password, email, 0);

      return Promise.resolve('User is registered');
    } catch(error) {
      return Promise.reject(error);
    };
  };

  const registerHandler = async () => {
    try {
      const status = await register(username, password, email, db);
      console.log(status);
      router.navigate('../');
    } catch(error) {
      console.log(error);
      changePasswordTxt('');
      //update graphics here
    };
  };

  return (
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
          value={email}
          onChangeText={changeEmailTxt}
          />
        <TextInput
          placeholder = "username"
          keyboardType = "email-address"
          style={styles.input}
          value={username}
          onChangeText={changeUsernameTxt}
        />
        <TextInput
        placeholder = "password"
        keyboardType = "email-address"
        style={styles.input}
        value={password}
        onChangeText={changePasswordTxt}
        />
        <View style={styles.buttonStyle}>
          <Button
            onPress={registerHandler}
            color={"#2C2C2C"}
            title='Register'
          />
        </View>
      </View>
    </View>
  );
};

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