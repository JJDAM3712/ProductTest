import express, {Express} from 'express';
import morgan from 'morgan';
import routes from './routes/all.routes';



const app: Express = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use(routes);


// port for app
const PORT = process.env.PORT;



app.listen(PORT, () => console.log(`http://localhost:${PORT}`));