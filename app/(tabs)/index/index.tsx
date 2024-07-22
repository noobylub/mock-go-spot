import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Button } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Card from './card.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial batch of cards
const initialCards = [
  {
    image: 'https://s3-media1.fl.yelpcdn.com/bphoto/Jo9jBP5y6G_bG_g3H31fiw/o.jpg',
    title: 'Title 1',
    description: 'This is the description for card 1.',
    details: 'Additional details for card 1.',
  },
  {
    image: 'https://s3-media1.fl.yelpcdn.com/bphoto/Jo9jBP5y6G_bG_g3H31fiw/o.jpg',
    title: 'Title 2',
    description: 'This is the description for card 2.',
    details: 'Additional details for card 2.',
  },
];

// Simulate fetching new cards from a database
// We would also get the user's preferences 
const fetchNewCards = () => [
  {
    image: 'https://s3-media1.fl.yelpcdn.com/bphoto/Jo9jBP5y6G_bG_g3H31fiw/o.jpg',
    title: 'Title 3',
    description: 'This is the description for card 3.This is the description for card 3.This is the description for card 3.This is the description for card 3.This is the description for card 3.This is the description for card 3.This is the description for card 3.This is the description for card 3.This is the description for card 3.This is the description for card 3.This is the description for card 3.This is the description for card 3.',
    details: 'Additional details for card 3.',
  },
  {
    image: 'https://s3-media1.fl.yelpcdn.com/bphoto/Jo9jBP5y6G_bG_g3H31fiw/o.jpg',
    title: 'Title 4',
    description: 'This is the description for card 4.',
    details: 'Additional details for card 4.',
  },
  {
    image: 'https://s3-media1.fl.yelpcdn.com/bphoto/Jo9jBP5y6G_bG_g3H31fiw/o.jpg',
    title: 'Title 5',
    description: 'This is the description for card 5.',
    details: 'Additional details for card 5.',
  },
  {
    image: 'https://s3-media1.fl.yelpcdn.com/bphoto/Jo9jBP5y6G_bG_g3H31fiw/o.jpg',
    title: 'Title 3',
    description: 'This is the description for card 3.',
    details: 'Additional details for card 3.',
  },
  {
    image: 'https://s3-media1.fl.yelpcdn.com/bphoto/Jo9jBP5y6G_bG_g3H31fiw/o.jpg',
    title: 'Title 4',
    description: 'This is the description for card 4.',
    details: 'Additional details for card 4.',
  },
  {
    image: 'https://s3-media1.fl.yelpcdn.com/bphoto/Jo9jBP5y6G_bG_g3H31fiw/o.jpg',
    title: 'Title 5',
    description: 'This is the description for card 5.',
    details: 'Additional details for card 5.',
  },
];

const App = () => {
  const [cards, setCards] = useState(initialCards);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [swiperKey, setSwiperKey] = useState(0);
  const [swipeData, setSwipeData] = useState([]);

  useEffect(() => {
    if (elapsedTime !== null) {
      console.log(`Time taken to swipe: ${elapsedTime}ms`);
    }
  }, [elapsedTime]);

  useEffect(() => {
    setStartTime(Date.now());
  }, [cardIndex]);

  const handleCardSwipe = async (index, direction) => {
    const endTime = Date.now();
    let duration = endTime - startTime;
    if(duration > 10000){
      duration = 10000
    }
    setElapsedTime(duration);

    const swipedCard = cards[index];
    const newSwipeData = {
      card: swipedCard,
      duration,
      direction,
    };
    const updatedSwipeData = [...swipeData, newSwipeData];
    setSwipeData(updatedSwipeData);
    await AsyncStorage.setItem('swipeData', JSON.stringify(updatedSwipeData));

    setCardIndex((prevIndex) => prevIndex + 1);
  };

  const handleSwipedAll = async () => {
    console.log('All cards swiped');
    await recordSwipeActivity();
    const newCards = fetchNewCards();
    setCards(newCards);
    setCardIndex(0);
    setSwiperKey((prevKey) => prevKey + 1);
    setElapsedTime(null); // Reset elapsed time when new cards are fetched
  };

  const handleRefresh = async () => {
    console.log('Fetching new data...');
    await recordSwipeActivity();
    const newCards = fetchNewCards();
    setCards(newCards);
    setCardIndex(0);
    setSwiperKey((prevKey) => prevKey + 1);
    setElapsedTime(null); // Reset elapsed time when new cards are fetched
  };

  const recordSwipeActivity = async () => {
    setSwipeData([]);
    await AsyncStorage.setItem('swipeData', JSON.stringify([]));
  };

  return (
    <View style={styles.container}>
      <Swiper
        key={swiperKey}
        cards={cards}
        renderCard={(card) => <Card data={card} />}
        onSwipedLeft={(index) => handleCardSwipe(index, 'left')}
        onSwipedRight={(index) => handleCardSwipe(index, 'right')}
        onSwipedAll={handleSwipedAll}
        cardIndex={cardIndex}
        backgroundColor={'#4FD0E9'}
        stackSize={3}
        containerStyle={styles.swiperContainer}
      />
      {elapsedTime !== null && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>Time taken: {elapsedTime}ms</Text>
        </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -Dimensions.get('window').width * 0.5 }],
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  timerText: {
    fontSize: 16,
    color: 'white',
  },
  refreshContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});

export default App;
