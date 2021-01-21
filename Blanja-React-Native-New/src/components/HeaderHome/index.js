import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/images/header.png')}
      style={styles.header}>
      <Text style={styles.banner}>Street clothes</Text>
      {/* <Icon name="star" size={20} color={colors.yellow} /> */}

      <Icon
        name="bell-alert-outline"
        style={styles.notif}
        size={30}
        color={colors.white}
        onPress={() => navigation.navigate('Notification')}
      />
    </ImageBackground>
    // <View>
    //   <Image
    //     style={styles.imageHeader}
    //     source={require('../../assets/images/header.png')}
    //   />
    //   <Text style={styles.text} >Street Clothing</Text>
    // </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  imageHeader: {
    width: '100%',
    height: 260,
  },
  text: {
    position: 'relative',
    padding: 20,
  },
  header: {
    width: '100%',
    height: 260,
    flexDirection: 'row',
  },
  notif: {
    marginLeft: 95,
    marginVertical: 50,
    // bottom: 0
  },
  banner: {
    flexDirection: 'column-reverse',
    fontWeight: '700',
    color: '#fff',
    fontSize: 34,
    marginTop: 200,
    marginLeft: 20,
    bottom: 0,
  },
});
