import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function TermsOfServicePage (){
    const navigator = useNavigation()
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Terms Of Services</Text>
          <View />
        </View>
        
        <ScrollView style={styles.scrollView}>
         <Text style={styles.text}>
       Welcome to our mobile application. These Terms of Service govern your use of our mobile application. By using our mobile application, you agree to be bound by these Terms of Service. If you do not agree with any of these terms, please do not use our mobile application.
       </Text>
         <Text style={styles.text}>
         Our mobile application and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
       </Text>
         <Text style={styles.text}>
         Our mobile application allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post on our mobile application, including its legality, reliability, and appropriateness.
         </Text>
         <Text style={styles.text}>
         You agree that you will not engage in any activity that interferes with or disrupts our mobile application or the servers and networks that host our mobile application. You also agree that you will not use our mobile application for any illegal or unauthorized purpose.
         </Text>
         <Text style={styles.text}>
         You agree to indemnify, defend, and hold us harmless from any liability, loss, claim, and expense, including reasonable attorney's fees, related to your violation of these Terms of Service.
         </Text>
         <Text style={styles.text}>
         In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
         </Text>
         <Text style={styles.text}>
         We may terminate or suspend your access to our mobile application immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service.
         </Text>
         <Text style={styles.text}>
         These Terms of Service shall be governed and construed in accordance with the laws of United Arab Emirates (U.A.E), without regard to its conflict of law provisions.
         </Text>
         <Text style={styles.text}>
         We reserve the right to modify or replace these Terms of Service at any time. If we make any material changes to these Terms of Service, we will notify you either through the email address you have provided us or by placing a prominent notice on our mobile application.
         </Text>
         <Text style={styles.text}>
         Thank you for reading our Terms of Service. If you have any questions about these Terms of Service, please contact us at irlcontra@gmail.com.
         </Text>
         <Text></Text>
       </ScrollView>
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
  scrollView: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 30,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default TermsOfServicePage;