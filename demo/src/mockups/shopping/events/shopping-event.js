'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

export default Hf.Event.create({
    asEvents: [
    ],
    onEvents: [
        `reset`,
        `like`,
        `unlike`,
        `search`,
        `catergory-search`,
        `add-to-carts`,
        `submit-shipping-info-form`,
        `remove-from-carts`,
        `increase-quantity`,
        `decrease-quantity`
    ],
    doEvents: [
        `reset`,
        `update-likes`,
        `update-carts`,
        `update-form`,
        `apply-search-filter`,
        `apply-catergory-search-filter`
    ]
});
