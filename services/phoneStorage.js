import { XStorage } from 'react-native-easy-app';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PhoneStorage = {
  totalPostageCost: null,
  maxStamps: null,
  postageDenominationsAvailable: null,
  postageToInclude: null,
  postageToExclude: null,
  savedSolutions: null,
};
XStorage.initStorageSync(PhoneStorage, AsyncStorage);


export default PhoneStorage;
