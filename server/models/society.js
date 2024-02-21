import mongoose from 'mongoose'

const societySchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    admin: { type: String, required: true },
    president: { type: String, required: true },
    vicePresident: { type: String, required: true },
    role: { type: String, required: true },
})

const Society = mongoose.model('Society', societySchema)

export default Society