const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

// Initialization
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"),"layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs"
}));
app.set("view engine", ".hbs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(require("./routes/index.js"));

app.listen(app.get("port"), () => {
  
  console.log("Running on port", app.get("port"));
            
});