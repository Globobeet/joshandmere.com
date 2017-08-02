const keystone = require('keystone');

const { Name, Boolean } = keystone.Field.Types;
const Guest = new keystone.List('Guest');

Guest.add({
    name: { type: Name, required: true, initial: true },
    attending: { type: Boolean },
    plusOne: { type: Boolean, label: 'Is someone\'s +1' },
});

Guest.defaultColumns = 'name, attending';
Guest.register();
