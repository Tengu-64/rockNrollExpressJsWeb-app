const { Audio, Group, User } = require('../model/models')


const gallery = (req, res) => {
    res.render('gallery')
}

const auth = (req, res) => {
    User.findOne({ where: { email: req.body.email, password: req.body.password } }).then(authUser => {
        if (authUser) {
            res.cookie('role', authUser.role)
            res.cookie('id', authUser.id)
            res.cookie('name', authUser.name)
            res.cookie('email', authUser.email)
            res.cookie('password', authUser.password)
            res.cookie('role', authUser.role, { signed: true })
            if(authUser.role == 'ADMIN'){
                console.log('админ')
                res.render('myPage', {'user': authUser, 'adminAccess': true})
            } else{
                res.render('myPage', {'user': authUser, 'adminAccess': false})
            }
           
        } else {
            res.render('auth', { err: 'Пользователь не найден. Проверьте введенный email и пароль' })
        }
    })
}

const registrationView = (req, res) => {
    res.render('registration')
}

const registration = (req, res) => {

    const { name, email, password } = req.body
    User.findOne({ where: { name: name, email: email } }).then(user => {
        if (user) {
            res.render('registration', { err: `пользователь ${name} уже существует` })
        }
        else if (name.length < 3 || email.length < 9 || password.length < 1) {
            res.render('registration', { err: 'в поле "ник" должно быть как минимум 3 символа, в поле "email" как минимум 9 символов, в поле "пароль" как минимум 1 символ ' })
        }

        else {
            User.create({
                name: name,
                email: email,
                password: password,
                role: 'USER'
            }).then(CreatedUser => {
                if (CreatedUser) {

                    res.cookie('id', CreatedUser.id)
                    res.cookie('name', CreatedUser.name)
                    res.cookie('email', CreatedUser.email)
                    res.cookie('password', CreatedUser.password)
                    res.cookie('role', CreatedUser.role)
                    res.redirect('/my-page')

                } else {
                    console.log('не найден')
                }

            })

        }

    })

}



const audio = (req, res) => {
    Audio.findAll().then(audios => {
        Group.findAll().then(groups => {
            res.render('audio', { 'audios': audios, 'groups': groups })
        })

    })
}

const audioByGroup = (req, res) => {
    Audio.findAll({ where: { groupId: req.params.id } }).then(data => {
        Group.findAll({ where: { id: req.params.id } }).then(group => {
            res.render('audioByGroup', { 'audio': data, 'group': group })
        })
    })
}

const myPageView = (req, res) => {
    res.render('myPage')
}

module.exports = { gallery, auth, registration, audio, audioByGroup, myPageView, registrationView }