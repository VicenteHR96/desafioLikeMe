const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "likeme",
  allowExitOnIdle: true,
});

const getPost = async () => {
  const result = await pool.query("SELECT * from posts");
  console.log(result.rows);
};
getPost();

const addPost = async (titulo, img, descripcion, likes) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, 0)";
  const values = [titulo, img, descripcion];
  const result = await pool.query(consulta, values);
  console.log("Post agregado");
};

const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log(rows);
  return rows;
};
getPosts();

const updatePost = async ({ id }) => {
  const consulta = "UPDATE posts SET likes=likes+1 WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
  return result.rowCount;
};

const deletePost = async ({ id }) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
  return result.rowCount;
};

module.exports = {
  addPost,
  getPosts,
  updatePost,
  deletePost,
};
