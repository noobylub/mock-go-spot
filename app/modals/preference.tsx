import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';

const categoriesData = {
  'American': ['American', 'New American', 'Southern', 'Soul Food', 'Cajun/Creole', 'Tex-Mex'],
  'Asian': ['Chinese', 'Japanese', 'Korean', 'Thai', 'Vietnamese', 'Indian', 'Pakistani', 'Bangladeshi', 'Taiwanese', 'Filipino', 'Malaysian', 'Indonesian', 'Singaporean', 'Burmese', 'Cambodian', 'Laotian', 'Mongolian', 'Nepalese', 'Sri Lankan', 'Asian Fusion'],
  'European': ['Italian', 'French', 'Spanish', 'German', 'Greek', 'British', 'Irish', 'Scottish', 'Polish', 'Russian', 'Ukrainian', 'Hungarian', 'Czech', 'Austrian', 'Belgian', 'Dutch', 'Swiss', 'Scandinavian', 'Portuguese'],
  'Latin American': ['Mexican', 'Brazilian', 'Peruvian', 'Argentine', 'Colombian', 'Venezuelan', 'Cuban', 'Puerto Rican', 'Dominican', 'Salvadoran', 'Honduran', 'Nicaraguan', 'Guatemalan', 'Ecuadorian', 'Bolivian', 'Chilean'],
  'Middle Eastern': ['Lebanese', 'Turkish', 'Persian/Iranian', 'Israeli', 'Moroccan', 'Egyptian', 'Syrian', 'Armenian', 'Afghan', 'Iraqi', 'Uzbek', 'Georgian'],
  'African': ['Ethiopian', 'Nigerian', 'Ghanaian', 'Senegalese', 'South African', 'Eritrean', 'Somali', 'Kenyan', 'Tanzanian', 'Ugandan'],
  'Seafood': ['Seafood', 'Sushi Bars', 'Fish & Chips', 'Poke'],
  'Fast Food': ['Fast Food', 'Burgers', 'Pizza', 'Sandwiches', 'Hot Dogs', 'Chicken Wings'],
  'Vegetarian and Vegan': ['Vegetarian', 'Vegan', 'Raw Food'],
  'Breakfast and Brunch': ['Breakfast & Brunch', 'Pancakes', 'Waffles', 'Bagels', 'Donuts'],
  'Bakeries and Desserts': ['Bakeries', 'Desserts', 'Ice Cream & Frozen Yogurt', 'Cupcakes', 'Patisserie/Cake Shop', 'Gelato'],
  'Cafes and Coffee Shops': ['Cafes', 'Coffee & Tea', 'Bubble Tea'],
  'Bars and Pubs': ['Bars', 'Pubs', 'Sports Bars', 'Wine Bars', 'Beer Gardens', 'Cocktail Bars', 'Dive Bars', 'Hookah Bars'],
  'Specialty Food': ['Cheese Shops', 'Butcher', 'Farmers Market', 'Specialty Food', 'Organic Stores', 'Health Markets'],
  'Food Trucks and Stands': ['Food Trucks', 'Food Stands', 'Street Vendors'],
  'Grocery': ['Grocery', 'International Grocery', 'Convenience Stores'],
  'Nightlife': ['Nightlife', 'Dance Clubs', 'Karaoke', 'Comedy Clubs', 'Jazz & Blues'],
  'Arts and Entertainment': ['Museums', 'Art Galleries', 'Performing Arts', 'Music Venues', 'Theaters', 'Cinema'],
  'Outdoor Activities': ['Parks', 'Beaches', 'Hiking', 'Botanical Gardens', 'Playgrounds', 'Dog Parks'],
  'Fitness and Sports': ['Gyms', 'Yoga', 'Martial Arts', 'Swimming Pools', 'Tennis', 'Basketball Courts', 'Soccer'],
  'Shopping': ['Shopping Centers', 'Clothing', 'Shoes', 'Jewelry', 'Books', 'Electronics', 'Home & Garden'],
  'Beauty and Spas': ['Hair Salons', 'Nail Salons', 'Day Spas', 'Massage'],
  'Hotels and Accommodation': ['Hotels', 'Hostels', 'Bed & Breakfast'],
  'Event Planning and Services': ['Wedding Planning', 'Party & Event Planning', 'Caterers', 'Photographers'],
  'Automotive': ['Car Dealers', 'Auto Repair', 'Car Wash', 'Gas Stations'],
  'Professional Services': ['Lawyers', 'Accountants', 'Real Estate', 'Insurance'],
  'Education': ['Schools', 'Colleges', 'Tutoring', 'Cooking Classes', 'Art Schools'],
  'Pets': ['Pet Stores', 'Veterinarians', 'Pet Groomers', 'Dog Walkers'],
  'Religious Organizations': ['Churches', 'Mosques', 'Synagogues', 'Temples'],
  'Other': []
};

const ModalScreen = () => {
  const [price, setPrice] = useState('$$');
  const [categories, setCategories] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 39.9526, lng: 75.1652 });

  useEffect(() => {
    const fetchPreferences = async () => {
      const data = await AsyncStorage.getItem('general_preferences');
      if (data) {
        const preferences = JSON.parse(data);
        setPrice(preferences.price);
        setCategories(preferences.categories);
        setCoordinates(preferences.coordinates);
      }
    };

    fetchPreferences();
  }, []);

  const savePreferences = async () => {
    const preferences = {
      price,
      categories,
      coordinates,
    };
    await AsyncStorage.setItem('general_preferences', JSON.stringify(preferences));
    Alert.alert('Preferences saved');
  };

  const allCategories = [];
  for (const [key, values] of Object.entries(categoriesData)) {
    for (const value of values) {
      allCategories.push({ id: value, name: value });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Preferences</Text>
      <View style={styles.separator} />

      <Text style={styles.label}>Price</Text>
      <RNPickerSelect
        onValueChange={(value) => setPrice(value)}
        items={[
          { label: '$', value: '$' },
          { label: '$$', value: '$$' },
          { label: '$$$', value: '$$$' },
          { label: '$$$$', value: '$$$$' },
        ]}
        value={price}
        style={pickerSelectStyles}
      />

      <Text style={styles.label}>Categories</Text>
      <MultiSelect
        items={allCategories}
        uniqueKey="id"
        onSelectedItemsChange={(selectedItems) => setCategories(selectedItems)}
        selectedItems={categories}
        selectText="Pick Categories"
        searchInputPlaceholderText="Search Categories..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#48d22b"
        submitButtonText="Submit"
      />

      <Text style={styles.label}>Coordinates</Text>
      <View style={styles.coordinatesContainer}>
        <TextInput
          style={styles.coordinateInput}
          value={coordinates.lat.toString()}
          onChangeText={(text) => setCoordinates({ ...coordinates, lat: parseFloat(text) })}
          placeholder="Latitude"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.coordinateInput}
          value={coordinates.lng.toString()}
          onChangeText={(text) => setCoordinates({ ...coordinates, lng: parseFloat(text) })}
          placeholder="Longitude"
          keyboardType="numeric"
        />
      </View>

      <Button title="Save Preferences" onPress={savePreferences} />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
    backgroundColor: '#eee',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  coordinatesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  coordinateInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    color: 'black',
  },
  inputAndroid: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    color: 'black',
  },
});

export default ModalScreen;
