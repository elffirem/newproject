import { StyleSheet } from 'react-native';
import appConfig from './appConfig.json'


const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      backgroundColor: appConfig.backgroundColor,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
    },
    container: {
      flex: 1,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:'lightgrey',
      borderRadius: 20,
      padding: 16,
      margin: 16,
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 16,
      borderRadius: 10,
    },
    columnContainer: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: 'gray',
    },
    imageBackground: {
      flex: 1, // Take the full available space
      resizeMode: 'cover', // Cover the entire background
    },
  });

export default styles;