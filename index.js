import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/card.js";
const app = express();
app.use(express.json());
connectDB();

//Create
app.post("/createCard", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    console.log(card);
    // respond with created card
    res.status(201).json(card).send("Card created successfully");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error creating card");
  }
});

app.get("/getAllCards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving cards");
  }
});
app.get("/getCard/:id", async (req, res) => {
  try {
    const { id } = req.params; // obtenemos el ID de la URL
    const cards = await Card.findById(id);
    if (!cards) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving cards");
  }
});

//UPDATE
app.put("/updateEntireCard/:id", async (req, res) => {
  try {
    const { id } = req.params; // obtenemos el ID de la URL
    const updates = req.body; //  los campos que quieres actualizar

    // Usamos findByIdAndUpdate para actualizar parcialmente
    const updatedCard = await Card.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({
      message: "Card updated successfully",
      data: updatedCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating card" });
  }
});

app.patch("/updateCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCard = await Card.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({
      message: "Card updated successfully",
      data: updatedCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating card" });
  }
});

//DELETE
app.delete("/deleteCard/:id", async (req, res) => {
  try {
    const { id } = req.params; //  se lee el ID de la URL
    const deletedCard = await Card.findByIdAndDelete(id); // se elimina la tarjeta por id

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting card" });
  }
});

//ENDPOINT
app.get("/hola", (req, res) => {
  res.status(200).send("¡Hello world from server! :D");
});

app.get("/hello", (req, res) => {
  res.status(200).send("¡Hello world from server! Express :D");
});

app.post("/send", (req, res) => {
  const { user, email } = req.body;
  //Datos agregados a una DB
  console.log("Datos Recibidos:" + user + "" + email);

  res.status(200).send("Data received succesfully");
});

app.get("/review", (req, res) => {
  const endpoints = [
    "POST /createCard - Create a new card",
    "GET /getAllCards - Get all cards",
    "GET /getCard/:id - Get a specific card by ID",
    "PUT /updateEntireCard/:id - Update all fields of a card",
    "PATCH /updateCard/:id - Update specific fields of a card",
    "DELETE /deleteCard/:id - Delete a card",
    "GET /hola - Hello world greeting",
    "GET /hello - Hello world greeting with Express",
    "POST /send - Receive user and email data",
    "GET /review - Show all available endpoints",
  ];

  const endpointList = endpoints.join("\n");
  res.status(200).send(endpointList);
});

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});


