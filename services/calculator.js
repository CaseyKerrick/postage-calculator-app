const DEFAULT_STAMP_DENOMINATIONS = '4, 5, 10, 18, 20, 22, 24, 29, 33, 34, 50, 51, 66, 87, 100, 111';
const DEFAULT_POSTAGE_COST = 51;
const DEFAULT_STAMP_MAX = 4;
const STRING_CONTAINS_LETTER = /[a-zA-Z]/;

const spliterate = (rawArr) => {
  return rawArr.split(',').map((item) => Number.parseInt(item)).filter(item => !!item);
};

const subtractLists = (listA, listB) => {
  let subtractedList = [];
  for (let x = 0; x < listA.length; x++) {
    if (!listB.includes(listA[x])) {
      subtractedList.push(listA[x]);
    }
  }

  return subtractedList;
};

const sortInts = (a, b) => a - b;

const sum = (arr) => {
  return arr.length > 0 ? arr.reduce((total, curr) => total + curr) : 0;
};

const removeDuplicateLists = (arr) => {
  const sortedStringifiedArr = arr.map(item => item.sort(sortInts).toString());
  const sortedSet = new Set(sortedStringifiedArr);
  const duplicatesRemoved = Array.from(sortedSet);

  return duplicatesRemoved.map(spliterate);
};

const generateSolutions = () => {
  const cleanRequiredStamps = spliterate(desiredDenominations);
  const requiredStampsSum = sum(cleanRequiredStamps);

  if (postageCost === requiredStampsSum) {
    setSolutions(sortAndRemoveArrayDuplicates([cleanRequiredStamps]));
    return;
  }

  const cleanStampDenoms = subtractLists(spliterate(stampDenominations), spliterate(excludedDenominations));
  let rawSolutions = scrySolutions([cleanRequiredStamps], postageCost, cleanStampDenoms, maxStamps - cleanRequiredStamps.length);

  setSolutions(sortAndRemoveArrayDuplicates(rawSolutions));
  setShowFreshSolutions(true);
};

const scrySolutions = (rawSolutions, maxPostage, availableDenominations, stampSlotsRemaining) => {
  if (stampSlotsRemaining <= 0) {
    return rawSolutions;
  }

  let nextSolutions = [];
  for (let x = 0; x < rawSolutions.length; x++) {
    const currentSum = sum(rawSolutions[x]);

    for (let y = 0; y < availableDenominations.length; y++) {
      if (currentSum + availableDenominations[y] > maxPostage) {
        nextSolutions.push([...rawSolutions[x]]);
        break;
      }
      nextSolutions.push([...rawSolutions[x], availableDenominations[y]]);
    }
  }

  return scrySolutions([...removeDuplicateLists(nextSolutions)], maxPostage, availableDenominations, stampSlotsRemaining - 1);
};

const sortAndRemoveArrayDuplicates = (arr) => {
  const noEmptiesOrBadSumsArr = arr.filter(item => item.length > 0 && sum(item) === postageCost);
  const sortedByLengthArr = noEmptiesOrBadSumsArr.sort((a, b) => a.length - b.length);
  return sortedByLengthArr;
};

export default {
  callAdd: () => {
    alert('hi')
  },
  generateSolutions,
  DEFAULT_STAMP_DENOMINATIONS: '4, 5, 10, 18, 20, 22, 24, 29, 33, 34, 50, 51, 66, 87, 100, 111',
  DEFAULT_POSTAGE_COST: 51,
  DEFAULT_STAMP_MAX: 4,
  STRING_CONTAINS_LETTER: /[a-zA-Z]/,


};
