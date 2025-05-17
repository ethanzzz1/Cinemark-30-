import { Schema, model } from "mongoose";

const employeesSchema = new Schema({
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
            "Ingrese un correo valido",
        ],
    },

    password:{
        type: String,
        require: true,
        minlenght: 6 
    },

    telephone:{
        type: String,
        require: true,
        unique: true,
        
    },

    address:{
        type: String,
        require: true,
    },

    role:{
        type: String,
        require: true,
    },

    hireDate:{
        type: Date,
        require: true,
        max:[new Date(), "Fechas futuras no permitidas"]
    },

    salary:{
        type: Number,
        require: true,
    },

    status:{
        type: Boolean,
        require: true
    },

    isVerified:{
        type: Boolean,
        require: true
    }
},
{
    timestamps: true,
    strict: false
})

export default model("Employees", employeesSchema);