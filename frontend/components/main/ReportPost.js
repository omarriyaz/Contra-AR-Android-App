import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  StyleSheet,
  Linking,
  Alert 
} from 'react-native';
import { Ionicons, FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, app } from '../../database/firebase';
import { setDoc, getFirestore, doc, updateDoc, increment } from 'firebase/firestore';

const ReportPost = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [report, setReportType] = useState("")
  const navigator = useNavigation();
  const handleSend = async () => {
    console.log(`Reporting Reason: ${report}\n\nMessage: ${message}`);
    // You can use a package like react-native-mail to send the email
    const db = getFirestore(app)
    await updateDoc(doc(db,`posts/${props.route.params.uid}/userPosts/${props.route.params.postId}`), {nReports: increment(1)})
    await setDoc(doc(db,`posts/${props.route.params.uid}/userPosts/${props.route.params.postId}/report/${auth.currentUser.uid}`),{reportReason: report, reportMessage: message});
    Alert.alert("Post has been reported!")
  }

  return (
    <ScrollView style={styles.container}>
      <AntDesign name="closecircleo" size={22} color="black" style={{marginRight: "10%", marginTop: 10}} onPress={() => navigator.navigate("Feed")} />
      <Text style={styles.title}>Report Post</Text>
      

      <View style={styles.form}>
      <View style={styles.wrapper}>
                {["Inappropriate content","Spam or scams","Harassment or bullying","Impersonation","Intellectual property infringement","Hate speech","Incorrect post type"].map(type => (
                    <View key={type} style={styles.typing}>
                        <TouchableOpacity style={styles.outter} onPress={() => {setReportType(type)}}>
                            {report === type && <View style={styles.inner} />}
                            {console.log(report)}
                        </TouchableOpacity>
                        <Text style={styles.RadText}>{type}</Text> 
                    </View>
                ))}
            </View>
            <Text></Text>
            <Text></Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Reason For Reporting Post:</Text>
                <TextInput
                style={styles.input}
                placeholder="Enter reporting specifics..."
                onChangeText={text => setMessage(text)}
                value={message}
                />
            </View>
            <Text></Text>
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 35
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    color: '#6A5ACD'
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    fontSize: 16,
    color: '#333333'
  },
  messageInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    fontSize: 16,
    color: '#333333',
    height: 100
  },
  button: {
    backgroundColor: '#6A5ACD',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  wrapper: {
    justifyContent: 'space-evenly',
    marginTop: 0,
  },
  outter: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 12,
    height: 12,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  typing: {
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10
  },
  RadText: {
    fontSize: 15,
    paddingLeft: 10
  },
  inputContainer: {
    marginVertical: 8
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 8
  },
});

export default ReportPost;