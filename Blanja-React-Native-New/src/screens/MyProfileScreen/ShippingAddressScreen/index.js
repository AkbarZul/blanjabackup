import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Text from '../../../components/Text';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, sizes} from '../../../utils';
import {useSelector} from 'react-redux';


const ShippingAddress = ({navigation, route}) => {
  // const {
  //   id,
  //   Fullname,
  //   Address,
  //   City,
  //   Region,
  //   Zipcode,
  //   Country,
  // } = route.params;
  const BASE_URL = 'http://192.168.1.3:9005';
  const [address, setAddress] = useState([]);
  const token = useSelector((state) => state.authReducer.token);

  console.log("address first", address);

  console.log(`ini tester`);

  const getAddressUser = async () => {
    // const token =  AsyncStorage.getItem('token');
    await axios
      .get(BASE_URL + '/address', {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const address = res.data.data;
        console.log('indi ini ', address);
        setAddress(address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAddress = () => {
    const data = {
      id_address: id,
      fullname: fullname,
      address: Address,
      city: City,
      region: Region,
      zip_code: Zipcode,
      country: Country
    };
    console.log("data ngenn", Fullname);
    axios
    .delete(BASE_URL + '/address/' + data.id_address, data)
    .then((res) => {
      const address = res.data.data;
      console.log("delete address", address);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getAddressUser();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.Search}>
          <TextInput placeholder="Search" style={styles.form} />
          <Icon name="search" color="gray" size={30} style={styles.icon} />
        </View>
        <Text children="Shipping address" size={30} style={styles.title} />
        <ScrollView>
          {address.map(
            ({
              id_address,
              fullname,
              address,
              city,
              region,
              zip_code,
              country,
            }) => {
              return (
                <View style={styles.card} key={id_address}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      children={fullname}
                      size={20}
                      style={{fontWeight: 'bold'}}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('UpdateShippingAddress', {
                          id: id_address,
                          Fullname: fullname,
                          Address: address,
                          City: city,
                          Region: region,
                          Zipcode: zip_code,
                          Country: country,
                        });
                      }}>
                      <Text
                        style={{
                          color: colors.red,
                          fontSize: sizes.l,
                          fontWeight: 'bold',
                        }}>
                        Change
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginVertical: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{width: '85%'}}>

                      <Text
                        children={address}
                        size={17}
                        type="Medium"
                        style={styles.address}
                      />
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          children={`${city},`}
                          size={17}
                          type="Medium"
                          style={styles.address}
                        />
                        <Text
                          children={`${region},`}
                          size={17}
                          type="Medium"
                          style={styles.address}
                        />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                        <Text
                          children={`${zip_code},`}
                          size={17}
                          type="Medium"
                          style={styles.address}
                        />
                        <Text
                          children={`${country}`}
                          size={17}
                          type="Medium"
                          style={styles.address}
                        />

                        </View>

                      

                      </View>
                      <View>
                        <TouchableOpacity onPress={() => deleteAddress(address.id_address)}>
                          <Iconn name="delete" size={30} color={colors.red} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            },
          )}
        </ScrollView>

        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DB3022"
          onPress={() => navigation.navigate('AddingShippingAddress')}
          style={styles.button}>
          <Text children="ADD NEW ADDRESS" size="l" />
        </TouchableHighlight>
      </View>
    </>
  );
};

export default ShippingAddress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    height: '100%',
    paddingHorizontal: 20,
  },
  Search: {
    flexDirection: 'row',
    marginTop: 30,
    paddingHorizontal: 5,
  },
  formAddress:{

  },
  form: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 50,
    borderWidth: 0,
    borderRadius: 23,
  },
  icon: {
    position: 'absolute',
    marginTop: 15,
    marginLeft: 20,
  },
  title: {
    paddingVertical: 20,
  },
  card: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  address: {
    textAlign: 'left',
    textAlignVertical: 'center',
    lineHeight: 21,
    marginRight: 3,
    letterSpacing: 0.15,
    // paddingVertical: 15,
  },
  button: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
});
