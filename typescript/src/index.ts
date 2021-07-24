import express from 'express'
import { hellowolrd } from './routes';

const app = express();

app.get('/', hellowolrd)

app.listen(3333) 