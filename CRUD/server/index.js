const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors"); //Serve para não dar problema quando estiver fazendo a conexão de front com backend

const db = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "admin",
  database: "crudgames",
});

app.use(cors());
app.use(express.json()); //Para poder ler os dados no front

app.post("/register", (req, res) => {
  const {name} = req.body;
  const {cost} = req.body;
  const {category} = req.body;

  let sql = "INSERT INTO games (name, cost, category) VALUES (?,?,?)";
  
  db.query(sql, [name, cost, category], (err, result) => {
   if(err){
    console.log(err);
   }else {
    res.send(result);
   }
  })
})

app.get("/getCards", (req, res) => {
    let sql = "SELECT * from games ";

    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

//Editar um item
app.put("/edit", (req, res) => {
    const {id} = req.body;
    const {name} = req.body
    const {cost} = req.body;
    const {category} = req.body;

   let sql = "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";

   db.query(sql, [name, cost, category, id], (err, result) => {
        if(err){
            console.log(err);
        }else {
            console.log(result);
        }
   })
});

app.delete("/delete/:id", (req, res) => {
  const {id} = req.params;
  let sql = "DELETE FROM games WHERE idgames = ?";
  db.query(sql, [id], (err, result) => {
    if(err){
      console.log(err);
    }else {
      res.send(result);
    }
  })
})



/* app.get("/", (req, res) => {
  let sql =
    "INSERT INTO games ( name, cost, category ) VALUES ('Far Cry 5', '120', 'Ação' )";

  db.query(sql, (err, res) => {
    console.log(err);
  });
}); */

app.listen(3001, () => {
  console.log("Rodando servidor");
});
