import sqlite3
con = sqlite3.connect('danceshare.db')

cur = con.cursor()
name = 'bob'
# Query database for username
cur.execute("SELECT * FROM users WHERE username = :username",{"username": name})
rows = cur.fetchall()
print(rows)