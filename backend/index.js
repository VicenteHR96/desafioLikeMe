const express = require("express");
const cors = require("cors");
const { addPost, getPosts } = require("./consultas");

const app = express();

// Habilitamos CORS
app.use(cors());

app.use(express.json());

//GET

app.get("/posts", async (req, res) => {
  const posts = await getPosts();
  res.json(posts);
});

//POST

app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  await addPost(titulo, img, descripcion, likes);
  res.send("Post agregado con éxito");
});

// Listen PORT: 3000

app.listen(3000, console.log("Servidor ON!"));
