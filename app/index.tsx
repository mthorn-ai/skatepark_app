import { Text, View, Button, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState, Suspense } from "react";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from "expo-sqlite";
import { NavigationAction, NavigationContainer } from "@react-navigation/native";
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
          <Text>Home Page</Text>
          <TextInput
            placeholder = "login"
            keyboardType = "email-address"
            />
            <TextInput
            placeholder = "password"
            keyboardType = "email-address"
            />
          {/*<Info/>*/}
        </SQLiteProvider>
      </Suspense>
    </View>
  );
}

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
  const DATABASE_VERSION = 1;
  let obj = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  let currentDbVersion = obj!.user_version

  console.log(currentDbVersion)
  await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL);
  `);
  await db.runAsync('INSERT INTO users (username, password) VALUES (?, ?)', 'tom1', 'password123');
  await db.runAsync('INSERT INTO users (username, password) VALUES (?, ?)', 'alice3', '12345');

  console.log(currentDbVersion)

  await db.execAsync(`PRAGMA user_version = 1`);
}