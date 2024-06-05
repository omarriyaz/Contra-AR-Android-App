
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchUserSessionsInfo } from '../../redux/slice/getNoSessions';
import { useNavigation } from '@react-navigation/native';

const DATA = [
  { id: '1', title: 'Session log 1' },
  { id: '2', title: 'Session log 2' },
  { id: '3', title: 'Session log 3' },
];

const SessionScreen = () => {
    const navigator = useNavigation();
    const [numItems, setNumItems] = useState(0);
    const [refreshing, setRefresh] = useState(false);
    const sessions = useSelector((state) => state.Sessions.Sessions)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserSessionsInfo()).then(() => console.log(sessions));
        console.log(sessions.Open)
        setNumItems(sessions.Open)
        setRefresh(false)
    }, [sessions.Open == 0, refreshing == true,])

    const data = Array.from({ length: numItems }, (_, index) => ({
        id: index,
        text: 'Item ' + (index + 1),
      }));
//
  const renderSession = ({ item }) => (
    <View style={styles.sessionContainer}>
      <Text></Text>
      <Feather name="smartphone" size={80} color="white" />
      <Text></Text>
      <Text style={styles.sessionText}>Session Log</Text>
      <Text></Text>
      <Text style={styles.sessionText}>Device Type: Android</Text>
      <Text></Text>
      <Text style={styles.sessionText}>     Location: United Arab Emirates     </Text>
      <Text></Text>
    </View>
  );//

  const handleRefresh = () => {
    setRefresh(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
        <View />
      </View>
      <View style={styles.containerTwo}>
      <Text style={styles.title}>Open Sessions</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSession}
        refreshing={refreshing} 
        onRefresh={handleRefresh}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6D2177',
  },
  containerTwo: {
    flex: 1,
    backgroundColor: '#6D2177',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'purple',
    padding: 20,
    paddingTop: 35
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  sessionContainer: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  sessionText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default SessionScreen;