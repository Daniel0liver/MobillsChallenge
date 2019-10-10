/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment, { utc } from 'moment';
import 'moment/locale/pt-br';

class ExpenseScreen extends Component {
  constructor() {
    super();
    this.refExpense = firestore().collection('expense');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      expenses: [],
      totalExpense: 0,
    };
  }
  static navigationOptions = {
    title: 'Despesas',
    headerStyle: { // Estilizando o menu
      backgroundColor: '#f44336',
      elevation: 0, // remover boxshadown
    },
    headerTintColor: '#fff',
  };

  onCollectionUpdate = querySnapshot => {
    const expenses = [];
    let total = 0;

    querySnapshot.forEach(doc => {
      const {value, description, date, paidOut} = doc.data();
      total += value; // Pegando valor total das despesas

      expenses.push({
        key: doc.id,
        doc, // DocumentSnapshot
        value,
        description,
        date,
        paidOut,
      });
    });
    this.setState({
      expenses,
      totalExpense: total,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.refExpense.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#2173d2" />
        </View>
      );
    }
    return (
      <SafeAreaView>
        <View style={styles.headerTotal}>
          <Text style={styles.headerTotalText}>
            {`R$ ${this.state.totalExpense
              .toFixed(2) // casas decimais
              .replace('.', ',')}
            `}
          </Text>
        </View>
        <ScrollView style={styles.container}>
          {this.state.expenses.map((item, i) => (
            <ListItem
              key={i}
              style={styles.item}
              title={item.description}
              titleStyle={{color:'#333'}}
              subtitle={moment(item.date.toDate())
                .locale('pt-br')
                .format('LL')}
              rightTitle={`R$ ${item.value
                .toFixed(2) // casas decimais
                .replace('.', ',')}`} // Alterando valor com (.) para (,)
              rightTitleStyle={{color: '#f44336'}}
              rightSubtitle={
                item.paidOut === true ? (
                  <View
                    style={{
                      backgroundColor: '#4caf50',
                      borderRadius: 50,
                      paddingHorizontal: 10,
                      marginTop: 5,
                    }}>
                    <Text style={styles.textStatusExpense}>Pago</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: '#e8b723',
                      borderRadius: 50,
                      paddingHorizontal: 10,
                      marginTop: 5,
                    }}>
                    <Text style={styles.textStatusExpense}>Pendente</Text>
                  </View>
                )
              }
              bottomDivider
              leftIcon={
                <Ionicons
                  name="ios-trending-down"
                  size={16}
                  style={styles.leftIconExpense}
                />
              }
              onPress={() => {
                this.props.navigation.navigate('EditExpenseRoute', {
                  expenseKey: `${JSON.stringify(item.key)}`,
                });
              }}
            />
          ))}
        </ScrollView>
        <View>
          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={() => this.props.navigation.navigate('AddExpenseRoute')}>
            <IconAntDesign name="plus" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTotal: {
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTotalText: {
    color: '#fff',
    fontSize: 20,
  },
  container: {
    height: '100%',
  },
  item: {
    height: 65,
  },
  leftIconExpense: {
    color: '#fff',
    backgroundColor: '#f44336',
    borderRadius: 50,
    paddingHorizontal: 11,
    paddingVertical: 10,
  },
  statusExpense: {
    backgroundColor: '#f44336',
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  textStatusExpense: {
    color: '#fff',
    fontSize: 12,
  },
  buttonLeft: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 20,
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#f44336',
  },
  icon: {
    color: '#fff',
    fontSize: 18,
  },
  textButton: {
    fontSize: 25,
    color: '#fff',
  },
});

export default ExpenseScreen;
