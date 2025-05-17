const clientsController = {};

import clientsModel from "../models/Clients.js";

clientsController.getClients = async(req, res) =>{
    const clients = await clientsModel.find();

    res.json(clients)
}

clientsController.deleteClients = async(req,res) =>{
    await clientsModel.findByIdAndDelete(req.params.id)

    res.json({message: "Client deleted"})
}

clientsController.putClients = async(req, res)=>{
    const{name, email, password,telephone, address, status, isVerified } = req.body;
    const updateClients = await clientsModel.findByIdAndUpdate(req.params.id, {name, email, password,telephone, address, status, isVerified}, {new: true})

    res.json({message: "Client updated"})
}

export default clientsController;