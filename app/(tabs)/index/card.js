import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const truncateText = (text, limit) => {
  if (text.length <= limit) return text;
  return `${text.substring(0, limit)}...`;
};

const Card = ({ data }) => {
  const descriptionLimit = 100;
  return (
    <View style={styles.card}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{truncateText(data.description, descriptionLimit)}</Text>
        <Text style={styles.details}>{data.details}</Text>
      </View>
      <Link
        href={`/modals/more-info?title=${data.title}&description=${data.description}&details=${data.details}&image=${data.image}`}
        asChild
      >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>More Info</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.75,
    transform: [{ translateY: -Dimensions.get('window').width * 0.15 }],
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  textContainer: {
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20, // Added to limit the width of the text container
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  description: {
    fontSize: 18,
    color: 'white',
    marginTop: 5, // Adjusted for better spacing
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  details: {
    fontSize: 14,
    color: 'white',
    marginTop: 5, // Adjusted for better spacing
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#4FD0E9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Card;
