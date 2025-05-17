import { Schema, model } from "mongoose";

const moviesSchema = new Schema({
    title:{
        type: String,
        require: true,
    },

    description:{
        type: String,
        require: true,
    },

    director:{
        type: String,
        require: true,
    },

    genre:{
        type: String,
        require: true,
    },

    year:{
        type: Number,
        require: true,
    },

    duration:{
        type: Number,
        require: true,
    },

    image:{
        type: String,
    }

},{
    timestamps: true,
    strict: false
})

export default model("Movies", moviesSchema)