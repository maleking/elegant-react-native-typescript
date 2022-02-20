import I18n from 'i18n-js';
import {memoize} from 'lodash';
import {I18nManager} from 'react-native';

import {changeLanguage} from '../store/reducers/app';

import i18nEN from '../i18n/en';
import i18nFA from '../i18n/fa';
import {store} from '../store';
import app from './en/app';
import home from './en/home';

I18n.translations = {
  en: {
    app: i18nEN.appLang,
    home: i18nEN.homeLang,
  },
  fa: {
    app: i18nFA.appLang,
    home: i18nFA.homeLang,
  },
};
I18n.fallbacks = ['en'];

const translate = memoize(
  (key, config) => I18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const t = word => I18n.t(word);
const setI18nConfig = config => {
  const state = store.getState();
  const {isRTL = false, name: languageTag} = config
    ? config
    : state.app.language;
  store.dispatch(changeLanguage({isRTL, name: languageTag}));

  translate.cache.clear();
  I18nManager.forceRTL(isRTL);

  I18n.locale = languageTag;
};

export default {
  appLang: app,
  homeLang: home,
};

export {setI18nConfig, t};
