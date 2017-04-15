const keystone = require('keystone');

module.exports = (req, res) => {
    const { locals } = res;
    const view = new keystone.View(req, res);
    const Content = keystone.list('Content');
    
    view.on('init', next => Content.model.find({}).lean().exec()
        .then(results => results.forEach(({ slug, value }) => Object.assign(locals, { [slug]: value })))
        .then(() => next())
        .catch(next));
    
    view.render('index');
};
