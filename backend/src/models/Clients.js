import { Schema, model } from "mongoose";

const clientsSchema = new Schema({
    name:{
        type: String,
        require: true
    },

    email:{
        type: String,
        require: true,
        unique: true,
        match:[
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/,
            "Por favor ingrese un correo electronico valido", 
        ],
    },

    password:{
        type: String,
        require: true,
        minlenght: 6 //para poner un minimo de caracteres
    },

    address:{
        type: String,
        require: true
    },

    telephone:{
        type: String,
        require: true
    },

    status:{
        type: Boolean,
        require: true
    },
},
{
    timestamps: true,
    strict: false
})

export default model("Clients", clientsSchema);