import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    marginBottom: 20,
  },
});

function FAQ () {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>What is this app?</Text>
      <Text style={styles.answer}>This app is a social media platform for sharing photos and connecting with friends and family.</Text>

      <Text style={styles.question}>How do I create an account?</Text>
      <Text style={styles.answer}>To create an account, simply download the app and follow the on-screen instructions to sign up.</Text>

      <Text style={styles.question}>How do I add friends?</Text>
      <Text style={styles.answer}>You can search for friends using their username or email address. Once you find them, you can send them a friend request and wait for them to accept.</Text>

      <Text style={styles.question}>Is this app free?</Text>
      <Text style={styles.answer}>Yes, the app is free to download and use. However, there may be in-app purchases for additional features.</Text>
    </View>
  );
};

export default FAQ;