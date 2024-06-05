import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Theme () {
    navigator = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Theme</Text>
        <View />
      </View>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="md-square" size={32} color="#007AFF" />
        <Text style={styles.itemText}>Primary</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons name="circle" size={32} color="#FF9500" />
        <Text style={styles.itemText}>Secondary</Text>
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

export default Theme;