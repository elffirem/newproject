import { ImageBackground, ScrollView, Text, View } from 'react-native';
import styles from './styles';
import Container from './components/Container';
import { useState, useEffect } from 'react';
import axios from 'axios';

const path = require('./assets/pic.jpg');
const background = require('./assets/wallpaper.jpg');

const data = Array(6).fill(
  { title: 'Title', subtitle1: 'Subtitle1', subtitle2: 'Subtitle2', image: path }); //dummy data

function RickAndMortyHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Rick and Morty</Text>
    </View>
  );
}

const App = () => {
  const [names, setNames] = useState([]);
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  async function getData(endpoint:string) {
    try {
      console.log("haaalo")
      const response = await axios.get(`https://rickandmortyapi.com/api/${endpoint}`);
      console.log("helo")
      return response.data.results;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}: `, error);
      return [];
    }
  }

  useEffect(() => {
    const loadDataSequentially = async () => {
      const characterData = await getData('character');
      const locationData = await getData('location');
      const episodeData = await getData('episode');
  
      setNames(characterData.map((item:any) => item?.name || 'Error'));
      setLocations(locationData.map((item:any) => item?.name || 'Error'));
      setEpisodes(episodeData.map((item:any) => item?.name || 'Error'));
    };

    loadDataSequentially();
  }, []);

  return (
    <View style={styles.container}>
      <RickAndMortyHeader />
      <ImageBackground source={background} style={styles.imageBackground}>
        <ScrollView>
          {data.map((item, index) => (
            <Container
              key={index}
              title={names[index] || 'Loading...'}
              subtitle1={locations[index] || 'Loading...'}
              subtitle2={episodes[index] || 'Loading...'}
              image={item.image}
            />
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default App;
