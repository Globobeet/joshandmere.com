const keystone = require('keystone');

const { Relationship, Text, Datetime, Boolean } = keystone.Field.Types;
const Invite = new keystone.List('Invite');

Invite.add({
    guests: { type: Relationship, ref: 'Guest', required: true, initial: true, many: true },
    code: { type: Text, required: true, initial: true, unique: true },
    allowedPlusOne: { type: Boolean, initial: true },
    responded: { type: Datetime },
});

Invite.defaultColumns = 'guests, code, allowedPlusOne, responded';
Invite.register();
