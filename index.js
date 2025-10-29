import express from "express";
import { connectdb } from "./db.js";
import { Card } from "./models/Card.js"; // asegúrate de tener este modelo definido

const app = express();

// Conexión a la base de datos
connectdb();

// Middleware para parsear JSON
app.use(express.json());

/* ==========================
   Crear nueva tarjeta
========================== */
app.post("/createCard", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    console.log(card);
    res.status(201).json({ message: "Card created successfully", card });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

/* ==========================
   Obtener todas las tarjetas
========================== */
app.get("/getAllCards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
});

/* ==========================
   Obtener tarjeta por ID
========================== */
app.get("/getCard/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

/* ==========================
   Actualizar tarjeta (PUT)
========================== */
app.put("/updateCard/:id", async (req, res) => {
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

/* ==========================
   Actualizar parcialmente (PATCH)
========================== */
app.patch("/updateCard/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json({ message: "Card partially updated", card });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

/* ==========================
   Eliminar tarjeta
========================== */
app.delete("/deleteCard/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

/* ==========================
   Endpoints de prueba
========================== */
app.get("/hello", (req, res) => {
  res.status(200).send("Hola Mundo desde Node Js desde mi PC, hackeado");
});

app.get("/hola", (req, res) => {
  res.status(200).send("Hello World from a Server!!!");
});

app.post("/send", (req, res) => {
  const { user, email } = req.body;
  console.log("Datos recibidos:", user, email);
  res.status(200).send("Data received successfully");
});

/* ==========================
   Iniciar servidor
========================== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

/* Soy gay */