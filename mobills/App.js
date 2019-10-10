import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import HomeScreen from './src/components/HomeScreen/HomeScreen';
import ExpenseScreen from './src/components/Expense/ExpenseScreen';
import AddExpense from './src/components/Expense/AddExpense';
import EditExpense from './src/components/Expense/EditExpense';

import IncomeScreen from './src/components/Income/IncomeScreen';
import AddIncome from './src/components/Income/AddIncome';
import EditIncome from './src/components/Income/EditIncome';

const RootStack = createStackNavigator(
  {
    HomeScreenRoute: HomeScreen,
    //Expenses
    ExpenseRoute: ExpenseScreen,
    AddExpenseRoute: AddExpense,
    EditExpenseRoute: EditExpense,
    //Income
    IncomeRoute: IncomeScreen,
    AddIncomeRoute: AddIncome,
    EditIncomeRoute: EditIncome,
  },
  {
    initialRouteName: 'HomeScreenRoute',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777',
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
export default createAppContainer(RootStack);
