import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import 'dotenv/config';
import routes from './routes/index.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express();

app.engine('handlebars', engine({
  extname: 'handlebars',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.set('views', './src/views');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a la base de datos'))
  .catch((error) => console.error('Error al conectar a la base de datos:', error));

app.use('/api', routes);

export default app;
