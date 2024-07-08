import { StyleSheet, Text, View, ScrollView } from 'react-native';


export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.aboutContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.sectionText}>This app was written for PostCrossers (and people who love to send mail everywhere!)</Text>
        <Text style={styles.sectionText}>If you have any questions, concerns, or feature requests, please send an email to HappyMailPostageCalculator@gmail.com.</Text>
        <Text style={styles.sectionText}>This app was written by a member of the PostCrossing community and is currently under active development.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.sectionText}>Saving Combinations - On the Calculator screen, tap any light green combination to save it. It will then turn dark green, to indicate that saving was successful.</Text>
        <Text style={styles.sectionText}>Deleting Saved Combinations - On the Saved Combos screen, tap any dark green combination to delete it.</Text>
        <Text style={styles.sectionText}>Please comma separate the values you input!</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Controls Explanation</Text>
        <Text style={styles.sectionText}>Total Postage Cost (in cents) - The total that each set of stamps will add up to.</Text>
        <Text style={styles.sectionText}>Max Stamps Allowed - The maximum number of stamps allowed in each solution.</Text>
        <Text style={styles.sectionText}>Postage Denomoinations Available - The list of all possible stamp values that can be used in each solution.</Text>
        <Text style={styles.sectionText}>Postage To Include - Force the program to include each of these values in every solution.</Text>
        <Text style={styles.sectionText}>Postage To Exclude - Force the program to exclude these values, even if they're in the Postage Denominations Available. Using this list can be helpful to prevent you from forgetting which stamp denominations are available to you.</Text>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  aboutContainer: {
    width: '90%',
    flexGrow: 1,
    alignSelf: 'center',
  },

  section: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#595959',
    marginTop: 15,
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },

  sectionTitle: {
    color: '#595959',
    marginLeft: 5,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: '#fff',
    zIndex: 1,
    alignSelf: 'flex-start',
    marginTop: -20,
  },

  sectionText: {
    color: '#595959',
    margin: 7,
  },
});
