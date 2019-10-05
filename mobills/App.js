import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import ExpenseScreen from './src/components/Expense/ExpenseScreen';
import ListExpense from './src/components/Expense/ListExpense';
import AddExpense from './src/components/Expense/AddExpense';
import EditExpense from './src/components/Expense/EditExpense';
import HomeScreen from './src/components/HomeScreen/HomeScreen';

const RootStack = createStackNavigator(
  {
    ExpenseRoute: ExpenseScreen,
    ListExpenseRoute: ListExpense,
    AddExpenseRoute: AddExpense,
    EditExpenseRoute: EditExpense,
    HomeScreenRoute: HomeScreen,
  },
  {
    initialRouteName: 'HomeScreenRoute',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLeft: {
    width: 60,
    height: 60,
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    borderRadius: 50,
    backgroundColor: '#f13',
  },
});
export default createAppContainer(RootStack);