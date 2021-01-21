import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
} from 'react-native';

const ShopScreen = ({navigation}) => {
  const BASE_URL = 'http://192.168.1.3:9005';
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getDataCategory();
  }, []);

  const getDataCategory = () => {
    axios
      .get(BASE_URL + '/categories')
      .then((res) => {
        const category = res.data.data;
        console.log('Category', category);
        setCategory(category);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={{color: 'white'}}>VIEW ALL ITEMS</Text>
        </TouchableOpacity>
        <Text style={{color: 'grey', fontSize: 16, marginTop: 30}}>
          Choose Category
        </Text>
        {category.map(({id_categories, category_name, category_photo, id}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Cataloge', {
                  itemId: id_categories,
                  categories: category_name,
                })
              }
              key={id_categories}>
              <View style={styles.garis}>
                <View>
                  <Text style={{fontSize: 16, marginLeft: 30}}>
                    {category_name}
                  </Text>
                </View>
                <View>
                  <Image
                    source={{uri: `${category_photo}`}}
                    style={{borderRadius: 10, width: 120, height: 100}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Button title="Search" onPress={() => navigation.navigate('Search')}/>
    </>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 15,
    marginBottom: 20
  },

  button: {
    width: '100%',
    height: 48,
    backgroundColor: 'red',
    // color: 'white',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 20,
  },

  garis: {
    backgroundColor: '#ffffff',
    elevation: 10,
    marginTop: 10,
    width: '100%',
    height: 104,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // justifyContent: 'space-between',
  },
});
