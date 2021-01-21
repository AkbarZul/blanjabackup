// import React, {Component} from 'react';
// import {StyleSheet, View, ScrollView} from 'react-native';
// import Text from '../../../components/Text';
// import {ButtonSubmit} from '../../../components/index';
// import {Picker} from '@react-native-picker/picker';
// import FormInput from 'react-native-outline-input';

// export default class AddingShippingAddress extends Component {
//   state = {
//     Fullname: '',
//     Address: '',
//     City: '',
//     Province: '',
//     ZipCode: '',
//   };
//   handleChange(fullname) {
//     this.setState({
//       Fullname: fullname,
//     });
//   }
//   handleChangeAdd(address) {
//     this.setState({
//       Address: address,
//     });
//   }
//   handleChangeCity(city) {
//     this.setState({
//       City: city,
//     });
//   }
//   handleChangeProv(province) {
//     this.setState({
//       Province: province,
//     });
//   }
//   handleChangeCode(zipCode) {
//     this.setState({
//       ZipCode: zipCode,
//     });
//   }
//   render() {
//     const {Fullname, Address, City, Province, ZipCode} = this.state;
//     return (
//       <ScrollView style={styles.container}>
//         <View style={styles.input}>
//           <FormInput
//             value={Fullname}
//             onChangeText={(fullname) => this.handleChange(fullname)}
//             label="Full Name"
//             passiveBorderColor="white"
//             activeBorderColor="black"
//             activeLabelColor="black"
//             style={styles.form1}
//           />
//         </View>
//         <View style={styles.input}>
//           <FormInput
//             value={Address}
//             onChangeText={(address) => this.handleChangeAdd(address)}
//             label="Address"
//             passiveBorderColor="white"
//             activeBorderColor="black"
//             activeLabelColor="black"
//             style={styles.form1}
//           />
//         </View>
//         <View style={styles.input}>
//           <FormInput
//             value={City}
//             onChangeText={(city) => this.handleChangeCity(city)}
//             label="City"
//             passiveBorderColor="white"
//             activeBorderColor="black"
//             activeLabelColor="black"
//             style={styles.form1}
//           />
//         </View>
//         <View style={styles.input}>
//           <FormInput
//             value={Province}
//             onChangeText={(province) => this.handleChangeProv(province)}
//             label="State/Province/Region"
//             passiveBorderColor="white"
//             activeBorderColor="black"
//             activeLabelColor="black"
//             style={styles.form1}
//           />
//         </View>
//         <View style={styles.input}>
//           <FormInput
//             value={ZipCode}
//             onChangeText={(zipCode) => this.handleChangeCode(zipCode)}
//             label="Zip Code (Postal Code)"
//             passiveBorderColor="white"
//             activeBorderColor="black"
//             activeLabelColor="black"
//             style={styles.form1}
//           />
//         </View>
//         <View style={styles.input}>
//           <Picker
//             mode="dropdown"
//             selectedValue={this.state.country}
//             onValueChange={(itemValue, itemIndex) =>
//               this.setState({country: itemValue})
//             }
//             style={{
//               color: 'gray',
//               height: 58,
//               backgroundColor: 'white',
//               width: '98%',
//               borderRadius: 5,
//             }}>
//             <Picker.Item label="Country" />
//             <Picker.Item label="United States" value="United States" />
//             <Picker.Item label="Indonesia" value="Indonesia" />
//             <Picker.Item label="England" value="England" />
//           </Picker>
//         </View>
//         <ButtonSubmit title="Save Address" bg="red" rippleColor="white" />
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     paddingHorizontal: 20,
//     marginTop: 35,
//   },
//   input: {
//     paddingVertical: 15,
//   },
// });

import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Text from '../../../components/Text';
import {ButtonSubmit} from '../../../components/index';
import {Picker} from '@react-native-picker/picker';
import FormInput from 'react-native-outline-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useSelector} from 'react-redux';


const AddingShippingAddress = ({navigation}) => {
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const token = useSelector((state) => state.authReducer.token);
  

  // const getToken = async () => {
  //   try {
  //     // console.log('ini');
  //     const token = await AsyncStorage.getItem('token');
  //     const fullName = await AsyncStorage.getItem('fullName');
  //     const email = await AsyncStorage.getItem('email');
  //     if ((token, fullName, email !== null)) {
  //       // value previously stored
  //       // console.log('Token ProfilePage ', token);
  //       // console.log('ProfilePage');
  //       return true;
  //     } else {
  //       console.log('token null');
  //       return false;
  //     }
  //   } catch (e) {
  //     // error reading value
  //     console.log(e);
  //   }
  // };
  // getToken();
  // console.log(`ini tester`);

  const handleSubmit = async () => {
    const data = {
      fullname: fullname,
      address: address,
      city: city,
      region: region,
      zip_code: zipcode,
      country: country,
    };
    axios
      .post('http://192.168.18.29:8007/address', data, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log('Add addres');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.input}>
        <FormInput
          value={fullname}
          onChangeText={(fullname) => setFullname(fullname)}
          label="Full Name"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>
      <View style={styles.input}>
        <FormInput
          value={address}
          onChangeText={(address) => setAddress(address)}
          label="Address"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>
      <View style={styles.input}>
        <FormInput
          value={city}
          onChangeText={(city) => setCity(city)}
          label="City"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>
      <View style={styles.input}>
        <FormInput
          value={region}
          onChangeText={(region) => setRegion(region)}
          label="State/Province/Region"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>
      <View style={styles.input}>
        <FormInput
          value={zipcode}
          onChangeText={(zipcode) => setZipcode(zipcode)}
          label="Zip Code (Postal Code)"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>
      <View style={styles.input}>
        <FormInput
          value={country}
          onChangeText={(country) => setCountry(country)}
          label="Country"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>

      <ButtonSubmit
        title="Save Address"
        bg="red"
        rippleColor="white"
        onPress={() => navigation.navigate('Profile', handleSubmit())}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 35,
  },
  input: {
    paddingVertical: 15,
  },
});

export default AddingShippingAddress;
