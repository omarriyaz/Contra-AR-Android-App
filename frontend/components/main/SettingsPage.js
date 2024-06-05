// import React from 'react';
// import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';
import { auth, app } from '../../database/firebase';
import { getFirestore, serverTimestamp, collection, addDoc } from "firebase/firestore";
import { doc, updateDoc, increment } from "firebase/firestore";

function SettingsPage () {
  const navigator = useNavigation();
  const db = getFirestore(app);
  const handleAccountPress = () => {
    // handle Account press
  };

  const handleSecurityPress = () => {
    // handle Security press
  };

  const handleThemePress = () => {
    // handle Theme press
  };

  const handleRecommendPress = () => {
    // handle Recommend press
  };

  const handleLogOutPress = () => {
    // handle Log Out press
  };

  const handleHelpPress = () => {
    // handle Help press
  };

  const onLogOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View />
      </View>
      <TouchableOpacity style={styles.item} onPress={()=> navigator.navigate("Accounts")}>
        <AntDesign name="user" size={24} color="black"/>
        <Text style={styles.itemText}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={()=> navigator.navigate("Security")}>
        <MaterialCommunityIcons name="security" size={24} color="black" />
        <Text style={styles.itemText}>Security</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => navigator.navigate("Theme")}>
        <Ionicons name="md-color-palette" size={24} color="black" />
        <Text style={styles.itemText}>Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => navigator.navigate("Help")}>
        <MaterialCommunityIcons name="help-circle-outline" size={24} color="black" />
        <Text style={styles.itemText}>Help</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={()=> navigator.navigate("TermsOfService")}>
        <MaterialCommunityIcons name="file-document-outline" size={24} color="black" />
        <Text style={styles.itemText}>Terms of service</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => {
            const onLogOut = async () => {
                await updateDoc(doc(db, `Sessions/${auth.currentUser.uid}`),{Open: increment(-1)})
                signOut(auth).catch(error => console.log('Error logging out: ', error));}
            onLogOut();
            }}>
        <AntDesign name="logout" size={24} color="black" />
        <Text style={styles.itemText}>Log out</Text>
      </TouchableOpacity>
      <StatusBar style="light" />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Ionicons name="chevron-back" size={28} color="black" />
//       </TouchableOpacity>
//       <Text style={styles.title}>Settings</Text>
//       <View style={styles.optionsContainer}>
//         <TouchableOpacity style={styles.option} onPress={handleAccountPress}>
//           <Text style={styles.optionText}>Account</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.option} onPress={handleSecurityPress}>
//           <Text style={styles.optionText}>Security</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.option} onPress={handleThemePress}>
//           <Text style={styles.optionText}>Theme</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.option} onPress={handleRecommendPress}>
//           <Text style={styles.optionText}>Recommend to Me</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.option} onPress={handleLogOutPress}>
//           <Text style={styles.optionText}>Log Out</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.option} onPress={handleHelpPress}>
//           <Text style={styles.optionText}>Help</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.option} onPress={handleTermsPress}>
//           <Text style={styles.optionText}>Terms of Service</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   optionsContainer: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     paddingVertical: 20,
//   },
//   option: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EFEFEF',
//   },
//   optionText: {
//     fontSize: 18,
//   },
// });

export default SettingsPage;