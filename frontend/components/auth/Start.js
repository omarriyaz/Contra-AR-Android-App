// import React from 'react';
// import { Text, View, Button} from 'react-native';

// export default function Start({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center'}}>
//         <Button title="Registration" onPress={() => navigation.navigate("Registration")}/>
//         <Button title="Login" onPress={() => navigation.navigate("Login")}/>
//     </View>
//   )
// }
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Welcome to Contra',
    text: 'Stay connected, Stay social, Connecting people worldwide',
    image: require('../../assets/splash.png'),
    backImage: require('../../assets/loading.png')
  },
  {
    key: '2',
    title: 'Explore Our Features',
    text: 'Bring your memories to life with our AR-powered social scrapbooking app. Where reality meets imagination!',
    image: require('../../assets/splash.png'),
    backImage: require('../../assets/loading2.png')
  },
  {
    key: '3',
    title: 'Get Started Now',
    text: 'Immerse Yourself Now',
    image: require('../../assets/splash.png'),
    backImage: require('../../assets/loading3.png')
  },
];

const Start = () => {
  const navigator = useNavigation();
  const handleCreatePost = () => {

  }

  const renderItem = ({ item }) => {
    return (
      <ImageBackground source={item.backImage} resizeMode="cover" style={styles.imageTwo}>
      <View style={styles.slide}>
        {/* <Image source={item.image} style={styles.image} /> */}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        {item.key != 3 ? (<View style={{paddingTop: 20}}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {navigator.navigate("Registration")}}>
      <Text style={styles.buttonText}>Skip</Text>
    </TouchableOpacity></View>) : (null)}

        {item.key == 3 ? (<View style={{paddingTop: 20}}><TouchableOpacity style={styles.buttonContainer} onPress={() => {navigator.navigate("Login")}}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {navigator.navigate("Registration")}}>
      <Text style={styles.buttonText}>Sign up</Text>
    </TouchableOpacity></View>) : (null)}
      </View>
      </ImageBackground>
    );
  };

  return (
    <View style={styles.container}>
      
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  slide: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 290,
  },
  text: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  imageTwo: {
    flex: 1,
    justifyContent: "center"
},
buttonContainer: {
  backgroundColor: 'black',
  borderRadius: 4,
  padding: 16,
  alignItems: 'center',
  marginTop: 16,
  width: 300
},
buttonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16
},
});

export default Start;