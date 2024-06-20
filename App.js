import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
// import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import fullLogo from './assets/FullLogo_Transparent.png';
import calculatorIcon from './assets/calculator-icon.png';
import saveIcon from './assets/save-icon.png';
import aboutIcon from './assets/about-icon.png';
import Calculator from './services/calculator';

export default function App() {

  let [selectedTab, setSelectedTab] = useState(0);
  let tabTitleText = ['Calculator', 'Saved Combos', 'About'];

  // TODO: load these from phone data instead if it exists
  let [totalPostageCost, setTotalPostageCost] = useState(Calculator.DEFAULT_POSTAGE_COST.toString());
  let [maxStamps, setMaxStamps] = useState(Calculator.DEFAULT_STAMP_MAX.toString());
  let [postagteDenominationsAvailable, setPostageDenominationsAvailable] = useState(Calculator.DEFAULT_STAMP_DENOMINATIONS);
  let [postageToInclude, setPostageToInclude] = useState('');
  let [postageToExclude, setPostageToExclude] = useState('');


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.menuBar}>
        <View style={[styles.menuItem, { justifyContent: 'flex-start' }]}>
          <Text style={styles.menuText}>{tabTitleText[selectedTab]}</Text>
        </View>
        <View style={styles.menuItem}>
          <Pressable onPress={() => setSelectedTab(0)}>
            <Image style={styles.menuIcon} source={calculatorIcon} />
          </Pressable>
          <Pressable onPress={() => setSelectedTab(1)}>
            <Image style={styles.menuIcon} source={saveIcon} />
          </Pressable>
          <Pressable onPress={() => setSelectedTab(2)}>
            <Image style={styles.menuIcon} source={aboutIcon} />
          </Pressable>
        </View>
      </View>
      <View style={styles.logoContainer}>
        <Image source={fullLogo} style={styles.appLogo} />
      </View>
      <View style={styles.content}>
        <View style={styles.scryOptions}>
          <View style={styles.smallTextInput}>
            <Text style={styles.textInputLabel}>Total Postage Cost</Text>
            <TextInput style={styles.input} onChangeText={setTotalPostageCost} value={totalPostageCost} inputMode='numeric' />
          </View>
          <View style={styles.smallTextInput}>
            <Text style={styles.textInputLabel}>Max Stamps Allowed</Text>
            <TextInput style={styles.input} onChangeText={setMaxStamps} value={maxStamps} inputMode='numeric' />
          </View>
          <View style={styles.bigTextInput}>
            <Text style={styles.textInputLabel}>Postage Denominations Available</Text>
            <TextInput style={styles.input} onChangeText={setPostageDenominationsAvailable} value={postagteDenominationsAvailable} inputMode='numeric' />
          </View>
          <View style={styles.bigTextInput}>
            <Text style={styles.textInputLabel}>Postage to Include</Text>
            <TextInput style={styles.input} onChangeText={setPostageToInclude} value={postageToInclude} inputMode='numeric' />
          </View>
          <View style={styles.bigTextInput}>
            <Text style={styles.textInputLabel}>Postage to Exclude</Text>
            <TextInput style={styles.input} onChangeText={setPostageToExclude} value={postageToExclude} inputMode='numeric' />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  menuBar: {
    backgroundColor: '#377D22',
    height: 85,
    paddingTop: 30,
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderBottomColor: '#2b611b',
  },

  menuItem: {
    height: 50,
    width: '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  menuIcon: {
    height: 45,
    width: 45,
  },

  menuText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 28,
  },

  appLogo: {
    height: 100,
    width: 350,
    marginLeft: -5,
    alignSelf: 'center',
  },

  content: {
    flex: 1,
    alignItems: 'center',
  },

  scryOptions: {
    width: '90%',
    borderColor: '#377D22',
    borderWidth: 3,
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    borderRadius: 3,
  },

  input: {
    borderColor: '#595959',
    color: '#595959',
    borderWidth: 1,
    height: 40,
    marginBottom: 5,
    marginTop: -5,
    padding: 8,
  },

  smallTextInput: {
    width: '45%',
  },

  bigTextInput: {
    width: '95%',
  },

  textInputLabel: {
    color: '#595959',
    marginLeft: 5,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: '#fff',
    zIndex: 1,
    alignSelf: 'flex-start',
  },
});
