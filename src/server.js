require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const connectDB = require("./configs/db");
const routes = require("./routes");

connectDB();

const app = express();
const port = process.env.PORT || 3001;
app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.set('view engine', 'ejs');
app.set('views',"./src/views");

app.use(express.json());
app.use(express.static('./src/public'))
// Routes
app.use("/", routes);


// app.use(express.urlencoded({
//   extended: false
// }))
// app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

