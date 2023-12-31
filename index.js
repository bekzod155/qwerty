import express from 'express'
import engine from 'express-handlebars'
import bodyParser from 'body-parser'
import Routes from './routes.js'
import mongoose from 'mongoose'
import dotenv from "dotenv"


dotenv.config()

const app = express()
// SHAARRTT
// const hbs = create({defaultLayout: 'main', extname: 'hbs'})
// Set Handlebars as the view engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(Routes)

const uri = process.env.MONGO_URL;
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start the server
const port = process.env.ENV_URL
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
