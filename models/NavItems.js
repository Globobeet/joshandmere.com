const keystone = require('keystone');

const Types = keystone.Field.Types;
const NavItem = new keystone.List('NavItem', { sortable: true });

NavItem.add({
    name: { type: Types.Text, required: true, initial: true },
    href: { type: Types.Text, required: true, initial: true },
    className: { type: Types.Text, initial: true },
    external: { type: Types.Boolean, initial: true },
});

NavItem.defaultColumns = 'name, href';
NavItem.register();
