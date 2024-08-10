import { pool } from "./database.js";

import bossesData from "../data/bosses.js";

import "./dotenv.js";

const createTableQuery = `
    DROP TABLE IF EXISTS bosses;

    CREATE TABLE IF NOT EXISTS bosses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        healthPoints VARCHAR(40) NOT NULL,
        location VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        region VARCHAR(255) NOT NULL
    )
`;

const createBossesTable = async () => {
  try {
    const res = await pool.query(createTableQuery);
    console.log("res: ", res);
    console.log("🎉 bosses table created successfully");
  } catch (error) {
    console.error("🚨 bosses table creation failed:", error);
  }
};

const seedBossesTable = async () => {
  await createBossesTable();

  bossesData.forEach((boss) => {
    const insertQuery = {
      text: "INSERT INTO bosses (name, healthPoints, location, image, description, region) VALUES ($1, $2, $3, $4, $5, $6)",
    };

    const values = [
      boss.name,
      boss.healthPoints,
      boss.location,
      boss.image,
      boss.description,
      boss.region,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting boss", err);
        return;
      }

      console.log(`✅ ${boss.name} added successfully`);
    });
  });
};

seedBossesTable();
