const cloudinary = require('cloudinary');
const _ = require('lodash');

module.exports = () => ({
    cl(fn, id, options) {
        const cloudinaryDefaults = {
            image: {
                secure: true,
                quality: 'auto',
                fetch_format: 'auto',
                alt: '',
            },
            url: {
                secure: true,
                quality: 'auto',
                fetch_format: 'auto',
            },
            video: {
                secure: true,
                quality: 'auto',
            },
        };

        const method = cloudinary[fn].bind(cloudinary);
        const publicId = _.isObject(id) ? id.public_id : id;
        const defaults = cloudinaryDefaults[fn];
        const opts = Object.assign({}, defaults, options.hash);

        return publicId ? method(publicId, opts) : '';
    },
    
    insertBreaks(str) {
        return str.replace(/\r\n/g, '<br />');
    },
});
