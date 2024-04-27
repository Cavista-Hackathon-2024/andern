const fbService = require('firebase.service')
const aiService = require("ai.service")
const aiConfig = require('../config/ai')

const tipCollection = "tips"

class tipService{
    constructor(){

    }

    async gettip(tipId){
        const fRes = await fbService.getById(tipCollection, tipId)
        return {...fRes?.data(), id: fRes?.id}
    }

    async gettips(userId){
        const fRes = await fbService.getAll(tipCollection, {userId})
        return fRes.docs.map(c=>({...c.data(), id: c.id}))
    }

    async createtip(userId){
        const obj = {userId, createdAt: Date.now()}
        const { id } = await fbService.createOne(tipCollection, obj)
        const tip = await fbService.getById(tipCollection, id)
        return {...tip.data(), id: tip.id}
    }
}

const tipService = new tipService()

module.exports = Object.freeze(tipService)