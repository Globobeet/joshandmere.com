const keystone = require('keystone');
const middleware = require('./middleware');

// Common Middleware
keystone.pre('routes', middleware.initLocals);

// Import Route Controllers
const importer = keystone.importer(__dirname);
const views = importer('./views');

// Setup Route Bindings
module.exports = (app) => {
	app.get('/', views.index);
};
