import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const script = fetch("create_script.txt").then( res => res.text() ).catch(e => console.error("Could not fetch create script: " + e) )

const setupDatabase = async () => {
    const db = await open({
        filename: './db.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(script);

    console.log("DB initialized");
}


setupDatabase();