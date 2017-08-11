const keystone = require('keystone');
const middleware = require('./middleware');

const Invite = keystone.list('Invite');
const Guest = keystone.list('Guest');

// Common Middleware
keystone.pre('routes', middleware.initLocals);

// Import Route Controllers
const importer = keystone.importer(__dirname);
const views = importer('./views');

// Setup Route Bindings
module.exports = (app) => {
	app.get('/', views.index);
	app.get('/rsvp', views.rsvp);

	app.param('code', (req, res, next) =>
        Invite.model
            .findOne({ code: req.params.code })
            .populate('guests')
            .exec()
            .then((invite) => {
                if (!invite) { return res.status(404).end(); }
                res.locals.invite = invite;
                return next();
            })
    );

	// Retrieving an RSVP record
    app.get('/rsvp/:code', (req, res) => res.send(res.locals.invite));

    // RSVP Response
    app.post('/rsvp/:code', (req, res) => {
        const { guests } = req.body;
        const { invite } = res.locals;

        invite.responded = new Date().toISOString();

        return Promise.all([
            ...guests.map((guest) => {
                const { _id, attending, plusOne } = guest;

                if (!plusOne) {
                    return Guest.model.update({ _id }, { attending });
                }

                const names = guest.name.first.split(' ');
                const plusOneGuestData = Object.assign({}, guest, {
                    name: {
                        last: names.pop(),
                        first: names.join(' '),
                    },
                });

                return Guest.model.create(plusOneGuestData)
                    .then(guest => invite.guests.addToSet(guest));
            }),
        ])
            .then(() => invite.save())
            .then(() => res.send(invite));
    });
};
