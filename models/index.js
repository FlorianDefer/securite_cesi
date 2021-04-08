const { Resource } = require('./resource.model');
const { FavouriteResource } = require('./favouriteResource.model');
const { SeenResource } = require('./seenResource.model');
const { Category } = require('./category.model');
const { Comment } = require('./comment.model');
const { User } = require('./user.model');


module.exports = {
    Resource,
    FavouriteResource,
    SeenResource,
    Category,
    Comment,
    User
}