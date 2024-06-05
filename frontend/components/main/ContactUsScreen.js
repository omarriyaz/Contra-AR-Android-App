import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  StyleSheet,
  Linking 
} from 'react-native';
import { Ionicons, FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ContactUsScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigator = useNavigation();
  const handleSend = () => {
    console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    // You can use a package like react-native-mail to send the email
  }

  return (
    <ScrollView style={styles.container}>
      <AntDesign name="closecircleo" size={22} color="black" style={{marginRight: "10%"}} onPress={() => navigator.navigate("Help")} />
      <Text style={styles.title}>Contact Information</Text>
      <Text>Contact the team at irlcontra@gmail.com. Follow our social media links</Text>
      <Text> </Text>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <Ionicons name="globe" size={30} color="purple" style={{paddingRight: "5%"}} onPress={() => Linking.openURL('https://irlcontra.wixsite.com/irlinfo')}/>
        <FontAwesome name="facebook-square" size={30} color="black" style={{paddingRight: "5%"}} onPress={() => Linking.openURL('https://www.facebook.com/people/IR-Labs/pfbid0zLsvuytsui94fkMZowYwXr7FA7eYJXvjKeRwoe3Wnif31K7CXfNSH39gxfGLSV6l/')}/>
        <FontAwesome name="youtube-square" size={30} color="red" style={{paddingRight: "5%"}} onPress={() => Linking.openURL('https://www.youtube.com/channel/UCtMdByZPTjte8cPtxM5qCFA')}/>
        <FontAwesome name="linkedin-square" size={30} color="blue" onPress={() => Linking.openURL('https://www.linkedin.com/in/illusion-reality-labs-35a123264/')}/>
      </View>

      <Text style={styles.title}>Log Ticket</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder= "Preferred Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.messageInput}
          placeholder="Message"
          multiline
          numberOfLines={4}
          onChangeText={(text) => setMessage(text)}
          value={message}
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    color: '#6A5ACD'
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    fontSize: 16,
    color: '#333333'
  },
  messageInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    fontSize: 16,
    color: '#333333',
    height: 100
  },
  button: {
    backgroundColor: '#6A5ACD',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ContactUsScreen;