'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import EVENT from '../events/shopping-event';

const ITEMS = [{
    id: `0`,
    name: `Bonzai Plant`,
    catergory: `garden`,
    image: require(`../assets/bonzai-plant.jpg`),
    price: 44.99,
    discount: 15,
    sku: 5,
    description: `It is a nice little bonzai plant. Imported from Japan!`,
    rating: 4,
    reviews: [{
        userId: `0`,
        avatarImage: ``,
        userName: `Jeff B`,
        review: `Bought it for my wife.`,
        rating: 5
    }]
}, {
    id: `1`,
    name: `Chef Knife`,
    catergory: `kitchen`,
    image: require(`../assets/chef-knife.jpg`),
    price: 130.00,
    discount: 0,
    sku: 15,
    description: `High quality chef knife. Dangerously sharp.`,
    reviews: [{
        userId: `1`,
        avatarImage: ``,
        userName: `Gordon JR`,
        review: `It's F*cking sharp!!!`,
        rating: 4
    }]
}, {
    id: `2`,
    name: `Cook Book`,
    catergory: `reading`,
    image: require(`../assets/cook-book.jpg`),
    price: 15.50,
    discount: 20,
    sku: 0,
    description: `You will learn how to cook like stared Michelon chef!`,
    reviews: [{
        userId: `2`,
        avatarImage: ``,
        userName: `T Le`,
        review: `Whoa I am cooking stuff... This book is kinda legit.`,
        rating: 3
    }]
}, {
    id: `3`,
    name: `Dutch Oven`,
    catergory: `kitchen`,
    image: require(`../assets/dutch-oven.jpg`),
    price: 365.99,
    discount: 30,
    sku: 55,
    description: `Le Creuset dutch oven! Best dutch oven ever!`,
    reviews: [{
        userId: `2`,
        avatarImage: ``,
        userName: `T Le`,
        review: `I bought this for a lot of money just to bake break.`,
        rating: 4
    }]
}, {
    id: `4`,
    name: `Kitchen Scale`,
    catergory: `kitchen`,
    image: require(`../assets/kitchen-scale.jpg`),
    price: 78.99,
    discount: 0,
    sku: 100,
    description: `A classic kitchen scale!`,
    reviews: []
}, {
    id: `5`,
    name: `Outdoor Grill`,
    catergory: `home`,
    image: require(`../assets/outdoor-grill.jpg`),
    price: 148.99,
    discount: 5,
    sku: 1,
    description: `Great for summer BBQ!`,
    reviews: []
}, {
    id: `6`,
    name: `Pink Dress`,
    catergory: `clothing`,
    image: require(`../assets/pink-dress.jpg`),
    price: 199.99,
    discount: 5,
    sku: 70,
    description: `Beautiful pink dress for a fancy nightout!`,
    reviews: []
}, {
    id: `7`,
    name: `Planter Pot`,
    catergory: `home`,
    image: require(`../assets/planter-pot.jpg`),
    price: 148.99,
    discount: 5,
    sku: 25,
    description: `Nice planter pots for your plants!`,
    reviews: []
}];

const ShoppingStore = Hf.Store.augment({
    state: {
        items: ITEMS,
        filteredItems: {
            computable: {
                contexts: [
                    `items`, `searchFilter`, `catergorySearchFilter`
                ],
                compute () {
                    if (Hf.isEmpty(this.searchFilter) && Hf.isEmpty(this.catergorySearchFilter)) {
                        return this.items;
                    }
                    return this.items.filter((item) => {
                        if (!Hf.isEmpty(this.catergorySearchFilter)) {
                            return item.catergory === this.catergorySearchFilter;
                        }
                        return true;
                    }).filter((item) => {
                        return item.name.match(new RegExp(this.searchFilter, `i`)) || item.catergory.match(new RegExp(this.searchFilter, `i`));
                    });
                }
            }
        },
        searchFilter: ``,
        catergorySearchFilter: ``,
        carts: [],
        likes: [],
        form: {
            shippingInfo: {
                email: ``,
                address: ``,
                city: ``,
                state: ``,
                zipCode: ``,
                phoneNumber: ``
            },
            paymentInfo: {
                creditCardNumber: ``,
                creditCardExpDate: ``
            }
        }
    },
    setup (done) {
        const store = this;
        store.incoming(EVENT.DO.RESET).handle(() => {
            store.reconfig({
                items: ITEMS,
                searchFilter: ``,
                catergorySearchFilter: ``,
                carts: [],
                likes: [],
                form: {
                    shippingInfo: {
                        email: ``,
                        address: ``,
                        city: ``,
                        state: ``,
                        zipCode: ``,
                        phoneNumber: ``
                    },
                    paymentInfo: {
                        creditCardNumber: ``,
                        creditCardExpDate: ``
                    }
                }
            });
            Hf.log(`info1`, `Store reset.`);
        });
        store.incoming(EVENT.DO.UPDATE_LIKES).handle((updateLikes) => {
            store.reconfig(updateLikes);
        });
        store.incoming(EVENT.DO.UPDATE_CARTS).handle((updateCarts) => {
            store.reconfig(updateCarts);
        });
        store.incoming(EVENT.DO.UPDATE_FORM).handle((updateForm) => {
            store.reduce(updateForm);
        });
        store.incoming(EVENT.DO.APPLY_SEARCH_FILTER).handle((searchFilter) => {
            store.reduce({
                searchFilter,
                catergorySearchFilter: ``
            });
        });
        store.incoming(EVENT.DO.APPLY_CATERGORY_SEARCH_FILTER).handle((catergorySearchFilter) => {
            store.reduce({
                searchFilter: ``,
                catergorySearchFilter
            });
        });
        done();
    }
});
export default ShoppingStore;
