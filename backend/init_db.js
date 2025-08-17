const fs = require("fs/promises");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const setupDatabase = async () => {

    const script = await fs.readFile("create_script.txt", "utf-8");

    const db = await open({
        filename: './db.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(script);

    console.log("DB initialized");
}


setupDatabase();