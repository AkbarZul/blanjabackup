// import React, {useState, useEffect, createRef} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Button,
//   Image,
// } from 'react-native';
// import {FlatGrid} from 'react-native-super-grid';
// import axios from 'axios';
// import ActionSheet from 'react-native-actions-sheet';

// const BASE_URL = 'http://192.168.18.29:8007';
// const actionSheetRef = createRef();

// const MainCatalogScreen = ({navigation}) => {
//   const [products, setProducts] = useState([]);

//   const getProduct = async () => {
//     await axios
//       .get(BASE_URL + `/products?keyword=created_at DESC&limit=100`)
//       .then((res) => {
//         const products = res.data.data.products;
//         console.log('Data CatalogMain  ', res.data.data.products);
//         setProducts(products);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     // code to run on component mount
//     // console.log('IDNya', itemId);
//     getProduct();
//     // getDataCard();
//   }, []);

//   return (
//     <>
//       <FlatGrid
//         itemDimension={130}
//         data={products}
//         style={styles.gridView}
//         // staticDimension={300}
//         // fixed
//         spacing={10}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate('DetailProduct', {
//                 itemId: item.id,
//                 categories: item.category_name,
//               })
//             }>
//             <View style={[styles.itemContainer, {backgroundColor: '#ffffff'}]}>
//               <Image
//                 source={{uri: `${JSON.parse(item.product_photo).shift()}`}}
//                 style={{borderRadius: 10, width: '100%', height: 100}}
//               />
//               <Text style={styles.itemName}>{item.product_name}</Text>
//               <Text style={styles.itemCode}>{item.product_price}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//       {/* <Button
//         style={styles.button}
//         title="Go to BottomSheet"
//         onPress={() => {
//           actionSheetRef.current?.setModalVisible();
//         }}
//       />

//       <ActionSheet gestureEnabled ref={actionSheetRef}>
//         <View>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//           <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
//         </View>
//       </ActionSheet> */}
//     </>
//   );
// };

// export default MainCatalogScreen;

// const styles = StyleSheet.create({
//   gridView: {
//     marginTop: 10,
//     flex: 1,
//   },
//   itemContainer: {
//     justifyContent: 'flex-end',
//     borderRadius: 5,
//     padding: 10,
//     height: 150,
//   },
//   itemName: {
//     fontSize: 16,
//     color: '#000000',
//     fontWeight: '600',
//   },
//   itemCode: {
//     fontWeight: '600',
//     fontSize: 12,
//     color: '#000000',
//   },
// });


import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';
import {colors} from '../../utils';
import ActionSheet from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconn from 'react-native-vector-icons/Ionicons';

const BASE_URL = 'http://192.168.1.3:9005';
const actionSheetRef = createRef();

const MainCatalogScreen = ({navigation, route}) => {
  let {card, search} = route.params;
  console.log('test keywor', search);
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState([]);

  const searching = () => {
    axios
      .get(BASE_URL + '/search?keyword=' + search)
      .then((res) => {
        const products = res.data.data;
        setIsSearching(products);
        console.log('data search', products);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const getProduct = () => {
    axios
      .get(BASE_URL + `/products?keyword=created_at DESC&limit=100`)
      .then((res) => {
        const products = res.data.data.products;
        console.log('Data CatalogMain  ', res.data.data.products);
        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    searching(search)
  }, [search])

  useEffect(() => {
    getProduct(card)
  }, [card])


  return (
    <>
    
      {
        search !== undefined ?
        <FlatGrid
        itemDimension={130}
        data={isSearching}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={12}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{justifyContent: 'center', padding: 10}}
            onPress={() =>
              navigation.navigate('DetailProduct', {
                itemId: item.product_id,
                categories: item.category_name,
                photo: item.product_photo,
              })
            }>
            <View style={[styles.itemContainer, {backgroundColor: 'white'}]}>
              <Image
                source={{uri: `${JSON.parse(item.product_photo).shift()}`}}
                style={{
                  borderRadius: 10,
                  marginBottom: 10,
                  width: 120,
                  height: 140,
                }}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="star" size={20} color={colors.yellow} />
                <Text children={`(${item.rating})`} />
              </View>
              <Text style={styles.itemName}>{item.product_name}</Text>
              <Text style={styles.itemCode}>Rp.{item.product_price}</Text>
            </View>
          </TouchableOpacity>
        )}
      /> : 
      <FlatGrid
        itemDimension={130}
        data={products}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={12}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{justifyContent: 'center', padding: 10}}
            onPress={() =>
              navigation.navigate('DetailProduct', {
                itemId: item.id,
                categories: item.category_name,
                photo: item.product_photo,
              })
            }>
            <View style={[styles.itemContainer, {backgroundColor: 'white'}]}>
              <Image
                source={{uri: `${JSON.parse(item.product_photo).shift()}`}}
                style={{
                  borderRadius: 10,
                  marginBottom: 10,
                  width: 120,
                  height: 140,
                }}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="star" size={20} color={colors.yellow} />
                <Text children={`(${item.rating})`} />
              </View>
              <Text style={styles.itemName}>{item.product_name}</Text>
              <Text style={styles.itemCode}>Rp.{item.product_price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      }
      
    </>
  );
};

export default MainCatalogScreen;

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    // height: 180,
  },
  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: 'black',
  },
  sorting: {
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 10,
  },
  textSorting: {
    fontSize: 18,
  },
});
