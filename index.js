import express from 'express'
import {create} from 'express-handlebars'
import bodyParser from 'body-parser'
import Routes from './routes.js'
import mongoose from 'mongoose'


const app = express()
// SHAARRTT
const hbs = create({defaultLayout: 'main', extname: 'hbs'})
// Set Handlebars as the view engine
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(Routes)

const uri = 'mongodb+srv://mongodb155:byalCI5ZeV1QuLqU@tibbiymarkaz.ijjjipd.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
