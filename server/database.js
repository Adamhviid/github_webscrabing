import sqlite3 from "sqlite3";
import { open } from "sqlite";

let lastId = 0;

async function insertRepos(username, repo) {
  const db = await openDb();
  const existingRepo = await db.get(
    "SELECT * FROM repos WHERE username = ? AND repo = ?",
    [username, repo]
  );

  if (existingRepo) {
    return;
  } else {
    lastId++;
    await db.run(
      "INSERT OR REPLACE INTO repos (id, username, repo) VALUES (?, ?, ?)",
      [lastId, username, repo]
    );
  }
}

async function getRepos(username) {
  const db = await openDb();
  const repos = await db.all("SELECT * FROM repos WHERE username = ?", [username]);
  return repos;
}

async function getEverything() {
  const db = await openDb();
  const everything = await db.all("SELECT * FROM repos");
  return everything;
}

async function openDb() {
  return open({
    filename: "repos.db",
    driver: sqlite3.Database,
  });
}

export { insertRepos, getRepos, getEverything }