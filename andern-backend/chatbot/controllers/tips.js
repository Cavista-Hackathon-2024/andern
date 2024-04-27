const queues = require("../constants/queues")

const validator = require("../services/validator.service") 

const catchAsyncErrors = require("../lib/catchAsync")

const tipService = require("../services/tip.service")

// const createTip = catchAsyncErrors(async(req, res)=>{
//     const { body } = req
//     const validationRes = validator.validateTip(body)
//     if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
//     console.log({body})
//     const tip = await tipService.create({...body})
//     if(!tip)return res.status(400).json("failed to create tip.")
//     return res.status(201).json(tip)
// })

const getTips = catchAsyncErrors(async(req, res)=>{
    const tips = await tipService.getAll()
    return res.status(200).json(tips)
})

const getTip = catchAsyncErrors(async(req, res)=>{
    const validationRes = validator.validateGetByIdObj(req.params)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    const tip = await tipService.getById(req.params.id)
    return res.status(200).json(tip)
})

const getTipsByUserId = catchAsyncErrors(async(req, res)=>{
    const validationRes = validator.validateGetByIdObj(req.params)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    const tips = await tipService.getAll({userId: req.params.id})
    return res.status(200).json(tips || [])
})


const likeTip = catchAsyncErrors(async(req, res)=>{
    const validationRes = validator.validateGetByIdObj(req.params)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    if(!req.body.userId)return res.status(400).json({message: "userId is required."})
    await tipService.like(req.params.id, req.body.userId)
    const tip = await tipService.getById(req.params.id)
    return res.status(200).json(tip)
})

module.exports = {createTip, getTips, getTip, getTipReplies, getTipsByUserId, likeTip}