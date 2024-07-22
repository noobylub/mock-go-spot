import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SwipeDataScreen = () => {
  const [swipeData, setSwipeData] = useState([]);

  useEffect(() => {
    const fetchSwipeData = async () => {
      const data = await AsyncStorage.getItem('swipeData');
      if (data) {
        setSwipeData(JSON.parse(data));
      }
    };

    fetchSwipeData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.card.title}</Text>
      <Text style={styles.description}>Swiped {item.direction}</Text>
      <Text style={styles.details}>Duration: {item.duration}ms</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={swipeData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  card: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  details: {
    fontSize: 14,
    color: '#777',
  },
});

export default SwipeDataScreen;
