import React, { createContext, useState, useContext } from 'react';

const RefreshContext = createContext();

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

const fetchNewCards = () => [
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

export const RefreshProvider = ({ children }) => {
  const [cards, setCards] = useState(initialCards);

  const handleRefresh = () => {
    const newCards = fetchNewCards();
    setCards(newCards);
  };

  return (
    <RefreshContext.Provider value={{ cards, handleRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => useContext(RefreshContext);
