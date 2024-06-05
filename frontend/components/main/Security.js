import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

function Security () {
    navigator = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Security</Text>
        <View />
      </View>
      <TouchableOpacity style={styles.item} onPress={() => navigator.navigate("ChangeAuth")}>
        <MaterialIcons name="vpn-key" size={24} color="black" />
        <Text style={styles.itemText}>Authentication Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => navigator.navigate("LoginLogs")}>
        <MaterialIcons name="login" size={24} color="black" />
        <Text style={styles.itemText}>Login Activity</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => navigator.navigate("Sessions")}>
        <MaterialIcons name="time-to-leave" size={24} color="black" />
        <Text style={styles.itemText}>Sessions</Text>
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

export default Security;