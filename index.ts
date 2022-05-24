import express  from 'express';
import routes from './routes/Routes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', routes);

app.listen( 3333, () => console.log("Servidor rodando na porta 3333") );