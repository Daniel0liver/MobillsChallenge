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
import {List, ListItem, Button, Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

class ExpenseScreen extends Component {
  constructor() {
    super();
    this.refExpense = firestore().collection('expense');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      expenses: [],
    };
  }
  static navigationOptions = {
    title: 'Despesas',
    headerStyle: { // Estilizando o menu
      backgroundColor: '#f44336',
    },
    headerTintColor: '#fff',
  };

  onCollectionUpdate = querySnapshot => {
    const expenses = [];
    querySnapshot.forEach(doc => {
      const {value, description, date, paidOut} = doc.data();
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
        <ScrollView style={styles.container}>
          {this.state.expenses.map((item, i) => (
            <ListItem
              key={i}
              style={styles.item}
              title={item.description}
              subtitle={new Date(item.date).toLocaleDateString('pt-BR')}
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
                    }}>
                    <Text style={styles.textStatusExpense}>Pago</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: '#f44336',
                      borderRadius: 50,
                      paddingHorizontal: 10,
                    }}>
                    <Text style={styles.textStatusExpense}>Pendente</Text>
                  </View>
                )
              }
              bottomDivider
              leftIcon={{
                name: 'trending-down',
                type: 'Ionicons',
                color: '#f44336',
              }}
              onPress={() => {
                this.props.navigation.navigate('ListExpenseRoute', {
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
  container: {
    height: '100%',
    paddingVertical: 20,
  },
  item: {
    height: 60,
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
    bottom: 40,
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
