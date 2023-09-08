import { ImageBackground, ScrollView, Text, View } from "react-native";
import styles from "./styles";
import Container from "./components/Container";
import {useState,useEffect} from 'react'
import axios from "axios";

const path = require('./assets/pic.jpg');
const background = require('./assets/wallpaper.jpg');

const data = [
  {title: 'Title', subtitle1: 'Subtitle1', subtitle2: 'Subtitle2', image: path},
  {title: 'Title', subtitle1: 'Subtitle1', subtitle2: 'Subtitle2', image: path},
  {title: 'Title', subtitle1: 'Subtitle1', subtitle2: 'Subtitle2', image: path},
  {title: 'Title', subtitle1: 'Subtitle1', subtitle2: 'Subtitle2', image: path},
  {title: 'Title', subtitle1: 'Subtitle1', subtitle2: 'Subtitle2', image: path},
  {title: 'Title', subtitle1: 'Subtitle1', subtitle2: 'Subtitle2', image: path},
]; //dummy data

function RickAndMortyHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Rick and Morty</Text>
    </View>
  );
}




const App = () => {
  const [titles, setTitles] = useState<Array<string>>([]);
 
  async function getData(endPoint: string): Promise<any> {
    return axios.get(`https://rickandmortyapi.com/api/`+endPoint)
      .then(response => { return response.data.results })
      .catch(error => { console.log("error"); return [] });
  }

  useEffect(() => {
    async function loadTitles() {
      const response = await getData('character');

      const newTitles: string[] = [];
      for (const character of response) {
        if (character && character.name) {
          newTitles.push(character.name);
        } else {
          newTitles.push('Error');
        }
      }
      setTitles(newTitles);
    }
    
    loadTitles();
  }, []); 

  return (
    <View style={styles.container}>
      <RickAndMortyHeader />
      <ImageBackground source={background} style={styles.imageBackground}>
        <ScrollView>
          {
            data.map((item, index) => (
              <Container
                key={index}
                title={titles[index] || 'Loading...'}
                subtitle1={item.subtitle1}
                subtitle2={item.subtitle2}
                image={item.image}
              />
            ))
          }
        </ScrollView>
      </ImageBackground>
    </View>
  );
}






export default App;
