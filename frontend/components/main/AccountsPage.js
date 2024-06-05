import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

function Accounts () {
    navigator = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Accounts</Text>
        <View />
      </View>
      <TouchableOpacity style={styles.item} onPress={() => navigator.navigate("Edit Profile")}>
        <Ionicons name="md-person" size={24} color="black" />
        <Text style={styles.itemText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => navigator.navigate("Business Information")}>
        <Ionicons name="md-business" size={24} color="black" />
        <Text style={styles.itemText}>Business Information</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="md-notifications" size={24} color="black" />
        <Text style={styles.itemText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialIcons name="block" size={24} color="black" />
        <Text style={styles.itemText}>Blocked Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialIcons name="volume-off" size={24} color="black" />
        <Text style={styles.itemText}>Muted Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialIcons name="lock" size={24} color="black" />
        <Text style={styles.itemText}>Disable Your Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialIcons name="delete" size={24} color="black" />
        <Text style={styles.itemText}>Delete Your Account</Text>
      </TouchableOpacity>
      <StatusBar style="light" />
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

export default Accounts;