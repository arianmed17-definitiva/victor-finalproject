import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectdb } from "./db.js";
import { Card } from "./models/card.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
connectdb();

// Crear una tarjeta
app.post("/api/cards", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    console.log(card);
    res.status(201).json({ message: "Card created successfully", card });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

// Obtener todas las tarjetas
app.get("/api/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
});

// Obtener una tarjeta por ID
app.get("/api/cards/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

// Actualizar una tarjeta (PUT) 
app.put("/api/cards/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json({ message: "Card updated successfully", card });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

// Actualizar parcialmente (PATCH)
app.patch("/api/cards/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json({ message: "Card partially updated", card });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

// Eliminar una tarjeta
app.delete("/api/cards/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

// Ruta principal
app.get("/", (req, res) => {
  res.status(200).send("API funcionando correctamente en Render");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

