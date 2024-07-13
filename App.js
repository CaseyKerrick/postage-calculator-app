import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import fullLogo from './assets/FullLogo_Transparent.png';
import calculatorIcon from './assets/calculator-icon.png';
import saveIcon from './assets/save-icon.png';
import aboutIcon from './assets/about-icon.png';
import Util from './services/util';
import Calculator from './services/calculator';
import About from './components/About';
import SavedCombinations from './components/SavedCombinations';
import StampCalculator from './components/StampCalculator';

// FEATURE IDEAS
// toast that says a solution has been saved
// animation to slowly phase out item being removed
// ?? saved solutions can be removed by clicking on them, but they don't "remove" themselves from the list until you go to another tab



export default function App() {

  let [selectedTab, setSelectedTab] = useState(0);
  let tabTitleText = ['Calculator', 'Saved Combos', 'About'];
  let [solutions, setSolutions] = useState([]);
  let [totalPostageCost, setTotalPostageCost] = useState(Calculator.DEFAULT_POSTAGE_COST);
  let [maxStamps, setMaxStamps] = useState(Calculator.DEFAULT_STAMP_MAX);
  let [postageDenominationsAvailable, setPostageDenominationsAvailable] = useState(Calculator.DEFAULT_STAMP_DENOMINATIONS);
  let [postageToInclude, setPostageToInclude] = useState('');
  let [postageToExclude, setPostageToExclude] = useState('');
  let [savedSolutions, setSavedSolutions] = useState([]);

  useEffect(() => {
    const firstLoad = async () => {
      const savedTotalPostageCost = await AsyncStorage.getItem('totalPostageCost');
      const savedMaxStamps = await AsyncStorage.getItem('maxStamps');
      const savedDenoms = await AsyncStorage.getItem('postageDenominationsAvailable');
      const savedPostageToInclude = await AsyncStorage.getItem('postageToInclude');
      const savedPostageToExclude = await AsyncStorage.getItem('postageToExclude');
      const savedSavedSolutions = await AsyncStorage.getItem('savedSolutions');

      if (savedTotalPostageCost) setTotalPostageCost(savedTotalPostageCost);
      if (savedMaxStamps) setMaxStamps(savedMaxStamps);
      if (savedDenoms) setPostageDenominationsAvailable(savedDenoms);
      if (savedPostageToInclude) setPostageToInclude(savedPostageToInclude);
      if (savedPostageToExclude) setPostageToExclude(savedPostageToExclude);
      if (savedSolutions) setSavedSolutions(JSON.parse(savedSavedSolutions));
    };

    firstLoad();
  }, []);

  const setAndSavePostageCost = async (newTotalPostage) => {
    setTotalPostageCost(newTotalPostage);
    await AsyncStorage.setItem('totalPostageCost', newTotalPostage);
  };

  const setAndSaveMaxStamps = async (newMaxStamps) => {
    setMaxStamps(newMaxStamps);
    await AsyncStorage.setItem('maxStamps', newMaxStamps);
  };

  const setAndSavePostageDenoms = async (newDenoms) => {
    setPostageDenominationsAvailable(newDenoms);
    await AsyncStorage.setItem('postageDenominationsAvailable', newDenoms);
  };

  const setAndSavePostageToInclude = async (newPostageToInclude) => {
    setPostageToInclude(newPostageToInclude);
    await AsyncStorage.setItem('postageToInclude', newPostageToInclude);
  };

  const setAndSavePostageToExclude = async (newPostageToExclude) => {
    setPostageToExclude(newPostageToExclude);
    await AsyncStorage.setItem('postageToExclude', newPostageToExclude);
  };

  const navigateToTab = (tab) => async () => {
    if (tab === 0) {
      setSolutions(solutions.map(({total, values, saved}) => {
        return { total, values, saved: isSolutionSaved(values) };
      }));
    } else if (tab === 1) {
      const sortedSavedSolutions = sortSavedSolutions();
      setSavedSolutions(sortedSavedSolutions);
      await AsyncStorage.setItem('savedSolutions', JSON.stringify(sortedSavedSolutions));
    }

    setSelectedTab(tab);
  };

  const sortSavedSolutions = () => {
    let copy = [...savedSolutions];
    const sortedBySolutionLength = copy.sort((a, b) => a.values.length - b.values.length);
    const sortedByPostageTotal = sortedBySolutionLength.sort((a, b) => a.total - b.total);
    return sortedByPostageTotal;
  };

  const toggleNewSolution = async (index) => {
    // TODO: add toast that indicates whether the solution saved or if it can't be saved
    // TODO?: Allow the user to unsave a combo from the new solutions list
    let saving = !solutions[index].saved;
    if (saving) {
      setSolutions([...solutions.slice(0, index), {...solutions[index], saved: true}, ...solutions.slice(index + 1, solutions.length)]);

      let newSavedSolutions = [...savedSolutions, {...solutions[index], saved: true}];
      setSavedSolutions(newSavedSolutions);
      await AsyncStorage.setItem('savedSolutions', JSON.stringify(newSavedSolutions));
    }
  };

  const toggleSavedSolution = async (index) => {
    // TODO: allow saved solutions to be toggled to false, which then disappear when you navigate to a different tab
    const newSavedSolutions = [...savedSolutions.slice(0, index), ...savedSolutions.slice(index + 1, savedSolutions.length)];
    setSavedSolutions(newSavedSolutions);
    await AsyncStorage.setItem('savedSolutions', JSON.stringify(newSavedSolutions));
  };

  const isSolutionSaved = (solution) => {
    let stringifiedSolution = JSON.stringify(solution);
    for (let x = 0; x < savedSolutions.length; x++) {
      let stringifiedSavedSolution = JSON.stringify(savedSolutions[x].values);

      if (stringifiedSolution === stringifiedSavedSolution) {
        return true;
      }
    }

    return false;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.menuBar}>
        <View style={[styles.menuItem, { justifyContent: 'flex-start' }]}>
          <Text style={styles.menuText}>{tabTitleText[selectedTab]}</Text>
        </View>
        <View style={styles.menuItem}>
          <Pressable onPress={navigateToTab(0)}>
            <Image style={styles.menuIcon} source={calculatorIcon} />
          </Pressable>
          <Pressable onPress={navigateToTab(1)}>
            <Image style={styles.menuIcon} source={saveIcon} />
          </Pressable>
          <Pressable onPress={navigateToTab(2)}>
            <Image style={styles.menuIcon} source={aboutIcon} />
          </Pressable>
        </View>
      </View>
      <View style={styles.logoContainer}>
        <Image source={fullLogo} style={styles.appLogo} />
      </View>
      { selectedTab === 0 &&
        <StampCalculator
          solutions={solutions}
          setSolutions={setSolutions}
          isSolutionSaved={isSolutionSaved}
          toggleNewSolution={toggleNewSolution}
          totalPostageCost={totalPostageCost}
          setAndSavePostageCost={setAndSavePostageCost}
          maxStamps={maxStamps}
          setAndSaveMaxStamps={setAndSaveMaxStamps}
          postageDenominationsAvailable={postageDenominationsAvailable}
          setAndSavePostageDenoms={setAndSavePostageDenoms}
          postageToInclude={postageToInclude}
          setAndSavePostageToInclude={setAndSavePostageToInclude}
          postageToExclude={postageToExclude}
          setAndSavePostageToExclude={setAndSavePostageToExclude}
        />
      }
      { selectedTab === 1 &&
        <SavedCombinations savedSolutions={savedSolutions} toggleSavedSolution={toggleSavedSolution} />
      }
      { selectedTab === 2 && <About /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  menuBar: {
    backgroundColor: Util.DARK_GREEN,
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
});
