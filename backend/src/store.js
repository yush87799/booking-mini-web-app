const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "slots.json");

// super-simple in-process lock to avoid two writes at once
let writing = Promise.resolve();

// Time slots from 7:00 AM to 6:00 PM
const TIME_SLOTS = [
  "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty structure
    return { slots: [] };
  }
}

function writeDB(data) {
  writing = writing.then(() => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  });
  return writing;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isMonday(date) {
  return date.getDay() === 1; // 0 = Sunday, 1 = Monday
}

function generateSlotsForDate(dateStr, existingSlots) {
  const slots = [];
  // Parse date string (YYYY-MM-DD) as local date
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  
  // Skip if it's Monday
  if (isMonday(date)) {
    return slots;
  }

  // Check if we already have slots for this date
  const existingForDate = existingSlots.filter(s => s.date === dateStr);
  const existingSlotTimes = new Set(existingForDate.map(s => s.time));

  // Generate slots for all time slots
  TIME_SLOTS.forEach((time, index) => {
    const slotId = `slot_${dateStr.replace(/-/g, "")}_${time.replace(":", "")}`;
    
    // If slot already exists, keep it (preserve booking status)
    const existing = existingForDate.find(s => s.time === time);
    if (existing) {
      slots.push(existing);
    } else {
      // Create new slot
      slots.push({
        id: slotId,
        date: dateStr,
        time: time,
        booked: false
      });
    }
  });

  return slots;
}

async function getSlots() {
  const db = readDB();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Generate slots for the next 30 days (1 month, excluding Mondays)
  const allSlots = [];
  const existingSlots = db.slots || [];
  
  // Calculate the end date (30 days from today)
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 30);
  
  // Keep existing slots that are within the next month window (today to 30 days ahead)
  const validExistingSlots = existingSlots.filter(slot => {
    // Parse date string (YYYY-MM-DD) as local date
    const [year, month, day] = slot.date.split("-").map(Number);
    const slotDate = new Date(year, month - 1, day);
    slotDate.setHours(0, 0, 0, 0);
    return slotDate >= today && slotDate <= endDate;
  });

  // Generate slots for next 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = formatDate(date);
    
    const slotsForDate = generateSlotsForDate(dateStr, validExistingSlots);
    allSlots.push(...slotsForDate);
  }

  // Sort by date and time
  allSlots.sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    return a.time.localeCompare(b.time);
  });

  // Update the database with new slots
  db.slots = allSlots;
  await writeDB(db);

  return allSlots;
}

async function bookSlot(slotId, customerName) {
  const db = readDB();
  const slot = db.slots.find((s) => s.id === slotId);

  if (!slot) {
    return { ok: false, status: 404, message: "Slot not found" };
  }
  if (slot.booked) {
    return { ok: false, status: 409, message: "Slot already booked" };
  }

  slot.booked = true;
  slot.bookedBy = customerName || "Guest";
  slot.bookedAt = new Date().toISOString();

  await writeDB(db);
  return { ok: true, slot };
}

module.exports = { getSlots, bookSlot };
