const router = require('express').Router()
const cookieParser = require('cookie-parser')
const {gallery, auth, registration, registrationView, audio, audioByGroup, myPageView } = require('../controllers/indexController')
const { User } = require('../model/models')


router.use(cookieParser('caQ6Rlaet7gP6DdAyaQkPwTq8R2fOV'))

router.get('/', (req, res) => {
    res.render('index')
})



router.get('/gallery', gallery)

router.get('/audio', audio)

router.get('/audio/:id/', audioByGroup)

router.get('/auth', (req,res)=>{
    User.findOne({where:{role:'ADMIN'}}).then(firstAdminRoleUser =>{
        if(!firstAdminRoleUser){
            console.log('создание админа')
            User.create({
                name:process.env.ADMIN_NAME,
                email:process.env.ADMIN_EMAIL,
                password:process.env.ADMIN_PASSWORD,
                role: 'ADMIN'
            })
        } 
    })
    res.render('auth')
})

router.get('/my-page', myPageView)
router.post('/my-page', auth)

router.get('/registration', registrationView)
router.post('/check-registration', registration)








module.exports = router
