import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text, StatusBar} from 'react-native';
import splash from '../../../assets/images/splash.png';
import {colors} from '../../../utils';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.splashBg}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={colors.red}
      />
      <Image source={splash} />
      {/* <Text>BLANJA APP</Text> */}
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splashBg: {
    backgroundColor: colors.red,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
