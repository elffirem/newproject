import { Image, Text, View } from "react-native";
import styles from "../styles";



interface Props {
  image: any;
  title: string;
  subtitle1: string;
  subtitle2: string;
}

const Container = ({image, title, subtitle1, subtitle2}: Props) => {
  return (
    <View style={styles.rowContainer}>
      <Image style={styles.image} source={image}></Image>
      <View style={styles.columnContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle1}</Text>
        <Text style={styles.subtitle}>{subtitle2}</Text>
      </View>
    </View>
  );
};

export default Container;