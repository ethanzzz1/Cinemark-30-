import express from "express";
import cookieParser from "cookie-parser";


import RegisterClientsR from "./src/routes/RegisterCLientsR.js";
import RegisterEmployeesR from "./src/routes/RegisterEmployeesR.js";
import loginR from "./src/routes/loginR.js"
import logoutR from "./src/routes/logoutR.js"
import passwordRecoveryR from "./src/routes/passwordRecoveryR.js";
import moviesR from "./src/routes/moviesR.js";
import clientsR from "./src/routes/clientsR.js";
import employeesRoute from "./src/routes/employeeR.js"

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/clients", RegisterClientsR);
app.use("/api/employees", RegisterEmployeesR);
app.use("/api/login", loginR);
app.use("/api/logout", logoutR);
app.use("/api/passwordRecovery", passwordRecoveryR);
app.use("/api/movies", moviesR);    
app.use("/api/clients", clientsR);
app.use("/api/employees", employeesRoute);



export default app;
