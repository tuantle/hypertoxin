'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import { Theme } from 'hypertoxin';

import socialShareIcon from '../../assets/icons/png/social-share-3x.png';
import facebookIcon from '../../assets/icons/base64/socials/facebook-3x';
import googlePlusIcon from '../../assets/icons/base64/socials/google-plus-3x';
import twitterIcon from '../../assets/icons/base64/socials/twitter-3x';
import githubIcon from '../../assets/icons/png/github-3x.png';

import homeIcon from '../../assets/icons/png/home-3x.png';
import profileIcon from '../../assets/icons/png/profile-3x.png';
import ellipsisIcom from '../../assets/icons/png/ellipsis-3x.png';
import emailIcon from '../../assets/icons/png/email-3x.png';
import editIcon from '../../assets/icons/png/edit-3x.png';
import starIcon from '../../assets/icons/png/star-3x.png';
import menuIcon from '../../assets/icons/png/menu-3x.png';
import closeIcon from '../../assets/icons/png/close-3x.png';
import cancelIcon from '../../assets/icons/png/cancel-3x.png';
import goBackIcon from '../../assets/icons/png/back-3x.png';
import goForwardIcon from '../../assets/icons/png/forward-3x.png';
import expandIcon from '../../assets/icons/png/expand-3x.png';
import collapseIcon from '../../assets/icons/png/collapse-3x.png';
import addIcon from '../../assets/icons/png/add-3x.png';
import deleteIcon from '../../assets/icons/png/delete-3x.png';
import checkIcon from '../../assets/icons/png/check-3x.png';
import tagIcon from '../../assets/icons/png/tag-3x.png';
import untagIcon from '../../assets/icons/png/untag-3x.png';
import exclamationIcon from '../../assets/icons/png/exclamation-3x.png';
import searchIcon from '../../assets/icons/png/search-3x.png';
import smileyFaceIcon from '../../assets/icons/png/smiley-face-3x.png';
import currentLocationIcon from '../../assets/icons/png/current-location-3x.png';
import infoIcon from '../../assets/icons/png/info-3x.png';
import cameraIcon from '../../assets/icons/png/camera-3x.png';
import tuneIcon from '../../assets/icons/png/tune-3x.png';
import favoriteIcon from '../../assets/icons/png/favorite-3x.png';
import favoriteOutlineIcon from '../../assets/icons/png/favorite-outline-3x.png';
import copyrightIcon from '../../assets/icons/png/copyright-3x.png';
import settingIcon from '../../assets/icons/png/setting-3x.png';
import signoutIcon from '../../assets/icons/png/signout-3x.png';
import markerIcon from '../../assets/icons/png/marker-3x.png';
import notificationIcon from '../../assets/icons/png/notification-3x.png';
import lockIcon from '../../assets/icons/png/lock-3x.png';
import historyIcon from '../../assets/icons/png/history-3x.png';
import recallIcon from '../../assets/icons/png/recall-3x.png';
import chatIcon from '../../assets/icons/png/chat-3x.png';
import moneyIcon from '../../assets/icons/png/money-3x.png';
import creditCardIcon from '../../assets/icons/png/credit-card-3x.png';
import addCartIcon from '../../assets/icons/png/add-cart-3x.png';
import cartIcon from '../../assets/icons/png/cart-3x.png';

const IconTheme = {
    socialShare: socialShareIcon,
    facebook: facebookIcon,
    googlePlus: googlePlusIcon,
    twitter: twitterIcon,
    github: githubIcon,
    home: homeIcon,
    profile: profileIcon,
    ellipsis: ellipsisIcom,
    email: emailIcon,
    edit: editIcon,
    star: starIcon,
    menu: menuIcon,
    close: closeIcon,
    cancel: cancelIcon,
    goBack: goBackIcon,
    goForward: goForwardIcon,
    expand: expandIcon,
    collapse: collapseIcon,
    add: addIcon,
    delete: deleteIcon,
    check: checkIcon,
    tag: tagIcon,
    untag: untagIcon,
    exclamation: exclamationIcon,
    search: searchIcon,
    smileyFace: smileyFaceIcon,
    currentLocation: currentLocationIcon,
    info: infoIcon,
    camera: cameraIcon,
    tune: tuneIcon,
    favorite: favoriteIcon,
    favoriteOutline: favoriteOutlineIcon,
    copyright: copyrightIcon,
    setting: settingIcon,
    signout: signoutIcon,
    marker: markerIcon,
    notification: notificationIcon,
    lock: lockIcon,
    history: historyIcon,
    recall: recallIcon,
    chat: chatIcon,
    money: moneyIcon,
    creditCard: creditCardIcon,
    addCart: addCartIcon,
    cart: cartIcon
};

const DefaultTheme = Hf.merge(Theme).with({
    name: `default`,
    icon: IconTheme,
    button: {
        flat: {
            corner: `round`,
            overlay: `transparent-outline`
        },
        raised: {
            corner: `round`
        }
    },
    field: {
        search: {
            shade: `light`,
            overlay: `opaque`,
            corner: `round`,
            size: `normal`,
            dropShadowed: false
        },
        font: {
            text: {
                input: Theme.font.normal,
                status: Theme.font.italicSmaller,
                helper: Theme.font.normalSmaller,
                label: {
                    focused: Theme.font.normalSmaller,
                    blurred: Theme.font.normal
                }
            }
        }
    }
});

export default DefaultTheme;
