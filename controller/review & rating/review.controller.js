const { SuccessResponse } = require('../../middleware/successHandler')
const { ErrorResponse } = require('../../middleware/errorHandler')
const service = require('../../service')

class Review {

    static async addReview(req, res){
        try{
            const { name, title, content,  } = req.body
            const newReview = await service.reviewService.createReview(name, title, content, req.id)
            if(!newReview){
             return res.status(400).json(new ErrorResponse('review not created'))
            }
            return res.status(200).json(new SuccessResponse('review created succesfully', newReview))
        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error creating review'))

        }
    }

    static async findReview(req, res){
        try{
            const  reviewId  = req.params.id
            const review = await service.reviewService.findReview(reviewId)
            if(!review){
                return res.status(404).json(new ErrorResponse('review not found'))
            }
            return res.status(200).json(new SuccessResponse('review retrieved succesfully', review))
        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving review'))

        }
    }

    static async listReviews(req, res){
        try{
            const reviews = await service.reviewService.listReview()
            if(!reviews){
                return res.status(400).json(new ErrorResponse('review not retrieved'))
            }
            return res.status(200).json(new SuccessResponse('reviews successfully retrieved', reviews))
        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving review'))
        }
    }

    static async updateReview(req, res){
        try{
            const reviewId = req.params.id
            const { title, content  } = req.body
            const review = await service.reviewService.updateReview(title, content, reviewId, req.id)
            if(!review){
                return res.status(404).json(new ErrorResponse('review not found'))  
            }
            return res.status(200).json(new SuccessResponse('review successfully updated'))
        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error updating review'))
        }
    }

    static async deleteReview(req, res){
        try{
            const reviewId = req.params.id 
            const review = await service.reviewService.deleteReview(reviewId, req.id)
            if(!review){
                return res.status(404).json(new ErrorResponse('review not found')) 
            }
            return res.status(200).json(new SuccessResponse('review successfully deleted'))
        }catch(err){
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error deleting review'))
        }
    }
}

module.exports = { Review }