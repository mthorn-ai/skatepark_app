
export async function migrate(db) {
  // FOR DEBUGGING or TESTING: Reset users TABLE
  await db.runAsync('DROP TABLE IF EXISTS users');
  await db.execAsync(`PRAGMA user_version = 0`);

  // Get user Db version
  let obj = await db.getFirstAsync(
    'PRAGMA user_version'
  );
  let currentDbVersion = obj.user_version;

  // FOR DEBUGGING: print user version
  // console.log(currentDbVersion)

  // Migrate Db version 1
  if (currentDbVersion < 1) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL, admin INTEGER NOT NULL);
    `);
    await db.runAsync('INSERT INTO users (username, password, email, admin) VALUES (?, ?, ?, ?)', 'tom1', 'password123', 'tom1@example.com', 0);
    await db.runAsync('INSERT INTO users (username, password, email, admin) VALUES (?, ?, ?, ?)', 'alice3', '12345', 'alice3@example.com', 0);
    await db.runAsync('INSERT INTO users (username, password, email, admin) VALUES (?, ?, ?, ?)', 'admin', 'admin', 'admin@example.com', 1);

    await db.execAsync(`PRAGMA user_version = 1`);
    currentDbVersion = 1;
  };
  // console.log(currentDbVersion)
}