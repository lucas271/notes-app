const User = require('../modules/UserAuth.js')

module.exports.loginUser = async (req, res) => {
    try {   
        const user = new User(req.body)
        await user.login()
        if(user.errors.length > 0) return res.json({errors: user.errors})
        req.session.user = user.user
        req.session.save()
        res.status(200).json({email: user.user.email, posts: user.user.notes})
        
    } catch (error) {
        res.status(500).json({errors: ['SERVER ERROR']})
    }
}

module.exports.registerUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.register()
        if(user.errors.length > 0) return res.json({errors: user.errors})
        req.session.user = user.user
        req.session.save()
        res.status(200).json({email: user.user.email, posts: user.user.notes})

    } catch (error) {
        res.status(500).json({errors: ['SERVER ERROR']})
    }
}

module.exports.logoutUser = async (req, res) => {
    try {
        req.session.destroy()
        
        res.send('user logged out')
    } catch (error) {
        res.status(500).json({errors: ['SERVER ERROR']})
    }
}