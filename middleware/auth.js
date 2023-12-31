const jwt = require('jsonwebtoken')
const { TokenExpiredError } = jwt
const { ErrorResponse } = require('./errorHandler')
const service = require('../service/index')
// const { db } = require('../model/index')
require('dotenv').config()

class Authorize {

    static catchError(err, res) {
        try {
            if (err instanceof TokenExpiredError) {
                return res.status(401).json(new ErrorResponse('access token  has expired Unauthorized!'))
            }
            return res.status(401).json(new ErrorResponse('Unauthorized!'))
        } catch (err) {
            // console.log(err)
            return res.status(500).json(new ErrorResponse('Internal Server Error'))
        }
    }

    static userTokenVerification(req, res, next) {
        const accessToken  = req.headers.authorization
            if (!accessToken) {
                return res.status(401).json(new ErrorResponse('access token is required!'))
            }

            jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    // console.log('Token verification ', err)
                    return Authorize.catchError(err, res)
                }
                req.id = decoded.id
                next()
            })
    }


    static async seller(req, res, next) {
        try {
            const user = await service.user.findUserById(req.id)
            const role = await user.getRoles()
            for (let i = 0; i < role.length; i++) {
                if (role[i].name === 'seller') {
                    return next()
                }
                break
            }
            return res.status(403).json(new ErrorResponse('require seller role to access this route'))


        } catch (err) {
            console.log('validation ', err)
            return res.status(401).json(new ErrorResponse('unable to validate admind role'))
        }



    }

    static async admin(req, res) {
        try {
            const user = await service.user.findUserById(req.id)
            const role = await user.getRoles()
            for (let i = 0; i < role.length; i++) {
                if (role[i].name === 'admin') {
                    return next()
                }
            }
            return res.status(403).json(new ErrorResponse('require admin role to access this route'))


        } catch (err) {
            console.log('validation ', err)
            return res.status(401).json(new ErrorResponse('unable to validate user role'))
        }



    }

    static async user(req, res){
        try{
            const user = await service.user.findUserById(req.id)
            const role = await user.getRoles()
            for(let i = 0; i < role; i++){
                if(role[i].name === 'user'){
                    return next()
                }
            }
            return res.status(403).json(new ErrorResponse('require user role to cccess this route'))
        }catch(err){
            console.log('validation ', err)
            return res.status(401).json(new ErrorResponse('unable to validate user role'))
        }
    }

}


module.exports = { Authorize }