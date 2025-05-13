import express from "express";
import cookieParser from "cookie-parser";


import RegisterClientsR from "./src/routes/RegisterCLientsR.js";

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/clients", RegisterClientsR);


export default app;
