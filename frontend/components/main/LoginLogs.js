import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchUsersLogInfo } from '../../redux/slice/userLogsSlice';
import { StatusBar } from 'expo-status-bar';

export default function LoginActivityScreen  ()  {
  const [loginLogs, setLoginLogs] = useState([]);
  const [refreshing, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const userLogs = useSelector((state) => state.usersLogInfo.usersLogInfo)
  useEffect(() => {
        dispatch(fetchUsersLogInfo()).then(() => {
              console.log("HI",userLogs.Logs);
              setLoginLogs(userLogs.Logs);
              setRefresh(false);
            })
      
  },[refreshing==true,])

  const handleRefresh = () => {
    setRefresh(true);
  }

  const navigator = useNavigation();
  const renderLogItem = ({ item }) => {
    const statusColor = item.status === 'Success' ? '#50C878' : '#FF5A5F';
    console.log("ITEMMM",item.Time.toDate().getMonth())
    const time = item.Time.toDate();
    const day = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    console.log("TIMMMMEEE", day)
    return (
      <View style={styles.logContainer}>
        <View style={styles.logIconContainer}>
          <FontAwesome5 name={item.status === 'Success' ? "unlock" : "lock"} size={24} color={statusColor} />
        </View>
        <View style={styles.logDetailsContainer}>
          <Text style={styles.logDateText}>{day}/{month}/{year}</Text>
          <Text style={styles.logTimeText}>{hour}:{minute}:{second}</Text>
          <View style={[styles.logStatusContainer, { backgroundColor: statusColor , borderBottomRightRadius: 7}]}>
            <MaterialCommunityIcons
              name={item.status === 'Success' ? 'check-circle-outline' : 'close-circle-outline'}
              size={24}
              color="#FFFFFF"
            />
            <Text style={styles.logStatusText}>{item.status}</Text>
          </View>
        </View>
        <StatusBar style="light" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Login Activity</Text>
        <View />
      {/* <View style={styles.headerContainer}>
      <Ionicons name="ios-arrow-back" size={24} color="white" style={{paddingRight: 10}} onPress={() => navigator.goBack()} />
        <Text style={styles.headerText}>Login Activity</Text>
  <MaterialCommunityIcons name="history" size={32} color="#FFFFFF" style={{paddingLeft: 10}} /> */}
      </View> 
      <FlatList
        data={loginLogs}
        renderItem={renderLogItem}
        contentContainerStyle={styles.logsContainer}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing} onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'purple',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  logsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  logContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    borderWidth: 1
  },
  logIconContainer: {
    backgroundColor: '#6A5ACD',
    borderRadius: 8,
    padding: 10,
    marginLeft: 15,
  },
  logDetailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  logStatusContainer: {
    flexDirection: "row",
    padding: 5
  },
  logStatusText: {
    paddingLeft: 5,
    paddingTop: 3,
    color: "white"
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
})

