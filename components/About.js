import { StyleSheet, Text, View, ScrollView } from 'react-native';


export default function About() {
  return (
    <ScrollView>
      <Text>Instructions:</Text>
      <Text>Total Postage Cost (in cents) - The total that all the stamps in each solution will add up to.</Text>
      <Text>Max Stamps Allowed - The maximum number of stamps that can be in each solution.</Text>
      <Text>Postage Denomoinations Available - The possible stamp values that can be used in each solution.</Text>
      <Text>Postage To Include - Force the program to include each of these values in every solution.</Text>
      <Text>Postage To Exclude - Force the program to not use these values, even if they're in the Postage Denominations Available.</Text>
    </ScrollView>
  );
}
