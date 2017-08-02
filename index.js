require('dotenv').config();
const keystone = require('keystone');
const handlebars = require('express-handlebars');

keystone.init({
	'name': 'Josh and Mere',
	'brand': 'Josh and Mere',
	'static': 'public',
	'favicon': 'public/favicon.png',
	'views': 'templates/views',
	'view engine': '.hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

keystone.import('models');

keystone.set('locals', {
    _: require('lodash'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable,
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
    users: 'User',
    siteContent: ['NavItem', 'Content', 'Member'],
    guestList: ['Invite', 'Guest'],
});

if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
	+ '\n----------------------------------------'
	+ '\nYou have opted into email sending but have not provided'
	+ '\nmailgun credentials. Attempts to send will fail.'
	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
	+ '\nset up your mailgun integration');
}


keystone.start();
