const { Pool } = require("pg");

const stores = require("./stores.json");

class ModelClass {
  constructor() {
    this.connection = new Pool({
      user: "postgresql",
      host: "dpg-coq01oi1hbls73dnbgs0-a",
      database: "postgres_vyil",
      password: "oC24VxovBnrSbnaxswrisbN5T0Q36ci2",
    });
  }

  async connectDatabase() {
    await this.connection.connect();
  }

  async setupDatabase() {
    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS public.users
    (
        id SERIAL,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        CONSTRAINT users_pkey PRIMARY KEY (id)
    )
`);

    await this.connection.query(`
    ALTER TABLE IF EXISTS public.users
    OWNER to postgres
`);
    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS public.stores
    (
        id SERIAL,
        name text,
        url text,
        district text,
        rating integer,
        imageurl text, 
        restaurant integer DEFAULT 0,
        pharmacy integer DEFAULT 0,
        grocery integer DEFAULT 0,
        construction integer DEFAULT 0,
        games integer DEFAULT 0,
        clothes integer DEFAULT 0,
        perfume integer DEFAULT 0,
        other integer DEFAULT 0,
        CONSTRAINT stores_pkey PRIMARY KEY (id)
    )`);

    await this.connection.query(`
      ALTER TABLE IF EXISTS public.stores
          OWNER to postgres
    `);

    await this.connection.query(`
`);

    await this.connection.query(`
    ALTER TABLE public.stores
    ADD COLUMN IF NOT EXISTS imageurl text,
    ADD COLUMN IF NOT EXISTS restaurant integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS pharmacy integer DEFAULT 0, 
    ADD COLUMN IF NOT EXISTS grocery integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS construction integer DEFAULT 0, 
    ADD COLUMN IF NOT EXISTS games integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS clothes integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS perfume integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS other integer DEFAULT 0;
    `);

    for (const store of stores) {
      const { rows } = await this.connection.query(
        `
        SELECT * FROM stores WHERE name = $1
      `,
        [store.name]
      );

      if (rows.length === 0) {
        console.log(`Inserting ${store.name}`);
        await this.connection.query(
          `
          INSERT INTO stores (name, url, district)
          VALUES ($1, $2, $3)
        `,
          [store.name, store.url, store.district]
        );
      }
    }
  }

  async createUser(username, password) {
    try {
      const queryResult = await this.connection.query(
        `
            INSERT INTO users (username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING
            `,
        [username, password]
      );

      if (queryResult.rowCount === 1) {
        console.log("User created successfully");
        return true;
      } else {
        console.log("Username already exists");
        throw new Error("Failed to create user or username already exists");
      }
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async getUserByUsername(username) {
    try {
      const { rows } = await this.connection.query(
        `
            SELECT * FROM users WHERE username = $1
            `,
        [username]
      );

      if (rows.length === 1) {
        return rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error fetching user by username: ${error.message}`);
    }
  }

  async getStoreById(storeId) {
    try {
      const { rows } = await this.connection.query(
        `
        SELECT * FROM stores WHERE id = $1
      `,
        [storeId]
      );

      if (rows.length === 1) {
        return rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error fetching store by ID: ${error.message}`);
    }
  }

  async deleteStoreById(storeId) {
    try {
      const queryResult = await this.connection.query(
        `
        DELETE FROM stores WHERE id = $1
      `,
        [storeId]
      );

      if (queryResult.rowCount === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(`Error deleting store: ${error.message}`);
    }
  }

  async addStore(
    name,
    url,
    district,
    rating,
    imageurl,
    restaurant,
    pharmacy,
    grocery,
    construction,
    games,
    clothes,
    perfume,
    other
  ) {
    try {
      const queryResult = await this.connection.query(
        `
            INSERT INTO stores (name, url, district, rating, imageurl, restaurant, pharmacy, grocery, construction, games, clothes, perfume, other)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            `,
        [
          name,
          url,
          district,
          rating,
          imageurl,
          restaurant,
          pharmacy,
          grocery,
          construction,
          games,
          clothes,
          perfume,
          other,
        ]
      );

      if (queryResult.rowCount === 1) {
        return true;
      } else {
        throw new Error("Failed to add store");
      }
    } catch (error) {
      throw new Error(`Error adding store: ${error.message}`);
    }
  }

  async updateStore(
    id,
    name,
    url,
    district,
    rating,
    imageurl,
    restaurant,
    pharmacy,
    grocery,
    construction,
    games,
    clothes,
    perfume,
    other
  ) {
    try {
      const queryResult = await this.connection.query(
        `
            UPDATE stores
            SET name = $2, url = $3, district = $4, rating = $5, imageurl = $6, restaurant = $7, pharmacy = $8, grocery = $9, construction = $10, games = $11, clothes = $12, perfume = $13, other = $14
            WHERE id = $1
            `,
        [
          id,
          name,
          url,
          district,
          rating,
          imageurl,
          restaurant,
          pharmacy,
          grocery,
          construction,
          games,
          clothes,
          perfume,
          other,
        ]
      );

      if (queryResult.rowCount === 1) {
        return true;
      } else {
        throw new Error("Failed to update store");
      }
    } catch (error) {
      throw new Error(`Error updating store: ${error.message}`);
    }
  }

  async getAllStores() {
    const { rows } = await this.connection.query(`
      SELECT * FROM stores
    `);
    return rows;
  }
}

module.exports = ModelClass;
