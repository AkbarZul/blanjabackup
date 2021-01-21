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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {colors} from '../../utils';
import ActionSheet from 'react-native-actions-sheet';
import Iconn from 'react-native-vector-icons/Ionicons';

const BASE_URL = 'http://192.168.1.3:9005';
const actionSheetRef = createRef();

export default function CatalogScreen({navigation, route}) {
  let actionSheet;
  const {
    itemId,
    itemIdPopular,
    itemIdNewest,
    itemIdPriceLowToHigh,
    itemIdPriceHighToLow,
    categories,
  } = route.params;
  const [products, setProducts] = useState([]);

  const getProduct = async (itemId) => {
    await axios
      // .get(BASE_URL + `/categories/` + itemId)
      .get(BASE_URL + `/categories/${itemId}?keyword=created_at desc`)
      .then((res) => {
        const products = res.data.data.product;
        console.log('Datss', res.data.data.product);
        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sortByPopular = async (itemIdPopular) => {
    await axios
      .get(BASE_URL + `/categories/${itemIdPopular}?keyword=rating DESC`)
      .then((res) => {
        const popularData = res.data.data.product;
        console.log('ANJIM ', popularData);
        setProducts(popularData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sortByNewest = async (itemIdNewest) => {
    await axios
      .get(BASE_URL + `/categories/${itemIdNewest}?keyword=created_at`)
      .then((res) => {
        const newestData = res.data.data.product;
        setProducts(newestData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sortByPriceLowToHigh = async (itemIdPriceLowToHigh) => {
    await axios
      .get(
        BASE_URL +
          `/categories/${itemIdPriceLowToHigh}?keyword=product_price ASC`,
      )
      .then((res) => {
        const priceLowToHighData = res.data.data.product;
        setProducts(priceLowToHighData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sortByPriceHighToLow = async (itemIdPriceHighToLow) => {
    await axios
      .get(
        BASE_URL +
          `/categories/${itemIdPriceHighToLow}?keyword=product_price DESC`,
      )
      .then((res) => {
        const priceHighToLowData = res.data.data.product;
        console.log('price hi lo', priceHighToLowData);
        setProducts(priceHighToLowData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log('testsort', price);

  useEffect(() => {
    // code to run on component mount
    console.log('test', itemId);
    getProduct(itemId);
    // sortByPopular(itemId);
    // sortByNewest(itemId);
    // sortByPriceLowToHigh(itemId);
    // sortByPriceHighToLow();
  }, [itemId, itemIdPopular, itemIdNewest, itemIdPriceLowToHigh, itemIdPriceHighToLow]);

  return (
    <>
      <View
        style={{
          backgroundColor: '#F9F9F9',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Iconn name="filter" size={25} />
          <Text>Filters</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: -35,
            }}
            onPress={() => {
              actionSheetRef.current?.setModalVisible();
            }}>
            <Image source={require('../../assets/images/sort.png')} />
            <Text style={{marginLeft: 5}}>Prices</Text>
          </TouchableOpacity>
          {/* <Icon name="filter" size={25} /> */}
        </View>
        <View style={{alignItems: 'center'}}>
          <Iconn name="apps-sharp" size={25} />
        </View>
      </View>

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

      <ActionSheet gestureEnabled ref={actionSheetRef}>
        <View style={{justifyContent: 'center'}}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>
              Sort By
            </Text>
          </View>
          <TouchableOpacity
            style={styles.sorting}
            onPress={() => {
              sortByPopular(itemId);
            }}>
            <Text style={styles.textSorting}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sorting} onPress={() => {
              sortByNewest(itemId)}}>
            <Text style={styles.textSorting}>Newest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sorting}>
            <Text style={styles.textSorting}>Customer review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sorting} onPress={() => {
            sortByPriceLowToHigh(itemId)}}>
            <Text style={styles.textSorting}>Price: lowest to high</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sorting} onPress={() => {
            sortByPriceHighToLow(itemId)}}>
            <Text style={styles.textSorting}>Price: highest to low</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </>
  );
}

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
