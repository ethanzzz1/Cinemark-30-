import moviesModel from "../models/Movies.js"
import {v2 as cloudinary} from "cloudinary"
import { config } from "../config.js"

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

const moviesController = {};

moviesController.getMovies = async(req, res)=>{
    const movies = await moviesModel.find()
    res.json(movies)
}

moviesController.postMovies = async (req, res)=>{
    try {
        const{title, description, director, genre, year, duration} = req.body;
        let imageUrl = ""

        if(req.file){
            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "public",
                    allowed_formats: ["jpg", "png", "jpeg"]
                }
            )
            imageUrl= result.secure_url
        }

        const newMovie = new moviesModel({title, description, director, genre, year, duration, image: imageUrl});
        newMovie.save();

        res.json({message: "saved"});

    } catch (error) {
        console.log("error"+ error);
    }
}

moviesController.deleteMovies =async(req, res) =>{
    await moviesModel.findByIdAndDelete(req.params.id)

    res.json({message: "deleted"})
}

moviesController.putMovies = async(req, res) =>{

    try {
        const{title, description, director, genre, year, duration} = req.body;
        let imageUrl = ""

        if(req.file){
            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "public",
                    allowed_formats: ["jpg", "png", "jpeg"]
                }
            )
            imageUrl= result.secure_url
        }
        await moviesModel.findByIdAndUpdate(req.params.id,
            {
                title, description, director, genre, year, duration, image: imageUrl
            }
        )
        res.json({message: "updated"})

    } catch (error) {
        console.log("error"+ error);
    }

}

export default moviesController;