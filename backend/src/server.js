const express = require("express");
const cors = require("cors");
const { getSlots, bookSlot } = require("./store");
const openapi = require("./openapi.json");

const app = express();

app.use(express.json());

// Frontend URL for CORS (local + deployed)
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin) return cb(null, true); // allow curl/postman
      if (allowedOrigins.includes(origin)) return cb(null, true);
      // In production, you might want to restrict this
      return cb(null, true);
    },
    credentials: true,
  })
);

// Health check endpoint
app.get("/health", (req, res) => res.json({ ok: true }));

// OpenAPI documentation endpoint
app.get("/api/openapi.json", (req, res) => res.json(openapi));

// Get all slots
app.get("/api/slots", async (req, res) => {
  try {
    const slots = await getSlots();
    res.json({ slots });
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ error: "Failed to fetch slots" });
  }
});

// Book a slot
app.post("/api/book", async (req, res) => {
  try {
    const { slotId, customerName } = req.body || {};
    
    if (!slotId) {
      return res.status(400).json({ error: "slotId is required" });
    }

    const result = await bookSlot(slotId, customerName);
    
    if (!result.ok) {
      return res.status(result.status).json({ error: result.message });
    }

    res.json({ booked: true, slot: result.slot });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).json({ error: "Failed to book slot" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on :${PORT}`);
});
