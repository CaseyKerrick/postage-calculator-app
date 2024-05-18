import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
// import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import hamburgerMenuIcon from './assets/hamburger-menu.png';
import fullLogo from './assets/FullLogo_Transparent.png';
import calculatorIcon from './assets/calculator-icon.png';
import saveIcon from './assets/save-icon.png';
import aboutIcon from './assets/about-icon.png';

export default function App() {

  let [selectedTab, setSelectedTab] = useState(0);
  let tabTitleText = ['Calculator', 'Saved Combos', 'About'];
  
  

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
  },
});
