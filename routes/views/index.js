const { set, filter } = require('lodash');
const keystone = require('keystone');

module.exports = (req, res) => {
    const { locals } = res;
    const view = new keystone.View(req, res);

    const dataToContext = (list, key) => next => keystone.list(list)
        .model.find({}).lean().exec()
        .then(results => (locals[key] = results))
        .then(() => next())
        .catch(next);
    
    view.on('init', dataToContext('Content', 'content'));
    
    view.on('init', dataToContext('NavItem', 'navItems'));
    
    view.on('init', (next) => {
        locals.content = locals.content.reduce((obj, { slug, value }) => 
            Object.assign(obj, { [slug]: value }), {});
        
        next();
    });
    
    view.on('init', next => keystone.list('Member')
        .model.find({}).lean().exec()
        .then(results => {
            set(locals, 'party.bridesmaids', filter(results, { side: 'bride' }));
            set(locals, 'party.groomsmen', filter(results, { side: 'groom' }));
            next();
        })
        .catch(next));
    
    view.render('index');
};
