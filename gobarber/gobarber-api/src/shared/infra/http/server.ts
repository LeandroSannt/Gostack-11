import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import routes from './routes'
import uploadConfig from '@config/upload'
import "@shared/container"
import "reflect-metadata"
import "@shared/infra/typeorm"
import AppError from '@shared/errors/AppErros'
import cors from 'cors'

const app = express();

app.use(cors())

app.use(express.json())
app.use('/files',express.static(uploadConfig.directory))
app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status:'error',
        error: err.message,
      });
    }

    console.error(err)

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(3333,()=>{
    console.log("Server is running in port 3333")
})

