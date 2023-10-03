const {StatusCodes} = require('http-status-codes')
const {NotFoundError,BadRequestError} = require('../errors')
const Job = require('../models/Job')

const getAlljobs = async (req,res) => {
    const {userId,name} = req.user
    const jobs = await Job.find({createdBy : userId})
    res.status(StatusCodes.OK).json({jobs,name})
}

const createjob = async (req,res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const getjob = async (req,res) => {
    const {
        user : {userId},
        params : {id : jobId}
    } = req
    
    const job = await Job.findOne({createdBy : userId,_id : jobId})

    if(!job){
        throw new NotFoundError(`No job found with jobID ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const updatejob = async (req,res) => {
    const {
        user : {userId},
        body : {company,position},
        params : {id : jobId}
    } = req

    if(!company || !position){
        throw new BadRequestError('Company and position should not be empty')
    }
    const job = await Job.findOneAndUpdate({createdBy : userId, _id : jobId},req.body,{runValidators : true,new : true})

    if(!job){
        throw new NotFoundError(`No job found with jobId ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const deletejob = async (req,res) => {
    const {
        user : {userId},
        params : {id : jobId}
    } = req
    
    const job = await Job.findOneAndDelete({createdBy : userId,_id : jobId})
    if(!job){
        throw new NotFoundError(`No job found with jobId ${jobId}`)
    }
    res.status(StatusCodes.OK).send(`Job with jobID ${jobId} deleted`)
}

module.exports = {
    getAlljobs,
    getjob,
    createjob,
    updatejob,
    deletejob
}


