import sqlite3

connection = sqlite3.connect('data.db')

cursor = connection.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username text, password text)")
cursor.execute("INSERT INTO users VALUES (1,'admin','admin')")
cursor.execute("CREATE TABLE IF NOT EXISTS properties(owner text PRIMARY KEY, name text, description text, price real, currentBid real, imgsrc blob)")

connection.commit()
connection.close()
