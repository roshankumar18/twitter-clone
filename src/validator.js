const Joi = require("joi")

module.exports = {
    addUserValidation : (data) =>{
        const schema = Joi.object({
            username:Joi.string().required(),
            email:Joi.string().email().required(),
            password:Joi.string().min(8).required()
        })
        const {error,value} = schema.validate(data,{abortEarly:false})
        return {error ,value}
    },
    addTweetValidation : (data)=>{
        const schema = Joi.object({
            tweet:Joi.string().required(),
            image: Joi.any().optional()
        })
        const {error,value} = schema.validate(data,{abortEarly:false})
        return {error ,value}
    }
}