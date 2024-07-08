import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Button, Keyboard } from 'react-native';
import Calculator from '../services/calculator';
import Util from '../services/util';
import PhoneStorage from '../services/phoneStorage';


export default function StampCalculator({ solutions, setSolutions, isSolutionSaved, toggleNewSolution }) {
  let [totalPostageCost, setTotalPostageCost] = useState(PhoneStorage.totalPostageCost || Calculator.DEFAULT_POSTAGE_COST);
  let [maxStamps, setMaxStamps] = useState(PhoneStorage.maxStamps || Calculator.DEFAULT_STAMP_MAX);
  let [postageDenominationsAvailable, setPostageDenominationsAvailable] = useState(PhoneStorage.postageDenominationsAvailable || Calculator.DEFAULT_STAMP_DENOMINATIONS);
  let [postageToInclude, setPostageToInclude] = useState(PhoneStorage.postageToInclude || '');
  let [postageToExclude, setPostageToExclude] = useState(PhoneStorage.postageToExclude || '');

  const setAndSavePostageCost = (newTotalPostage) => {
    PhoneStorage.totalPostageCost = newTotalPostage;
    setTotalPostageCost(newTotalPostage);
  };

  const setAndSaveMaxStamps = (newMaxStamps) => {
    PhoneStorage.maxStamps = newMaxStamps;
    setMaxStamps(newMaxStamps);
  };

  const setAndSavePostageDenoms = (newDenoms) => {
    PhoneStorage.postageDenominationsAvailable = newDenoms;
    setPostageDenominationsAvailable(newDenoms);
  };

  const setAndSavePostageToInclude = (newPostageToInclude) => {
    PhoneStorage.postageToInclude = newPostageToInclude;
    setPostageToInclude(newPostageToInclude);
  };

  const setAndSavePostageToExclude = (newPostageToExclude) => {
    PhoneStorage.postageToExclude = newPostageToExclude;
    setPostageToExclude(newPostageToExclude);
  };

  return (
    <ScrollView contentContainerStyle={styles.content} >
      <View style={styles.scryOptions}>
        <View style={styles.smallTextInput}>
          <Text style={styles.textInputLabel} onSubmitEditing={Keyboard.dismiss}>Total Postage Cost</Text>
          <TextInput style={styles.input} onChangeText={setAndSavePostageCost} value={totalPostageCost.toString()} inputMode='numeric' />
        </View>
        <View style={styles.smallTextInput}>
          <Text style={styles.textInputLabel}>Max Stamps Allowed</Text>
          <TextInput style={styles.input} onChangeText={setAndSaveMaxStamps} value={maxStamps.toString()} inputMode='numeric' />
        </View>
        <View style={styles.bigTextInput}>
          <Text style={styles.textInputLabel}>Postage Denominations Available</Text>
          <TextInput style={styles.input} onChangeText={setAndSavePostageDenoms} value={postageDenominationsAvailable} />
        </View>
        <View style={styles.bigTextInput}>
          <Text style={styles.textInputLabel}>Postage to Include</Text>
          <TextInput style={styles.input} onChangeText={setAndSavePostageToInclude} value={postageToInclude} />
        </View>
        <View style={styles.bigTextInput}>
          <Text style={styles.textInputLabel}>Postage to Exclude</Text>
          <TextInput style={styles.input} onChangeText={setAndSavePostageToExclude} value={postageToExclude} />
        </View>
        <View style={styles.calculateButton}>
          <Button title="Go!" color={Util.DARK_GREEN} onPress={() => {
            let newSolutions = Calculator.generateSolutions(parseInt(totalPostageCost), postageDenominationsAvailable, maxStamps, postageToInclude, postageToExclude);
            let processedSolutions = newSolutions.map((solution) => {
              return { total: totalPostageCost, values: solution, saved: isSolutionSaved(solution)};
            });
            setSolutions(processedSolutions);
          }} />
        </View>
      </View>
      <View style={styles.solutionsHolder}>
        { solutions.map((solution, solutionIndex) => {
          return (
            <Pressable onPress={() => toggleNewSolution(solutionIndex)} key={`${solution.toString()}_${solutionIndex}`}>
              <View style={[styles.solutionContainer, { backgroundColor: solution.saved ? Util.DARK_GREEN : Util.LIGHT_GREEN }]} key={solution.toString()}>
                { solution.values.map((stampValue, stampIndex) => {
                  return (
                    <View style={styles.stamp} key={`${stampIndex}_${stampValue}`}>
                      <Text style={styles.stampText}>{stampValue}</Text>
                    </View>
                  );
                })}
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    alignItems: 'center',
  },

  scryOptions: {
    width: '90%',
    borderColor: Util.DARK_GREEN,
    borderWidth: 3,
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    borderRadius: 3,
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

  input: {
    borderColor: '#595959',
    color: '#595959',
    borderWidth: 1,
    height: 40,
    marginBottom: 5,
    marginTop: -5,
    padding: 8,
    borderRadius: 3,
  },

  calculateButton: {
    width: '95%',
    marginBottom: 5,
    marginTop: 8,
    borderRadius: 3,
  },

  solutionsHolder: {
    width: '65%',
    alignContent: 'space-around',
    marginTop: 12,
    marginBottom: 20,
  },

  solutionContainer: {
    marginTop: 10,
    borderRadius: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    paddingLeft: 12,
  },

  stamp: {
    height: 60,
    width: 45,
    backgroundColor: '#fff',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dotted',
    borderWidth: 2.25,
    borderColor: Util.LIGHT_GREEN,
  },

  stampText: {
    fontWeight: 'bold',
  },
});
