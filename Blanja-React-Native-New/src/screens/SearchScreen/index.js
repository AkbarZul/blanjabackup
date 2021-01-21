// import React, {Component} from 'react';
// import {StyleSheet, View, TextInput, StatusBar} from 'react-native';
// // import FormInput from '../../components/FormInput';
// import Icon from 'react-native-vector-icons/EvilIcons';

// export default class Search extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle="dark-content" backgroundColor="#E5E5E5" />
//         <View style={styles.Search}>
//           <TextInput placeholder="Search" style={styles.form} />
//           <Icon name="search" color="gray" size={30} style={styles.icon} />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#e5e5e5',
//     height: '100%',
//   },
//   Search: {
//     flexDirection: 'row',
//     marginTop: 50,
//     paddingHorizontal: 20,
//   },
//   form: {
//     width: '100%',
//     backgroundColor: 'white',
//     paddingHorizontal: 40,
//     borderWidth: 0,
//     borderRadius: 23,
//   },
//   icon: {
//     position: 'absolute',
//     marginTop: 15,
//     marginLeft: 25,
//   },
// });


import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import axios from 'axios';
// import FormInput from '../../components/FormInput';
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/EvilIcons';
import {colors} from '../../utils';

const Search = ({navigation}) => {
  // const { text } = route.params;
  const [search, setSearch] = useState('');
  const [dataSearch, setDataSearch] = useState([])
  // const [viewSearch, setViewSearch] = useState([]);
  const BASE_URL = 'http://192.168.1.3:9005/search';
  console.log("tes search", search);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E5E5E5" />
      <View style={styles.Search}>
        
        <TouchableOpacity onPress={() => {
            navigation.navigate('Catalog', {search: search})}}>
          <Icon name="search" color={colors.black} size={30} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={(search) => setSearch(search)}
          style={styles.form}
          onSubmitEditing={() => {
            navigation.navigate('Catalog', {search: search})
          }}
        />
      </View>

      {/* {search !== null ? listSearch() : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    height: '100%',
    paddingHorizontal: 20,
  },
  Search: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  form: {
    width: '100%',
  },
});

export default Search;
