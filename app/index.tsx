import { Text, View, TextInput, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState, Suspense } from "react";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from "expo-sqlite";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

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
      <Suspense fallback={<Text>Loading. . .</Text>}>
        <SQLiteProvider databaseName="myDatabase.db" onInit={migrateDbIfNeeded} useSuspense>
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
                    onPress={() => router.navigate('../home')}
                    color={"#2C2C2C"}
                    title='Login'
                  />
                </View>
                <TouchableOpacity style={{alignSelf:'center',marginTop:32}} 
                  onPress={()=> router.navigate('../register')}>
                  <Text style={{color:'#FFF',fontSize:17}}>
                    Don't have an account? <Text style={{fontWeight:'500',color:'#000000',textDecorationLine:"underline"}}>
                      Sign up
                    </Text>
                  </Text>
                </TouchableOpacity>
            </View>
          </View>
        </SQLiteProvider>
      </Suspense>
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

interface User {
  username: string;
  password: string;
}

export function Info() {
  const db = useSQLiteContext();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<User>('SELECT * FROM users');
      setUsers(result);
    }
    setup();
  }, []);

  return (
    <View >
      {users.map((user, index) => (
        <View key={index}>
          <Text>{`${user.username} - ${user.password}`}</Text>
        </View>
      ))}
    </View>
  );
}

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
