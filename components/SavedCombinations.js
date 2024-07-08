import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import Util from '../services/util';


export default function SavedCombinations({ savedSolutions, toggleSavedSolution }) {

  // const groupSavedSolutions = () => {
  //   let solutions = {};

  //   for (let x = 0; x < savedSolutions.length; x++) {
  //     let currentTotal = savedSolutions[x].total;
  //     solutions[currentTotal] = [...(solutions[currentTotal] || []), savedSolutions[x].values];
  //   }

  //   console.log(solutions);
  //   return solutions;
  // };

  return (
    <ScrollView contentContainerStyle={styles.savedSolutionsContainer}>
      { savedSolutions.map((solution, solutionIndex) => {
          return (
            <Pressable onPress={() => toggleSavedSolution(solutionIndex)} key={`${solution.toString()}_${solutionIndex}`}>
              <View style={[styles.solutionContainer, { backgroundColor: solution.saved ? Util.DARK_GREEN : Util.LIGHT_GREEN }]} key={solution.values.toString()}>
                { solution.values.map((stampValue, stampIndex) => {
                  return (
                    <View style={styles.savedSolutionStamp} key={`${stampIndex}_${stampValue}`}>
                      <Text style={styles.stampText}>{stampValue}</Text>
                    </View>
                  );
                })}
                <View style={styles.stampTotal} key={`total_${solution.total}`}>
                  <Text style={styles.stampTotalText}>Total: {solution.total}</Text>
                </View>
              </View>
            </Pressable>
          );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  savedSolutionsContainer: {
    width: '90%',
    flexGrow: 1,
    alignSelf: 'center',
    paddingBottom: 10,
  },

  solutionContainer: {
    marginTop: 10,
    borderRadius: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    paddingLeft: 12,
  },

  savedSolutionStamp: {
    height: 60,
    width: 45,
    backgroundColor: '#fff',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dotted',
    borderWidth: 2.25,
    borderColor: Util.DARK_GREEN,
  },

  stampText: {
    fontWeight: 'bold',
  },

  solutionGroup: {
    width: '80%',
    borderColor: '#000',
    borderWidth: 1,
  },

  stampTotal: {
    margin: 5,
    justifyContent: 'center',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 'auto',
  },

  stampTotalText: {
    fontWeight: 'bold',
    color: '#fff',
  }
});
