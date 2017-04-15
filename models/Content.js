const keystone = require('keystone');

const Types = keystone.Field.Types;
const Content = new keystone.List('Content', {
    map: { name: 'slug' },
    plural: 'content',
    sortable: true,
});

Content.add({
    slug: { type: Types.Text, required: true, initial: true, unique: true, index: true },
    value: { type: Types.Markdown, required: true, initial: true },
});

/**
 * Registration
 */
Content.defaultColumns = 'slug, value';
Content.register();
