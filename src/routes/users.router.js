const express = require('express');
const userModel = require('../model/schemas/users.model');
const userRouter = express.Router()

userRouter.get('/premium/:uid', async (req, res) => {
    let user = await userModel.findById(req.params.uid)
    res.render('userRoleChanger', user)
})

userRouter.post('/premium/:uid', async (req, res) => {
    let newRole = req.body.role
    if (newRole !== 'USER' && newRole !== 'PREMIUM') {
        req.logger.warn('NOT ALLOW TO CHANGE THE VALUES')
        return res.render('welcome')
    }
    let usercatualizado = await userModel.findByIdAndUpdate(req.body.id, { role: newRole }, { new: true })
    res.send({ message: 'se actualizo el rol correctamente', payload: usercatualizado })
})

module.exports = userRouter