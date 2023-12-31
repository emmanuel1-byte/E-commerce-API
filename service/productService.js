const { Op, Sequelize } = require('sequelize')
const { db } = require('../model/index')
require('dotenv').config()

class ProductService {

    constructor(model) {
        this.model = model
    }

    async createProduct(name, description, display_image, images, brand, price,  variant, availability, quantity, id, categoryId) {
        try {
            const result = await this.model.create({
                name: name, description: description, display_image : display_image, images: [images], brand: brand,
                price: price,  variant: variant, availability: availability, quantity : quantity, userId: id, categoryId : categoryId
            })
            return result

        } catch (err) {
            throw err

        }
    }

    async listSellerProducts(id) {
        try {
            const result = await this.model.findAll({
                where: { userId: id }
            })
            return result

        } catch (err) {
            throw err
        }
    }


    async findProducts(productId) {
        try {
            const result = await this.model.findAll({ where: { id: productId },  attributes: ['id','name', 'description', 'images', 'brand','price', 'variant', 'availability']  })
            return result

        } catch (err) {
            throw err
        }
    }

    async findOneProduct(productId){
        try{
            const result = await this.model.findOne({ where : { id : productId}})
            return result
        }catch(err){
            throw err
        }
    }

    async decreaseQuantity(productQuantity, productId){
        try{
            const result = await this.model.update({ quantity : Sequelize.literal(`quantity - ${productQuantity}`)}, { where : { id : productId}})
            return result
        }catch(err){
            throw err
        }
    }

    async restoreQuantity(productQuantity, userId){
        try{
            const result = await this.model.update({ quantity : Sequelize.literal(`quantity + ${productQuantity}`) }, { where : {userId : userId}})
            return result
        }catch(err){
            throw err
        }
    }

    async listProducts() {
        try {
            const result = await this.model.findAll({ attributes: ['id', 'name','display_image', 'price'] })
            return result

        } catch (err) {
            throw err
        }
    }

    async listProductFromCategory(categoryId) {
        try {
            const result = await this.model.findAll({ where: { categoryId: categoryId }, attributes : ['name', 'images', 'price'] })
            return result
        } catch (err) {
            throw err
        }

    }

    async searchProduct(searchQuery) {
        try {
            const result = await this.model.findAll({ where: { name: { [Op.like]: `%${searchQuery}%` } }, attributes: ['id', 'name', 'images', 'price'] })
            return result
        } catch (err) {
            throw err
        }

    }

    async updateSellerProduct(productId, name, description, brand, price, category, variant, availability, id) {
        try {
            const result = await this.model.update({
                name, description, brand, price, category, variant, availability
            }, { where: { userId: id, id: productId } })
            return result

        } catch (err) {
            throw err
        }

    }


    async deleteSellerProduct(id, productId) {
        try {
            const deleteProduct = await this.model.destroy({ where: {id: productId , userId: id, } })
            return deleteProduct
        } catch (err) {
            throw err
        }

    }

}

module.exports = { ProductService: new ProductService(db.productModel.Product) }