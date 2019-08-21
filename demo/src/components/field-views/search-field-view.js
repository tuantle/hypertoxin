'use strict'; // eslint-disable-line

import { Ht } from 'hypertoxin';

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import DefaultTheme from '../../themes/default-theme';

const {
    RowLayout,
    ColumnLayout,
    SearchField,
    FlatButton,
    AreaButton,
    IconImage,
    HeadlineText,
    InfoText,
    CaptionText
} = Ht;

export default class SearchFieldView extends React.Component {
    static propTypes = {
        Theme: PropTypes.object,
        shade: PropTypes.oneOf([ `light`, `dark` ])
    }
    static defaultProps = {
        Theme: DefaultTheme,
        shade: `light`
    }
    constructor (props) {
        super(props);
        this.searchFieldRef = null;
        this.searchFieldLeftIconRef = null;
        this.state = {
            searchSuggestionVisible: false
        }
    }
    render () {
        const component = this;
        const {
            shade
        } = component.props;
        const {
            searchSuggestionVisible
        } = component.state;

        return (
            <RowLayout
                shade = { shade }
                roomAlignment = 'stretch'
                contentTopRoomAlignment = 'center'
                contentMiddleRoomAlignment = 'stretch'
                margin = {{
                    horizontal: 10
                }}
            >
                <HeadlineText room = 'content-top' > SearchField </HeadlineText>
                <CaptionText room = 'content-middle' size = 'large' > With pins, history & autocompletion suggestion </CaptionText>
                <SearchField
                    ref = {(componentRef) => {
                        component.searchFieldRef = componentRef;
                    }}
                    room = 'content-middle'
                    hint = 'Search...'
                    size = 'normal'
                    dropShadowed = { false }
                    pinnedSuggestionValues = {[ `Hypertoxin`, `React Native` ]}
                    onShowSuggestion = {() => {
                        if (component.searchFieldRef !== null) {
                            component.setState(() => {
                                return {
                                    searchSuggestionVisible: true
                                }
                            });
                        }
                    }}
                    onHideSuggestion = {() => {
                        if (component.searchFieldRef !== null) {
                            component.setState(() => {
                                return {
                                    searchSuggestionVisible: false
                                }
                            });
                        }
                    }}
                    onGetAutocompletionValues = {async (text) => {
                        if (text) {
                            const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                                method: `get`
                            });
                            const data = await response.json();
                            return data[1].slice(0, 6);
                        }
                        return [];
                    }}
                    renderSuggestionItem = {(item, onPressSelectAndSubmit, onPressSelect) => {
                        return (
                            <AreaButton
                                shade = { shade }
                                overlay = 'transparent'
                                size = 'small'
                                onPress = {() => onPressSelectAndSubmit(item)}
                            >
                                <ColumnLayout
                                    room = 'content-left'
                                    roomAlignment = 'center'
                                >
                                    <IconImage
                                        room = 'content-left'
                                        color = { item.suggestionType === `pin` || item.suggestionType === `history` ? `accent` : `primary` }
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
                                    <InfoText
                                        room = 'content-right'
                                        indentation = { 10 }
                                        color = { item.suggestionType === `pin` || item.suggestionType === `history` ? `accent` : `default` }

                                    >{ item.value }</InfoText>
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
                    margin = {{
                        vertical: 5
                    }}
                    style = {{
                        suggestion: {
                            left: -10
                        }
                    }}
                >
                    <FlatButton
                        room = 'content-left'
                        action = 'hide-suggestion'
                        overlay = 'transparent'
                        corner = 'circular'
                    >
                        <IconImage
                            ref = {(componentRef) => {
                                component.searchFieldLeftIconRef = componentRef;
                            }}
                            room = 'content-middle'
                            source = { searchSuggestionVisible ? 'go-back' : 'search' }
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
            </RowLayout>
        );
    }
}
