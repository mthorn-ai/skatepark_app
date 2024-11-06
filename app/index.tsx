import { Text, View, TextInput, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState, Suspense } from "react";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from "expo-sqlite";
import { migrate } from '../scripts/dbManagement';

interface User {
  username: string
  password: string
  email: string
  admin: number
};

export default function Index() {
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
          <Login/>
        </SQLiteProvider>
      </Suspense>
    </View>
  );
}

function Login() {
  const router = useRouter();
  const db = useSQLiteContext();

  const [username, changeUsernameTxt] = useState("");
  const [password, changePasswordTxt] = useState("");

  const auth = async (username: string, password: string, db: SQLiteDatabase) => {
    if (password == null || username == null) {
      return Promise.reject('Invalid Input');
    }
    try {
      const matchingCreds = await db.getAllAsync<User>('SELECT * FROM users WHERE username = ? AND password = ?', username, password)
      if (matchingCreds.length == 0) {
        return Promise.reject('No matching User in Database');
      } else if (matchingCreds.length > 1) {
        // FOR DEBUGGING: ERROR when multiple accounts share credentials
        return Promise.reject('Repeat Creds --> Username: ' + username + '; Password: ' + password);
      };
      return Promise.resolve({message: 'User is authenticated', result: matchingCreds[0]});
    } catch(error) {
      return Promise.reject(error);
    };
  };

  const loginHandler = async () => {
    try {
      const response = await auth(username, password, db);
      console.log(response.message);
      if(response.result.admin == 0) {
        router.navigate('../user/home');
      } else {
        router.navigate('../admin/home')
      };
    } catch(error) {
      console.log(error);
      changeUsernameTxt('');
      changePasswordTxt('');
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
          placeholder = "login"
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
            onPress={loginHandler} // onPress={() => router.navigate('../admin/home')}
            title='Login'
            color={"#2C2C2C"}
          />
        </View>
        <TouchableOpacity style={{alignSelf:'center',marginTop:32}} 
          onPress={()=> router.navigate('../register')}>
            <Text style={{fontWeight:'500',color:'#FFFFFF'}}> Don't have an account? 
              <Text style={{fontWeight:'500',color:'#000000',textDecorationLine:"underline"}}>Sign up</Text>
            </Text>
          </TouchableOpacity>
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
