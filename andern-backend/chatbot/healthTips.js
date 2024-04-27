const config = require("../config")
const tipService = require("services/tip.service")

async function healthTips(obj){
    try{
        console.log(obj)
        await tipService.create({userId: config.ai.id, username: config.ai.username, "tips": obj.text})
        return
    }catch(err){
        console.log(err)
    }
}