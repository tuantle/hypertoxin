'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import ShoppingStore from '../stores/shopping-store';

import ShoppingInterface from '../interfaces/shopping-interface';

import EVENT from '../events/shopping-event';

const ShoppingDomain = Hf.Domain.augment({
    $init () {
        const domain = this;
        domain.register({
            store: ShoppingStore({
                name: `shopping-store`
            }),
            intf: ShoppingInterface({
                name: `shopping-intf`
            })
        });
    },
    setup (done) {
        const domain = this;
        domain.incoming(EVENT.ON.RESET).forward(EVENT.DO.RESET);
        domain.incoming(EVENT.ON.LIKE).handle((itemId) => (state) => {
            if (!state.likes.some((_itemId) => _itemId === itemId)) {
                return {
                    likes: [
                        ...state.likes,
                        itemId
                    ]
                };
            }
            return {
                likes: state.likes
            };
        }).relay(EVENT.DO.UPDATE_LIKES);
        domain.incoming(EVENT.ON.UNLIKE).handle((itemId) => (state) => {
            const likes = state.likes.filter((_itemId) => _itemId !== itemId);
            return {
                likes
            };
        }).relay(EVENT.DO.UPDATE_LIKES);

        domain.incoming(
            EVENT.ON.INCREASE_QUANTITY,
            EVENT.ON.DECREASE_QUANTITY
        ).handle((quantity) => (state) => {
            return {
                carts: state.carts.map((cart) => {
                    if (cart.itemId === quantity.itemId) {
                        return {
                            ...cart,
                            quantity: cart.quantity + quantity.offset
                        };
                    }
                    return cart;
                })
            };
        }).relay(EVENT.DO.UPDATE_CARTS);
        domain.incoming(EVENT.ON.REMOVE_FROM_CARTS).handle((itemId) => (state) => {
            return {
                carts: state.carts.filter((cart) => cart.itemId !== itemId)
            };
        }).relay(EVENT.DO.UPDATE_CARTS);
        domain.incoming(EVENT.ON.ADD_TO_CARTS).handle((itemId) => (state) => {
            if (!state.carts.some((cart) => cart.itemId === itemId)) {
                return {
                    carts: [
                        ...state.carts,
                        {
                            itemId,
                            quantity: 1
                        }
                    ]
                };
            }
            return {
                carts: state.carts
            };
        }).relay(EVENT.DO.UPDATE_CARTS);
        domain.incoming(EVENT.ON.SUBMIT_SHIPPING_INFO_FORM).handle((shippingInfoForm) => {
            return {
                form: {
                    shippingInfo: shippingInfoForm
                }
            };
        }).relay(EVENT.DO.UPDATE_FORM);

        domain.incoming(EVENT.ON.SEARCH).forward(EVENT.DO.APPLY_SEARCH_FILTER);
        domain.incoming(EVENT.ON.CATERGORY_SEARCH).forward(EVENT.DO.APPLY_CATERGORY_SEARCH_FILTER);
        done();
    }
});
export default ShoppingDomain;
