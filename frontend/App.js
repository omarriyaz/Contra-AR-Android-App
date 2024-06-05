import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './components/auth/Start';
import Registration from './components/auth/Registration';
import {auth, app} from './database/firebase';
// import * as firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {View,Text} from 'react-native'
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import Main from './components/Main';
import Login from './components/auth/Login'
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordEmailSent from './components/auth/ForgotPasswordEmailSent';
import Add from './components/main/Add';
import AddTwo from './components/main/AddTwo';
import Save from './components/main/Save';
import SaveTwo from './components/main/SaveTwo';
import Comments from './components/main/Comment';
import {store} from './redux/store/store'
import ViewLocalPosts from './components/main/ViewLocalPosts';
import UsersProfile from './components/main/UsersProfile';
import ViewExternalScraps from './components/main/ViewExternalScraps';
import CreatePostDetails from './components/main/PostDetails'
import SettingsPage from './components/main/SettingsPage';
import TermsOfServicePage from './components/main/TermsOfService';
import Accounts from './components/main/AccountsPage';
import Security from './components/main/Security';
import Theme from './components/main/Theme';
import Help from './components/main/Help';
import FeedTwo from './components/main/FeedTwo';
import ContactUsScreen from './components/main/ContactUsScreen';
import FAQ from './components/main/FAQ';
import EditProfileScreen from './components/main/EditProfile';
import BusinessInfoScreen from './components/main/BusinessInfo';
import LoginActivityScreen from './components/main/LoginLogs';
import MapThreeAR from './components/main/MapThreeAR';
import SessionScreen from './components/main/Sessions';
import ChangeAuthScreen from './components/main/ChangeAuth';
import ReportPost from './components/main/ReportPost'

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    onAuthStateChanged(auth, (user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state
    if(!loaded){
      return(
        <View style={{flex: 1, justifyContent: 'center'}}><Text>Loading</Text></View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Start">
            <Stack.Screen name="Start" component={Start} options={{headerShown: false}}/>
            <Stack.Screen name="Registration" component={Registration} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/>
            <Stack.Screen name="ForgotPasswordEmailSent" component={ForgotPasswordEmailSent} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    
    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
          {/* To remove header Add below => options={{headerShown: false}} */}
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
            <Stack.Screen name="AddTwo" component={AddTwo} navigation={this.props.navigation} options={{title: "Upload Images"}}/>
            <Stack.Screen name="SaveTwo" component={SaveTwo} options={{title: "SaveTwo", headerShown: false}}/>
            <Stack.Screen name="Comment" component={Comments} options={{title: "Comments"}} navigation={this.props.navigation}/>
            <Stack.Screen name="ViewLocalPosts" component={ViewLocalPosts} />
            <Stack.Screen name="UsersProfile" component={UsersProfile} options={{headerShown: false}} />
            <Stack.Screen name="ViewExternalPosts" component={ViewExternalScraps} options={{headerShown: false}}/>
            <Stack.Screen name="CreatePostDetails" component={CreatePostDetails} />
            <Stack.Screen name="SettingsPage" component={SettingsPage} options={{headerShown:false}}/>
            <Stack.Screen name="TermsOfService" component={TermsOfServicePage} options={{headerShown:false}} />
            <Stack.Screen name="Accounts" component={Accounts} options={{headerShown:false}}/>
            <Stack.Screen name="Security" component={Security} options={{headerShown: false}} />
            <Stack.Screen name="Theme" component={Theme} options={{headerShown:false}} />
            <Stack.Screen name="Help" component={Help} options={{headerShown: false}} />
            <Stack.Screen name="FeedTwo" component={FeedTwo} options={{headerShown: false}} />
            <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="FAQs" component={FAQ} />
            <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
            <Stack.Screen name="Business Information" component={BusinessInfoScreen} />
            <Stack.Screen name="LoginLogs" component={LoginActivityScreen} options={{headerShown: false}}/>
            <Stack.Screen name="MapThreeAR" component={MapThreeAR} />
            <Stack.Screen name="Sessions" component={SessionScreen} options={{headerShown: false}}/>
            <Stack.Screen name="ChangeAuth" component={ChangeAuthScreen} options={{headerShown: false}}/>
            <Stack.Screen name="ReportPost" component={ReportPost} options={{headerShown: false}}/>
          
          </Stack.Navigator>
        </NavigationContainer>
        
      </Provider>
      
      
    )
  }
}

export default App


