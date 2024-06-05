import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Help () {
    navigator = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Help</Text>
        <View />
      </View>
      <TouchableOpacity style={styles.item} onPress={()=> navigator.navigate("ContactUsScreen")} >
        <MaterialIcons name="contact-mail" size={24} color="black" />
        <Text style={styles.itemText}>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={()=> navigator.navigate("FAQs")}>
        <MaterialIcons name="help-outline" size={24} color="black" />
        <Text style={styles.itemText}>FAQ's</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'purple',
    padding: 20,
    paddingTop: 35
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemText: {
    marginLeft: 20,
    fontSize: 16,
  },
});

export default Help;