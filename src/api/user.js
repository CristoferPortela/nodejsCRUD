const bcrypt = require('bcrypt-nodejs')
//this module is gonna make the users crud
// the app is comming from express app in src/index.js

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const encrypt = passw => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(passw, salt)
    }

    const create = async (req, res) => {
        const user = { ...res.body }
        if (req.params.id) user.id = req.params.id

        try {
            existsOrError(user.name, "Nome não informado")
            existsOrError(user.email, "E-mail não informado")
            existsOrError(user.password, "Sem não informada")
            existsOrError(user.confirmPassword, "Senha incorreta ou não informada")
            equalsOrError(user.password, user.confirmPassword, "Senhas não conferem")

            const userFromDb = await app.db('users')
                .where({ email: user.email }).first()
            
            if (!user.id) {
                notExistsOrError(userFromDb, "Usuário já cadastrado")
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encrypt(user.password)
        delete user.confirmPassword

        if (user.id) {
            app.db('users')
            .update(user)
            .where({id:user.id})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
            .insert(user)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id }).first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    return { create, get, getById }
}