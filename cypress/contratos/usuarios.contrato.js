const Joi = require('joi')

const usuariosSchema = Joi.object({
    usuarios: Joi.array().items({
        id: Joi.string(),
        nome: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        administrador: Joi.string()
    })
})

export default usuariosSchema;