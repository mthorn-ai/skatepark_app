import { Text, View, TextInput, StyleSheet, Image, Button } from "react-native";
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
              <Text
                style={styles.title}
                >
                Login</Text>
              <TextInput
                placeholder = "login"
                keyboardType = "email-address"
                style={styles.input}
                />
                <TextInput
                placeholder = "password"
                keyboardType = "email-address"
                style={styles.input}
                />
                <Button
                  onPress={() => router.navigate('../register/page')}
                  title='Register Here'
                />
            </View>
          </View>
        </SQLiteProvider>
      </Suspense>
    </View>
  );
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