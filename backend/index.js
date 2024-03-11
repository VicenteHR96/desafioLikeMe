const express = require("express");
const cors = require("cors");
const { addPost, getPosts, updatePost, deletePost } = require("./consultas");

const app = express();

// Habilitamos CORS
app.use(cors());

app.use(express.json());

//GET
app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los posts", error: error.message });
  }
});

//POST
app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion, likes } = req.body;
    await addPost(titulo, img, descripcion, likes);
    res.send("Post agregado con éxito");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al agregar el post", error: error.message });
  }
});

//PUT
app.put("/posts/like/:id", async (req, res) => {
  try {
    await updatePost(req.params);
    res.send("Actualizado");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el post", error: error.message });
  }
});

//DELETE
app.delete("/posts/:id", async (req, res) => {
  try {
    if ((await deletePost(req.params)) > 0) {
      res.send("Eliminado correctamente.");
    } else {
      res.status(400).send("El ID seleccionado no existe.");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el post", error: error.message });
  }
});

// Listen PORT: 3000
app.listen(3000, () => {
  console.log("Servidor ON!");
});
