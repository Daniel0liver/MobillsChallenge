import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import ExpenseScreen from './src/components/Expense/ExpenseScreen';
import AddExpense from './src/components/Expense/AddExpense';
import EditExpense from './src/components/Expense/EditExpense';
import HomeScreen from './src/components/HomeScreen/HomeScreen';

const RootStack = createStackNavigator(
  {
    ExpenseRoute: ExpenseScreen,
    AddExpenseRoute: AddExpense,
    EditExpenseRoute: EditExpense,
    HomeScreenRoute: HomeScreen,
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
