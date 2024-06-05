import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from '../redux/actions/index'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Feed from './main/Feed'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaskedView from '@react-native-community/masked-view'
import Profile from './main/Profile'
import MapTwo from './main/MapTwo'
import Search from './main/Search'
import MapThree from './main/MapThreeAR'
import { app, auth } from '../database/firebase';



const Tab = createMaterialBottomTabNavigator();

const EmptyScr = () => {
  return(null)
}

export class Main extends Component {

render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}>
      <Tab.Navigator  initialRouteName='Feed'
      labeled={false}
      headerShown={false}
      barStyle={{
        backgroundColor: "white",
      }} >
        <Tab.Screen name="Feed" component={Feed} options={
          {tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )}}/>
        <Tab.Screen name="Search" component={Search} navigation={this.props.navigation} 
        options={
          {title: "Search", 
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
      )}} />

      <Tab.Screen name="MapTwo" component={MapTwo} 
        options={
          {title: "MapTwo",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="map-legend" color={color} size={26} />
      )}} />
      {/* <Tab.Screen name="MapThree" component={MapThree} 
        options={
          {title: "MapThree",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="map-legend" color={color} size={26} />
      )}} /> */}
        <Tab.Screen name="Profile" component={Profile} 
            listeners={({ navigation }) => ({
              tabPress: event => {
                event.preventDefault();
                navigation.navigate("Profile", {uid: auth.currentUser.uid})
              }
            })}
          options={{tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account-circle" color={["#0069CD"]} size={26} />
          )}}/>
      </Tab.Navigator>
      </View>
    )
  }
}

export default Main;

const styles=StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    shadowOffset: {
      width: 0,
      height: -5,
        },
        elevation: 5
      },
      

})