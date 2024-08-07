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

const generateSolutions = (postageCost, stampDenominations, maxStamps, includedDenominations, excludedDenominations) => {
  const cleanRequiredStamps = spliterate(includedDenominations);
  const requiredStampsSum = sum(cleanRequiredStamps);

  if (postageCost === requiredStampsSum) {
    return sortAndRemoveArrayDuplicates([cleanRequiredStamps], postageCost);
  }

  const cleanStampDenoms = subtractLists(spliterate(stampDenominations), spliterate(excludedDenominations));
  let rawSolutions = scrySolutions([cleanRequiredStamps], postageCost, cleanStampDenoms, maxStamps - cleanRequiredStamps.length);
  
  return sortAndRemoveArrayDuplicates(rawSolutions, postageCost);
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

const sortAndRemoveArrayDuplicates = (arr, postageCost) => {
  const noEmptiesOrBadSumsArr = arr.filter(item => item.length > 0 && sum(item) === postageCost);
  const sortedByLengthArr = noEmptiesOrBadSumsArr.sort((a, b) => a.length - b.length);
  return sortedByLengthArr;
};

export default {
  generateSolutions,
  DEFAULT_STAMP_DENOMINATIONS: '2, 6, 8, 10, 18, 20, 22, 24, 29, 32, 33, 34, 56, 73',
  DEFAULT_POSTAGE_COST: 56,
  DEFAULT_STAMP_MAX: 4,
  STRING_CONTAINS_LETTER: /[a-zA-Z]/,
};
