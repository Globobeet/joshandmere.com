const keystone = require('keystone');

const Types = keystone.Field.Types;
const Member = new keystone.List('Member', { sortable: true });

Member.add({
    name: { type: Types.Name, required: true, initial: true },
    side: { type: Types.Select, options: 'bride, groom', required: true, initial: true },
    main: { type: Types.Boolean, initial: true, label: 'Maid of Honor / Best Man?' },
    bio: { type: Types.Markdown, initial: true },
    image: { type: Types.CloudinaryImage, autoCleanup: true, folder: 'jm-wedding' }
});

Member.defaultColumns = 'name, side, bio';
Member.register();
