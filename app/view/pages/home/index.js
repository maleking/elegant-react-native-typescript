import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RNRestart from 'react-native-restart';
import {Appbar, Button, Image, View, Alert} from 'view/components';
import {StyleSheet, Text} from 'react-native';

import style from 'view/style';
import {styleJoiner} from 'helpers/util';
import {setI18nConfig, t} from 'i18n';

import {login, logout} from 'store/reducers/user';
import {setAppFirstLaunch} from 'store/reducers/app';
import {selectApp} from 'store/selectors/app';
import {selectUser} from 'store/selectors/user';
import {SafeAreaView} from 'react-native-safe-area-context';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {navigate} = navigation;

  const user = useSelector(selectUser);
  const app = useSelector(selectApp);

  useEffect(() => {
    if (app.isFirsLaunch) {
      showAlert();
    }

    setI18nConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _toggleUserStatus = () => {
    if (user.loggedIn) {
      dispatch(logout());
    } else {
      dispatch(login());
    }
  };

  const _changeUserStatusButtonText = () => {
    if (user.loggedIn) {
      return t('auth.signOut');
    } else {
      return t('auth.signIn');
    }
  };

  const showAlert = useCallback(
    () =>
      Alert.alert(
        t('app.alertTitle'),
        t('app.alertMessage'),
        [
          {
            text: 'English',
            onPress: () => {
              setI18nConfig({isRTL: false, name: 'en'});
              dispatch(setAppFirstLaunch());
              setTimeout(RNRestart.Restart, 2000);
            },
          },
          {
            text: 'فارسی',
            onPress: () => {
              setI18nConfig({isRTL: true, name: 'fa'});
              dispatch(setAppFirstLaunch());
              setTimeout(RNRestart.Restart, 2000);
            },
            style: 'cancel',
          },
        ],
        {cancelable: true},
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text
        mode="outlined"
        color="#13a77f"
        // onPress={() => navigate('Todos')}
        style={styles.button}>
        Elegant
      </Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {justifyContent: 'center', flex: 1},
  button: {textAlign: 'center', fontSize: 24},
});
