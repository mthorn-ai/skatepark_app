import { Text, View, TextInput, StyleSheet, Image, Button } from "react-native";
import { useRouter } from "expo-router";
import { useState, Suspense } from "react";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from "expo-sqlite";

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
        <SQLiteProvider databaseName="myDatabase.db" onInit={migrateDbIfNeeded} useSuspense>
          <Login/>
        </SQLiteProvider>
      </Suspense>
    </View>
  );
}

function Login() {
  const router = useRouter()
  const db = useSQLiteContext()

  const [username, changeUsernameTxt] = useState("")
  const [password, changePasswordTxt] = useState("")

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
      }
      return Promise.resolve('User is authenticated')
    } catch(error) {
      return Promise.reject(error)
    }
  }

  const loginHandle = async () => {
    try {
      const status = await auth(username, password, db)
      console.log(status)
      router.navigate('../user/page')
    } catch(error) {
      console.log(error)
      changeUsernameTxt('')
      changePasswordTxt('')
    }
  }

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
        <Text
          style={styles.title}
          >
          Username</Text>
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
        <Button
          onPress={loginHandle}
          title='Login'
        />
        <Button
          onPress={() => router.navigate('../register/page')}
          title='Register Here'
        />
      </View>
    </View>
  )
}

interface User {
  username: string
  password: string
}

const styles = StyleSheet.create({
  parentContainer: {
    padding: 0,
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
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
    borderWidth: 1,
    padding: 100,
    flex: 3,
  },
  pad: {
    borderColor: 'black',
    borderWidth: 1,
    flex: 2,
  },
  logo: {
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'center',
    flex: 1,
  },
});

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  // FOR DEBUGGING: Reset users TABLE
  // await db.runAsync('DROP TABLE IF EXISTS users');
  // await db.execAsync(`PRAGMA user_version = 0`);

  // Get user Db version
  let obj = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  let currentDbVersion = obj!.user_version

  // FOR DEBUGGING: print user version
  // console.log(currentDbVersion)

  // Migrate Db version 1
  if (currentDbVersion < 1) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL);
    `);
    await db.runAsync('INSERT INTO users (username, password) VALUES (?, ?)', 'tom1', 'password123');
    await db.runAsync('INSERT INTO users (username, password) VALUES (?, ?)', 'alice3', '12345');

    await db.execAsync(`PRAGMA user_version = 1`);
    currentDbVersion = 1
  }
  // console.log(currentDbVersion)
}