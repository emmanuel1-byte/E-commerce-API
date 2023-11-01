const userService = require('./userService')
const refreshTokenService = require('./refreshtokenService')
const productService = require('./productService')
const roleService = require('./roleService')
const validateService = require('./validatetokenService')
const resetPassword = require('./resetpasswordService')
const categoryService = require('./categoryService')
const profileService = require('./profileService')

module.exports = { user : userService.User, refreshTokenService : refreshTokenService.RefreshToken, productService : productService.ProductService,
role : roleService.RoleService, validateService : validateService.ValidateTokenService, resetPassword : resetPassword, category : categoryService.CategoryService,
profileService : profileService.UserProfileService}