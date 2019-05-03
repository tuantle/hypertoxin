'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../../themes/default-theme';

const {
    FlatList
} = ReactNative;

const {
    BodyScreen,
    HeaderScreen,
    RowLayout,
    ColumnLayout,
    FlatButton,
    RaisedButton,
    IconImage,
    CoverImage,
    TextField,
    TitleText,
    SubtitleText,
    InfoText,
    HorizontalDivider
} = Ht;

export default class ShoppingCartView extends React.Component {
    static propTypes = {
        Theme: PropTypes.object,
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        items: PropTypes.array,
        carts: PropTypes.array,
        onPressRemoveFromCart: PropTypes.func,
        onPressIncreaseQuantity: PropTypes.func,
        onPressDecreaseQuantity: PropTypes.func
    }
    static defaultProps = {
        Theme: DefaultTheme,
        shade: `light`,
        items: [],
        carts: [],
        onPressRemoveFromCart: () => null,
        onPressIncreaseQuantity: () => null,
        onPressDecreaseQuantity: () => null
    }
    constructor (props) {
        super(props);
        this.headerScreenRef = null;
        this.state = {
            headerNavigationVisible: true
        };
    }
    renderCartItemList (cartItems = []) {
        const component = this;
        const {
            Theme,
            shade,
            onPressRemoveFromCart,
            onPressIncreaseQuantity,
            onPressDecreaseQuantity
        } = component.props;

        return (
            <FlatList
                key = 'flat-list'
                room = 'content-top'
                data = { cartItems }
                extraData = { component.props }
                renderItem = {({
                    item
                }) => {
                    const itemPrice = parseFloat(item.price).toFixed(2);
                    const itemDiscountedPrice = parseFloat(item.price * (1 - item.discount / 100)).toFixed(2);

                    return ([
                        <RowLayout
                            key = 'row-layout'
                            room = 'content-top'
                            shade = { shade }
                            key = 'item'
                            roomAlignment = 'start'
                            contentTopRoomAlignment = 'stretch'
                            margin = {{
                                vertical: 10,
                                horizontal: 20
                            }}
                        >
                            <ColumnLayout
                                room = 'content-top'
                                roomAlignment = 'stretch'
                                contentLeftRoomAlignment = 'start'
                                contentRightRoomAlignment = 'start'
                                margin = {{
                                    bottom: 10
                                }}
                            >
                                <CoverImage
                                    room = 'content-left'
                                    resizeMode = 'cover'
                                    source = { item.image }
                                    corner = 'round'
                                    dropShadowed = { true }
                                    width = { 75 }
                                    height = { 75 }
                                />
                                <RowLayout
                                    room = 'content-left'
                                    roomAlignment = 'stretch'
                                    margin = {{
                                        left: 25
                                    }}
                                >
                                    <SubtitleText room = 'content-top' size = 'small' color = 'primary' >{ item.name }</SubtitleText>
                                    <InfoText room = 'content-top' size = 'small' color = { Theme.color.palette.grey }>{ `SKU: ${item.sku}`}</InfoText>
                                    {
                                        item.discount > 0 ? <ColumnLayout
                                            key = '0'
                                            room = 'content-middle'
                                            roomAlignment = 'start'
                                        >
                                            <InfoText
                                                room = 'content-left'
                                            >{ `$` }</InfoText>
                                            <SubtitleText
                                                room = 'content-left'
                                                size = 'small'
                                            >{ itemDiscountedPrice.split(`.`)[0] }</SubtitleText>
                                            <InfoText
                                                room = 'content-left'
                                            >{ itemDiscountedPrice.split(`.`)[1] }</InfoText>
                                            <InfoText
                                                room = 'content-right'
                                                decoration = 'line-through'
                                                color = { Theme.color.palette.red }
                                            >{ `  $${itemPrice}` }</InfoText>
                                        </ColumnLayout> : <ColumnLayout
                                            room = 'content-middle'
                                            roomAlignment = 'start'
                                        >
                                            <InfoText
                                                room = 'content-left'
                                            >{ `$` }</InfoText>
                                            <SubtitleText
                                                room = 'content-middle'
                                                size = 'small'
                                            >{ itemPrice.split(`.`)[0] }</SubtitleText>
                                            <InfoText
                                                room = 'content-right'
                                            >{ itemPrice.split(`.`)[1] }</InfoText>
                                        </ColumnLayout>
                                    }
                                </RowLayout>
                                <RowLayout
                                    room = 'content-right'
                                    roomAlignment = 'end'
                                    contentMiddleRoomAlignment = 'stretch'
                                >
                                    <SubtitleText room = 'content-middle' size = 'small' indentation = { 15 }>{ `Quantity: ${item.quantity}    ` }</SubtitleText>
                                    <ColumnLayout
                                        room = 'content-middle'
                                        roomAlignment = 'stretch'
                                    >
                                        <FlatButton
                                            room = 'content-left'
                                            size = 'small'
                                            corner = 'circular'
                                            overlay = 'transparent'
                                            color = 'primary'
                                            disabled = { item.quantity >= item.sku }
                                            onPress = { () => onPressIncreaseQuantity(item.id) }
                                        >
                                            <TitleText room = 'content-middle' > + </TitleText>
                                        </FlatButton>
                                        <FlatButton
                                            room = 'content-right'
                                            size = 'small'
                                            corner = 'circular'
                                            overlay = 'transparent'
                                            color = 'primary'
                                            disabled = { item.quantity === 1 }
                                            onPress = { () => onPressDecreaseQuantity(item.id) }
                                        >
                                            <TitleText room = 'content-middle' > - </TitleText>
                                        </FlatButton>
                                    </ColumnLayout>
                                </RowLayout>
                            </ColumnLayout>
                            <RaisedButton
                                room = 'content-bottom'
                                label = 'REMOVE FROM CART'
                                size = 'small'
                                color = 'accent'
                                onPress = {() => onPressRemoveFromCart(item.id)}
                            />
                        </RowLayout>,
                        <HorizontalDivider key = 'horizontal-divider' room = 'content-middle' shade = { shade } thickness = { 1 } edgeToEdge = { true }/>
                    ]);
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
    renderCartTotal (subtotal = 0, discountedSubtotal = 0, taxTotal = 0, total = 0) {
        const component = this;
        const {
            Theme
        } = component.props;

        return (
            <ColumnLayout
                key = 'column-layout'
                room = 'content-middle'
                roomAlignment = 'stretch'
                contentLeftRoomAlignment = 'stretch'
                contentMiddleRoomAlignment = 'stretch'
                margin = {{
                    bottom: 50
                }}
            >
                <TextField
                    room = 'content-left'
                    label = 'COUPON'
                    charLimit = { 4 }
                    margin = {{
                        left: 10,
                        right: 5
                    }}
                    style = {{
                        container: {
                            width: `100%`
                        }
                    }}
                >
                    <IconImage
                        room = 'content-left'
                        source = 'tag'
                        size = 'small'
                    />
                    <FlatButton
                        overlay = 'transparent'
                        room = 'content-right'
                        action = 'clear'
                        corner = 'circular'
                    >
                        <IconImage
                            room = 'content-middle'
                            source = 'cancel'
                            size = 'small'
                        />
                    </FlatButton>
                </TextField>
                <RowLayout
                    room = 'content-middle'
                    roomAlignment = 'stretch'
                    margin = {{
                        left: 5,
                        right: 10
                    }}
                    style = {{
                        container: {
                            width: `100%`
                        }
                    }}
                >
                    <ColumnLayout roomAlignment = 'stretch' room = 'content-top' >
                        <SubtitleText room = 'content-left' size = 'small' > Subtotal </SubtitleText>
                        <SubtitleText room = 'content-right' size = 'small' >{ `$${subtotal.toFixed(2)}` }</SubtitleText>
                    </ColumnLayout>
                    <ColumnLayout roomAlignment = 'stretch' room = 'content-top' >
                        <SubtitleText room = 'content-left' size = 'small' > Saved </SubtitleText>
                        <SubtitleText room = 'content-right' size = 'small' color = { Theme.color.palette.red }>{ `-$${(subtotal - discountedSubtotal).toFixed(2)}` }</SubtitleText>
                    </ColumnLayout>
                    <ColumnLayout roomAlignment = 'stretch' room = 'content-top' >
                        <SubtitleText room = 'content-left' size = 'small' > Taxes </SubtitleText>
                        <SubtitleText room = 'content-right' size = 'small' >{ `$${taxTotal.toFixed(2)}` }</SubtitleText>
                    </ColumnLayout>
                    <HorizontalDivider key = 'horizontal-divider' room = 'content-middle' thickness = { 2 } margin = {{ vertical: 10 }}/>
                    <ColumnLayout roomAlignment = 'stretch' room = 'content-bottom' >
                        <SubtitleText room = 'content-left' > Total </SubtitleText>
                        <SubtitleText room = 'content-right' >{ `$${total.toFixed(2)}` }</SubtitleText>
                    </ColumnLayout>
                </RowLayout>
            </ColumnLayout>
        );
    }
    render () {
        const component = this;
        const {
            shade,
            navigation,
            items,
            carts
        } = component.props;
        const {
            headerNavigationVisible
        } = component.state;
        const cartItems = carts.map((cart) => {
            const item = items.find((_item) => _item.id === cart.itemId);
            if (Hf.isObject(item)) {
                return {
                    ...item,
                    quantity: cart.quantity
                };
            }
            return cart;
        });
        const [
            subtotal,
            discountedSubtotal,
            totalQuantity
        ] = cartItems.reduce((subtotals, item) => {
            const itemDiscountedPrice = parseFloat(item.price * (1 - item.discount / 100));
            const itemPrice = parseFloat(item.price);
            return [
                subtotals[0] + itemPrice * item.quantity,
                subtotals[1] + itemDiscountedPrice * item.quantity,
                subtotals[2] + item.quantity
            ];
        }, [ 0, 0, 0 ]);
        const taxTotal = discountedSubtotal * 0.08;
        const total = discountedSubtotal + taxTotal;

        return ([
            <HeaderScreen
                key = 'header-screen'
                ref = {(componentRef) => {
                    component.headerScreenRef = componentRef;
                }}
                shade = { shade }
                label = 'CART'
            >
                <FlatButton
                    room = 'content-left'
                    overlay = 'transparent'
                    corner = 'circular'
                    onPress = {() => navigation.goBack()}
                >
                    <IconImage
                        room = 'content-middle'
                        size = 'large'
                        source = 'go-back'
                    />
                </FlatButton>
                <ColumnLayout
                    room = 'media'
                    shade = 'light'
                    exclusions = {[ `shade`, `color` ]}
                    overlay = 'opaque'
                    roomAlignment = 'stretch'
                    contentLeftRoomAlignment = 'center'
                    corner = 'sharp'
                >
                    <SubtitleText
                        room = 'content-left'
                        size = 'small'
                        indentation = { 10 }
                    >{ `You have ${totalQuantity} items in cart` }</SubtitleText>
                    <RaisedButton
                        room = 'content-right'
                        label = 'CHECKOUT'
                        color = 'accent'
                        disabled = { totalQuantity === 0 }
                        margin = {{
                            right: 10,
                            vertical: 10
                        }}
                        onPress = {() => navigation.navigate(`shoppingCheckoutShipping`)}
                    />
                </ColumnLayout>
            </HeaderScreen>,
            <BodyScreen
                key = 'body-screen'
                shade = { shade }
                contentTopRoomAlignment = 'stretch'
                contentMiddleRoomAlignment = 'stretch'
                scrollable = { true }
                keyboardAvoiding = { true }
                onScroll = {(scrollEvent) => {
                    if (scrollEvent.direction === 1 && !component.headerScreenRef.isNavigationVisible()) {
                        component.setState(() => {
                            return {
                                headerNavigationVisible: true
                            };
                        }, () => {
                            component.headerScreenRef.showNavigation();
                        });
                    } else if (scrollEvent.direction === -1 && component.headerScreenRef.isNavigationVisible()) {
                        component.setState(() => {
                            return {
                                headerNavigationVisible: false
                            };
                        }, () => {
                            component.headerScreenRef.hideNavigation();
                        });
                    }
                }}
                style = {{
                    container: {
                        paddingTop: headerNavigationVisible ? 150 : 90,
                        paddingBottom: 50
                    }
                }}
            >
                {
                    carts.length > 0 ? [
                        component.renderCartItemList(cartItems),
                        component.renderCartTotal(subtotal, discountedSubtotal, taxTotal, total)
                    ] : null
                }
            </BodyScreen>
        ]);
    }
}
