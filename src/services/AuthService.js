const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/


const getSecret = () => process.env.AUTH_SECRET


const sendErrorsFromDB = (res, dbErrors) => {
    console.log(dbErrors)
    const errors = dbErrors.errors.map(error => error.message)
    return res.status(400).send({ errors })
}


const _createUser = async (req, res, next, user) => {
    try {
        await user.save()
        login(req, res, next);
    } catch (err) {
        console.log(err)
        sendErrorsFromDB(res, err)
    }
}


const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body

    if (!(email && email && password && confirmPassword)) {
        res.status(400).send({ errors: ['O Usuário não pode ter campos nulos ou vazios'] })
    }


    console.log(email)



    if (!email.match(emailRegex)) {
        res.status(400).send({ errors: ['O e-mail informado está inválido'] })
    }

    if (!password.match(passwordRegex)) {
        res.status(400).send({
            errors: [
                "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20."
            ]
        })
    }


    console.log(password)


    const salt = bcrypt.genSaltSync()
    const passwordHash = await bcrypt.hashSync(password, salt)

    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        res.status(400).send({ errors: ['Senhas não conferem.'] })
    }


    try {
        const user = await User.findOne({ email })

        if (user) {
            res.status(401).send({ errors: "Usuário já cadastrado" })
        } else {
            const newUser = new User({ name, email, password: passwordHash })
            await _createUser(req, res, next, newUser)
        }

    } catch (error) {
        console.log(error)
        sendErrorsFromDB(res, error)
    }


}



const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        console.log(user.password)

        if (user && bcrypt.compareSync(password, user.password)) {
            const secret = getSecret()
            const token = jwt.sign(user.toJSON(), secret, {
                expiresIn: "1 day"
            })

            const { name, email } = user
            res.send({ name, email, token })
        } else {
            res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
        }

    } catch (error) {
        sendErrorsFromDB(res, error)
    }

}


const validateToken = (req, res, next) => {
    const token = req.body.token || ""


    jwt.verify(token, getSecret(), (err, decoded) => {
        res.status(200).send({ valid: !err })
    })
}


module.exports =  {login, validateToken, signup}