const Joi = require('joi');

module.exports.validateFarms = (req, res, next) => {
    const joiSchema = Joi.object({
        name: Joi.string().required(),
    
        image: Joi.string().required(),
    
        description: Joi.string().required(),
    
        location: Joi.string().required()
            
    })
    
    const result = joiSchema.validate(req.body.farm);
    console.log(result)

    if (result.error) throw new ExpressError(result.error, 400);
    else next();
}

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/

module.exports.validateUsers = (req, res, next) => {
    const joiSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().pattern(passwordRegex).required(),
        reEnteredPassword: Joi.any().valid(Joi.ref('password')).required()
    })

    const result = joiSchema.validate(req.body);
    console.log(result)

    if (result.error) throw new ExpressError(result.error.details[0].message, 400);
    else next();
}