const { View } = require('keystone');

module.exports = (req, res) => {
    const view = new View(req, res);
    view.render('rsvp');
};
