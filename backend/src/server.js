import express from 'express';
import session from 'express-session';
import initWebRoute from './route/web.js';

require('dotenv').config()

const app = express()
const port = process.env.PORT || 1111
const cors = require("cors");

app.use(cors({ credentials: true, origin: true }));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
initWebRoute(app)

app.listen(port, () => {
  console.log(`\nApp running at: \n\t\thttp://localhost:${port}`)
})