const { compare } = require('bcryptjs')

const User = require('../models/User')

async function login(req, res,  next) {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ where: {email} })

        if (!user) return res.render('admin/session/login', {
            user: req.body,
            error: 'Usuário não cadastrado!'
        })

        const passed = await compare(password, user.password)

        if(!passed) return res.render('admin/session/login', {
            user: req.body,
            error: 'Senha incorreta.'
        })

        req.user = user

        next()
    } catch(err) {
        console.error(err)
    }
        
}

async function forgot(req, res, next) {
    const { email } = req.body

    try {
        let user = await User.findOne({ where: {email} })

        if (!user) return res.render('admin/session/forgot-password', {
            user: req.body,
            error: 'Email não cadastrado!'
        })

        req.user = user

        next()
    } catch(err) {
        console.error(err)
    }
}

async function reset(req, res, next) {
    const { email, password, passwordRepeat, token } = req.body

    try {
        const user = await User.findOne({ where: {email} })

        if (!user) return res.render('admin/session/password-reset', {
            user: req.body,
            token,
            error: 'Usuário não cadastrado!'
        })

        if (password != passwordRepeat)
            return res.render('admin/session/password-reset', {
                user: req.body,
                token,
                error: 'As duas senhas digitadas devem ser iguais.'
            })

        if (token != user.reset_token)
            return res.render('admin/session/password-reset', {
                user: req.body,
                token,
                error: 'Token inválido! Solicite novamente.'
            })

        let now = new Date()
        now = now.setHours(now.getHours())

        if (now > user.reset_token_expires)
            return res.render('admin/session/password-reset', {
                user: req.body,
                token,
                error: 'Token expirado! Solicite novamente.'
            })

        req.user = user

        next()
    } catch(err) {
        console.error(err)
    }
}

module.exports = {
    login,
    forgot,
    reset
}