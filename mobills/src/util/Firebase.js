import firestore from '@react-native-firebase/firestore';

const refExpense = firestore().collection('despesa');

export default refExpense;
