'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../../themes/default-theme';

const {
    Dimensions,
    FlatList
} = ReactNative;

const {
    BodyScreen,
    HeaderScreen,
    RowLayout,
    ColumnLayout,
    SearchField,
    FlatButton,
    RaisedButton,
    AreaButton,
    IconImage,
    CoverImage,
    TitleText,
    SubtitleText,
    InfoText,
    CaptionText,
    HorizontalDivider
} = Ht;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const RATING_STARS = `★★★★★`;

export default class ShoppingHomeView extends React.Component {
    static propTypes = {
        Theme: PropTypes.object,
        shade: PropTypes.oneOf([ `light`, `dark` ]),
        items: PropTypes.array,
        likes: PropTypes.array,
        carts: PropTypes.array,
        onReset: PropTypes.func,
        onSearch: PropTypes.func,
        onCatergorySearch: PropTypes.func,
        onPressLike: PropTypes.func,
        onPressAddToCart: PropTypes.func
    }
    static defaultProps = {
        Theme: DefaultTheme,
        shade: `light`,
        items: [],
        likes: [],
        carts: [],
        onReset: () => null,
        onSearch: () => null,
        onCatergorySearch: () => null,
        onPressLike: () => null,
        onPressAddToCart: () => null
    }
    constructor (props) {
        super(props);
        this.headerScreenRef = null;
        this.searchFieldRef = null;
        this.state = {
            headerNavigationVisible: true
        };
    }
    renderItemList () {
        const component = this;
        const {
            shade,
            Theme,
            items,
            likes,
            carts,
            onPressLike,
            onPressAddToCart
        } = component.props;

        return (
            <FlatList
                room = 'content-middle'
                data = { items }
                extraData = { component.props }
                renderItem = {({
                    item
                }) => {
                    const avgItemRating = item.reviews.length > 0 ? Math.round(item.reviews.reduce((rating, review) => {
                        rating += review.rating;
                        return rating;
                    }, 0) / item.reviews.length) : 0;
                    const itemPrice = parseFloat(item.price).toFixed(2);
                    const itemDiscountedPrice = parseFloat(item.price * (1 - item.discount / 100)).toFixed(2);

                    return ([
                        <RowLayout
                            room = 'content-top'
                            shade = { shade }
                            key = 'item'
                            roomAlignment = 'start'
                            contentTopRoomAlignment = 'start'
                            margin = {{
                                vertical: 10,
                                horizontal: 10
                            }}
                        >
                            <ColumnLayout
                                room = 'content-top'
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
                                    width = { 100 }
                                    height = { 100 }
                                    margin = {{
                                        top: 15
                                    }}
                                >
                                    <FlatButton
                                        overlay = 'translucent'
                                        corner = 'circular'
                                        size = 'small'
                                        color = { likes.some((itemId) => itemId === item.id) ? Theme.color.palette.red : Theme.color.palette.grey }
                                        onPress = {() => onPressLike(item.id) }
                                        style = {{
                                            container: {
                                                top: -50,
                                                left: 50
                                            }
                                        }}
                                    >
                                        <IconImage
                                            room = 'content-middle'
                                            exclusions = {[ `color` ]}
                                            color = { Theme.color.palette.white }
                                            source = { likes.some((itemId) => itemId === item.id) ? `favorite` : `favorite-outline` }
                                        />
                                    </FlatButton>
                                </CoverImage>
                                <RowLayout
                                    room = 'content-right'
                                    roomAlignment = 'start'
                                    margin = {{
                                        left: 25
                                    }}
                                >
                                    <TitleText room = 'content-top' size = 'small' color = 'primary' >{ item.name }</TitleText>
                                    <InfoText room = 'content-top' size = 'small' color = { Theme.color.palette.grey }>{ `SKU: ${item.sku}`}</InfoText>
                                    <InfoText room = 'content-top' color = { Theme.color.palette.amber }>{ `${RATING_STARS.substring(RATING_STARS.length - avgItemRating)}` }</InfoText>
                                    {
                                        item.discount > 0 ? [
                                            <ColumnLayout
                                                key = '0'
                                                room = 'content-middle'
                                                roomAlignment = 'start'
                                            >
                                                <SubtitleText
                                                    room = 'content-left'
                                                    size = 'small'
                                                >{ `$` }</SubtitleText>
                                                <TitleText
                                                    room = 'content-left'
                                                >{ itemDiscountedPrice.split(`.`)[0] }</TitleText>
                                                <SubtitleText
                                                    room = 'content-left'
                                                    size = 'small'
                                                >{ itemDiscountedPrice.split(`.`)[1] }</SubtitleText>
                                                <SubtitleText
                                                    room = 'content-right'
                                                    size = 'small'
                                                    decoration = 'line-through'
                                                    color = { Theme.color.palette.red }
                                                >{ `  $${itemPrice}` }</SubtitleText>
                                            </ColumnLayout>,
                                            <SubtitleText
                                                key = '1'
                                                room = 'content-middle'
                                                size = 'small'
                                                color = { Theme.color.palette.green }
                                            >{ `${item.discount}% Off` }</SubtitleText>
                                        ] : <ColumnLayout
                                            room = 'content-middle'
                                            roomAlignment = 'start'
                                        >
                                            <SubtitleText
                                                room = 'content-left'
                                                size = 'small'
                                            >{ `$` }</SubtitleText>
                                            <TitleText
                                                room = 'content-middle'
                                            >{ itemPrice.split(`.`)[0] }</TitleText>
                                            <SubtitleText
                                                room = 'content-right'
                                                size = 'small'
                                            >{ itemPrice.split(`.`)[1] }</SubtitleText>
                                        </ColumnLayout>
                                    }
                                </RowLayout>
                            </ColumnLayout>
                            <InfoText room = 'content-middle' color = 'primary' >{ item.description }</InfoText>
                            <RaisedButton
                                room = 'content-bottom'
                                label = {(() => {
                                    if (item.sku === 0) {
                                        return `OUT OF STOCK`;
                                    }
                                    return carts.some((cart) => cart.itemId === item.id) ? `ADDED` : `ADD TO CART`;
                                })()}
                                size = 'small'
                                color = 'accent'
                                disabled = { carts.some((cart) => cart.itemId === item.id) || item.sku === 0 }
                                onPress = {() => onPressAddToCart(item.id)}
                            />
                        </RowLayout>,
                        <HorizontalDivider key = 'divider' room = 'content-middle' shade = { shade } thickness = { 5 } edgeToEdge = { true }/>
                    ]);
                }}
                keyExtractor={(item, index) => index.toString()}
                style = {{
                    width: DEVICE_WIDTH
                }}
            />
        );
    }
    render () {
        const component = this;
        const {
            shade,
            navigation,
            items,
            carts,
            onReset,
            onSearch,
            onCatergorySearch
        } = component.props;
        const {
            headerNavigationVisible
        } = component.state;

        return ([
            <HeaderScreen
                key = 'header-screen'
                ref = {(componentRef) => {
                    component.headerScreenRef = componentRef;
                }}
                shade = { shade }
            >
                <FlatButton
                    room = 'content-left'
                    overlay = 'transparent'
                    corner = 'circular'
                    onPress = {() => {
                        onReset();
                        navigation.navigate(`mockupAppsHome`);
                    }}
                >
                    <IconImage
                        room = 'content-middle'
                        size = 'large'
                        source = 'go-back'
                    />
                </FlatButton>
                <SearchField
                    ref = {(componentRef) => {
                        component.searchFieldRef = componentRef;
                    }}
                    room = 'content-middle'
                    shade = 'light'
                    exclusions = {[ `shade`, `size` ]}
                    size = 'small'
                    hint = 'Search...'
                    dropShadowed = { false }
                    initiallyCollapsed = { false }
                    pinnedSuggestionValues = {[ `garden`, `kitchen`, `clothing`, `reading` ]}
                    onGetAutocompletionValues = {async (text) => {
                        if (text) {
                            const filteredItemNames = await new Promise(resolve => setTimeout(() => {
                                resolve(items.filter((item) => item.name.match(new RegExp(text, `i`))).map((item) => item.name));
                            }, 500));
                            return filteredItemNames;
                        }
                        return [];
                    }}
                    onSearch = {(itemName) => {
                        if ([ `garden`, `kitchen`, `clothing`, `reading` ].some((catergory) => catergory === itemName)) {
                            onCatergorySearch(itemName);
                        } else {
                            onSearch(Hf.isString(itemName) ? itemName : ``);
                        }
                    }}
                    onClear = {() => {
                        onSearch(``);
                        onCatergorySearch(``);
                    }}
                    renderSuggestionItem = {(item, onPressSelectAndSubmit, onPressSelect) => {
                        return (
                            <AreaButton
                                size = 'small'
                                overlay = 'transparent'
                                onPress = {() => onPressSelectAndSubmit(item)}
                            >
                                <ColumnLayout
                                    room = 'content-left'
                                    roomAlignment = 'center'
                                >
                                    <IconImage
                                        room = 'content-left'
                                        source = {(() => {
                                            switch (item.suggestionType) { // eslint-disable-line
                                            case `pin`:
                                                return `star`;
                                            case `history`:
                                                return `history`;
                                            case `autocompletion`:
                                                return `search`;
                                            default:
                                                return null;
                                            }
                                        })()}
                                        margin = {{
                                            left: 10
                                        }}
                                    />
                                    <InfoText room = 'content-right' indentation = { 10 }>{ item.value }</InfoText>
                                </ColumnLayout>
                                {
                                    item.suggestionType !== `pin` ? <FlatButton
                                        room = 'content-right'
                                        overlay = 'transparent'
                                        corner = 'circular'
                                        onPress = {() => onPressSelect(item)}
                                        margin = {{
                                            right: 10
                                        }}
                                    >
                                        <IconImage
                                            room = 'content-middle'
                                            source = 'recall'
                                            size = 'small'
                                        />
                                    </FlatButton> : null
                                }
                            </AreaButton>
                        );
                    }}
                    style = {{
                        suggestion: {
                            left: -36,
                            paddingTop: 10
                        }
                    }}
                >
                    <FlatButton
                        room = 'content-left'
                        action = 'search'
                        overlay = 'transparent'
                        corner = 'circular'
                    >
                        <IconImage
                            room = 'content-middle'
                            source = 'search'
                        />
                    </FlatButton>
                    <FlatButton
                        room = 'content-right'
                        action = 'clear'
                        overlay = 'transparent'
                        corner = 'circular'
                    >
                        <IconImage
                            room = 'content-middle'
                            source = 'cancel'
                        />
                    </FlatButton>
                </SearchField>
                <FlatButton
                    room = 'content-right'
                    exclusions = {[ `size`, `margin` ]}
                    overlay = 'transparent'
                    corner = 'circular'
                    size = 'small'
                    margin = {{
                        horizontal: 15
                    }}
                    onPress = {() => navigation.navigate(`shoppingCart`)}
                >
                    <IconImage
                        room = 'content-middle'
                        source = 'cart'
                    />
                    <InfoText
                        room = 'badge'
                        style = {{ color: `white` }}
                    > { `${carts.length}` } </InfoText>
                </FlatButton>
            </HeaderScreen>,
            <BodyScreen
                key = 'body-screen'
                shade = { shade }
                contentMiddleRoomAlignment = 'start'
                scrollable = { true }
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
                        paddingTop: headerNavigationVisible ? 90 : 30,
                        paddingBottom: 50
                    }
                }}
            >
                <CaptionText room = 'content-top' > Version: 0.1 </CaptionText>
                {
                    component.renderItemList()
                }
            </BodyScreen>
        ]);
    }
}
