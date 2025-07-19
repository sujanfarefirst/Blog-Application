import "dotenv/config";

import express from "express";
import expressLayout from "express-ejs-layouts";
// The mainRoutes is from the main All the routing taking place here using the ESmodule
import mainRoutes from "./server/routes/main.js";

import connect from "./server/config/db.js";

const app = express();
const PORT = 3000 || process.env.PORT;

connect();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));

//Template Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set("view engine", "ejs");

//app.use('/', require('./server/routes/main')); commonJS
app.use("/", mainRoutes);

app.get('/create', (req,res)=>{
  res.render('create.ejs');
} )

app.listen(PORT, (req, res) => {
  console.log(`Server is listen through port ${PORT}`);
});
