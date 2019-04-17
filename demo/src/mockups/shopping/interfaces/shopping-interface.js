'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import {
    createStackNavigator
} from 'react-navigation';

import ShoppingHomeView from '../components/shopping-home-view-component';
import ShoppingCartView from '../components/shopping-cart-view-component';
import ShoppingCheckoutShippingView from '../components/shopping-checkout-shipping-view-component';
import ShoppingCheckoutPaymentView from '../components/shopping-checkout-payment-view-component';

import EVENT from '../events/shopping-event';

const ShoppingStackNavigator = createStackNavigator({
    shoppingHome: {
        screen: ({
            navigation,
            screenProps
        }) => {
            const {
                Theme,
                shade,
                component
            } = screenProps;
            const {
                filteredItems,
                likes,
                carts
            } = component.state;

            return (
                <ShoppingHomeView
                    Theme = { Theme }
                    shade = { shade }
                    navigation = { navigation }
                    items = { filteredItems }
                    likes = { likes }
                    carts = { carts }
                    onReset = {() => component.outgoing(EVENT.ON.RESET).emit()}
                    onSearch = {(itemName) => component.outgoing(EVENT.ON.SEARCH).emit(() => itemName)}
                    onCatergorySearch = {(itemCatergory) => component.outgoing(EVENT.ON.CATERGORY_SEARCH).emit(() => itemCatergory)}
                    onPressLike = {(itemId) => {
                        if (likes.some((_itemId) => _itemId === itemId)) {
                            component.outgoing(EVENT.ON.UNLIKE).emit(() => itemId);
                        } else {
                            component.outgoing(EVENT.ON.LIKE).emit(() => itemId);
                        }
                    }}
                    onPressAddToCart = {(itemId) => component.outgoing(EVENT.ON.ADD_TO_CARTS).emit(() => itemId)}
                />
            );
        },
        navigationOptions: () => {
            return {
                header: {
                    visible: false
                }
            };
        }
    },
    shoppingCart: {
        screen: ({
            navigation,
            screenProps
        }) => {
            const {
                shade,
                component
            } = screenProps;
            const {
                items,
                carts
            } = component.state;

            return (
                <ShoppingCartView
                    navigation = { navigation }
                    shade = { shade }
                    items = { items }
                    carts = { carts }
                    onPressRemoveFromCart = {(itemId) => component.outgoing(EVENT.ON.REMOVE_FROM_CARTS).emit(() => itemId)}
                    onPressIncreaseQuantity = {(itemId) => component.outgoing(EVENT.ON.INCREASE_QUANTITY).emit(() => {
                        return {
                            itemId,
                            offset: 1
                        };
                    })}
                    onPressDecreaseQuantity = {(itemId) => component.outgoing(EVENT.ON.DECREASE_QUANTITY).emit(() => {
                        return {
                            itemId,
                            offset: -1
                        };
                    })}
                />
            );
        },
        navigationOptions: () => {
            return {
                header: {
                    visible: false
                }
            };
        }
    },
    shoppingCheckoutShipping: {
        screen: ({
            navigation,
            screenProps
        }) => {
            const {
                shade,
                component
            } = screenProps;

            return (
                <ShoppingCheckoutShippingView
                    navigation = { navigation }
                    shade = { shade }
                    onShippingInfoFormSubmitted = {(shippingInfoForm) => component.outgoing(EVENT.ON.SUBMIT_SHIPPING_INFO_FORM).emit(() => shippingInfoForm)}
                />
            );
        },
        navigationOptions: () => {
            return {
                header: {
                    visible: false
                }
            };
        }
    },
    shoppingCheckoutPayment: {
        screen: ({
            navigation,
            screenProps
        }) => {
            const {
                shade,
                component
            } = screenProps;
            const {
                form
            } = component.state;

            return (
                <ShoppingCheckoutPaymentView
                    navigation = { navigation }
                    shade = { shade }
                    shippingInfoForm = { form.shippingInfo }
                    onReset = {() => component.outgoing(EVENT.ON.RESET).emit()}
                />
            );
        },
        navigationOptions: () => {
            return {
                header: {
                    visible: false
                }
            };
        }
    }
}, {
    initialRouteName: `shoppingHome`,
    mode: `card`,
    headerMode: `none`,
    cardStyle: {
        backgroundColor: `transparent`
    }
});


const ShoppingInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    static: {
        router: ShoppingStackNavigator.router
    },
    setup (done) {
        done();
    },
    render () {
        const component = this;
        const {
            navigation,
            screenProps
        } = component.props;
        const {
            Theme,
            shade
        } = screenProps.component.state;

        return (
            <ShoppingStackNavigator
                navigation = { navigation }
                screenProps = {{
                    Theme,
                    shade,
                    component
                }}
            />
        );
    }
});
export default ShoppingInterface;
