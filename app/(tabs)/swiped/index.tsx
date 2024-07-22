import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const truncateText = (text, limit) => {
  if (text.length <= limit) return text;
  return `${text.substring(0, limit)}...`;
};

const SwipeDataScreen = () => {
  const [swipeData, setSwipeData] = useState([]);

  const fetchSwipeData = async () => {
    const data = await AsyncStorage.getItem('swipeData');
    if (data) {
      setSwipeData(JSON.parse(data));
    }
  };

  useEffect(() => {
    fetchSwipeData();
  }, []);

  const clearSwipeData = async () => {
    await AsyncStorage.setItem('swipeData', JSON.stringify([]));
    setSwipeData([]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.card.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.card.title}</Text>
        <Text style={styles.description}>{truncateText(item.card.description, 50)}</Text>
        <Text style={styles.swipeInfo}>Swiped {item.direction} in {item.duration}ms</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {swipeData.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No swipes yet!</Text>
        </View>
      ) : (
        <FlatList
          data={swipeData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <View style={styles.refreshContainer}>
        <Button title="Refresh Data" onPress={fetchSwipeData} />
        <Button title="Clear Data" onPress={clearSwipeData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 20,
    color: '#555',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  swipeInfo: {
    fontSize: 12,
    color: '#777',
  },
  refreshContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SwipeDataScreen;
