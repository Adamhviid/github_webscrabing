import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./repos.db');

const createSchema = () => {
  db.serialize(() => {
    db.run("CREATE TABLE repos (id Integer, username Text, repo Text)");

    const stmt = db.prepare("INSERT INTO repos VALUES (?)");

    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM repos", (err, row) => {
      console.log(row.id + ": " + row.info);
    });
  });
  db.close();
}

createSchema()