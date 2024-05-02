const express = require("express");
const cors = require("cors");
const ModelClass = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const scrapeGoogleMaps = require("./googleMapsScraper");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const corsOptions = {
  origin: "https://jkpgcity-tour-mockup.netlify.app",
  methods: ["GET,POST,PUT,DELETE"],
  withCredentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const model = new ModelClass();

// Accounts related
app.post("/register", async (req, res) => {
  try {
    const { username, password, refereeCode } = req.body;
    if (refereeCode !== "224466") {
      return res.status(400).json({ error: "Incorrect referee code" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await model.createUser(username, hashedPassword);
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await model.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign(
      { userId: user.id },
      "shhhh-this-key-is-very-very-very-secret-key",
      {
        expiresIn: "1h",
      }
    );
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Stores related
app.get("/stores/all", async (req, res) => {
  try {
    const stores = await model.getAllStores();
    res.json(stores);
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/stores/:storeId", async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const store = await model.getStoreById(storeId);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.json(store);
  } catch (error) {
    console.error("Error fetching store details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/stores/:storeId", async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const deleted = await model.deleteStoreById(storeId);
    if (deleted) {
      res.json({ message: "Store deleted successfully" });
    } else {
      res.status(404).json({ error: "Store not found" });
    }
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/stores/update/:storeId", async (req, res) => {
  try {
    const { storeId } = req.params;
    const {
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
    } = req.body;
    const updated = await model.updateStore(
      storeId,
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
    );
    if (updated) {
      res.json({ message: "Store updated successfully" });
    } else {
      res.status(404).json({ error: "Store not found or failed to update" });
    }
  } catch (error) {
    console.error("Error updating store:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/stores/add", async (req, res) => {
  try {
    const {
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
    } = req.body;
    const added = await model.addStore(
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
    );
    if (added) {
      res.json({ message: "Store added successfully" });
    } else {
      res.status(400).json({ error: "Failed to add store" });
    }
  } catch (error) {
    console.error("Error adding store:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);

  try {
    await model.connectDatabase();
    await model.setupDatabase();
    console.log("Database connected and setup complete");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});

async function getTables() {
  const result = await model.connection.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
  `);
  return result.rows.map((row) => row.table_name);
}

async function main() {
  try {
    const tables = await getTables();
    console.log("Tables:", tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
  }
}

main();
