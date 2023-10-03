const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company : {
        type : String,
        required : [true,'Please provide company name'],
        minLength : 3,
        maxLength : 30
    },
    position : {
        type : String,
        required : [true,'Please provide position'],
        minLength : 3,
        maxLength : 50
    },
    status : {
        type : String,
        enum : ['interview','pending','declined'],
        default : 'pending'
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{timestamps : true}) 

module.exports = mongoose.model('Job',JobSchema)