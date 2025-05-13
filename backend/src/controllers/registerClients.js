// Importamos el modelo de la base de datos
import jsonwebtoken from "jsonwebtoken";//token
import bcrypt from "bcryptjs";//encriptar
import nodemailer from "nodemailer";//enviar correo
import crypto from "crypto";//codigo aleatorio

import clientsModel  from "../models/Clients.js"
import { config } from "../config.js";

//array de las funciones
const registerClientsController = {};

registerClientsController.register = async(req, res) =>{
    //solicitar los datos
    const {name, email, password, telephone, address, status, isVerified} = req.body;

    try {
        //verificamos si el cliente ya existe
        const existingClient = await clientsModel.findOne({email})
        if(existingClient){
            return res.json({message:"Client already exist"})
        }

        //encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, 10)

        //guardamos el cliente en la base de datos                                                   
        const newClient = new clientsModel({name, email, password: passwordHash, telephone, address, status, isVerified: isVerified || false});

        await newClient.save();

        //GENERAR UN CODIGO ALEATORIO PARA VERIFICAR
        //esto genera un codigo con tres digitos (numeros)
        const verificationCode = crypto.randomBytes(3).toString("hex")

        //generar un token que contenga el codigo de verificacion
      //generar un token que contenga el codigo de verificacion
const tokenCode = jsonwebtoken.sign(
    //1- lo que voy a guardar
    {email, verificationCode},

    //2- secreto
    config.JWT.secret,

    //cuando expira(2 horas)
    {expiresIn: '2h'} // El valor correcto es '2h', no "2h"
);

        //generamos cookie                     significa que expira en 2 horas, 60 minutos, 60 segundos y 1000 milisegundos
        res.cookie("verificationToken", tokenCode)



        //ENVIAR EL CORREO ELECTRONICO
        //1- transporter => quien lo envia
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user, 
                pass: config.email.email_pass 
            }
        })

        //2- quien lo recibe
        const mailOptions = {
            from: config.email.email_user,
            to: email, 
            subject: "Verificar Correo",
            text: "Para verificar su correo utilizan el siguiente código " + verificationCode + "\n expira en dos horas"
        };

        //3- enviar el correo
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                return res.json({message: "Error sending email" + error})
            }
            console.log("Email sent" + info);
        })

        res.json({message: "Client registered, Please verify your email with the code"})
    } catch (error) {
        console.log("error"+ error)
    }
};


registerClientsController.verificationCode = async (req, res) =>{

    const { requireCode } = req.body

    const token = req.cookies.verificationToken;

    try {
        //verificar y decodificar token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded;
        
        //comparar el codigo que envie por correo y esta guardado en las cookies
        if(requireCode !== storedCode){
                return res.json({message:"Invalid code"});
        }

        //marcamos al cliente como verificado
        const client = await clientsModel.findOne({email});
        client.isVerified = true;
        await client.save();

        res.clearCookie("verificationToken");
        res.json({message: "Email verified successfuly"});

    } catch (error) {
        console.log("error: "+ error)
    }
    
}

export default registerClientsController;