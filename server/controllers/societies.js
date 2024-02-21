import mongoose from 'mongoose'
import Society from '../models/society.js';

export const getSocieties = async (req, res) => {
    try {
        const societies = await Society.find()

        res.status(200).json(societies)
    } catch (error) {
        console.log(error)
    }
}

export const createSociety = async (req, res) => {
    const society = req.body
    
    try {
        const result = await Society.create(society);

        res.status(201).json({ result });
    } catch (error) {
        console.log(error)
    }
}

export const updateSociety = async (req, res) => {
    const { id: _id } = req.params
    const society = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No society with that id')

    const updatedSociety = await Society.findByIdAndUpdate(_id, { ...society, _id }, { new: true })

    res.json(updatedSociety)
}

export const deleteSociety = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No society with that id')

    await Society.findByIdAndRemove(id)

    res.json({ message: "Society deleted successfully!" })
}