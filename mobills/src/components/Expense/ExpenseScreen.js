import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

class ExpenseScreen extends Component {
  static navigationOptions = {
    title: 'Despesas',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Detalhes</Text>
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => this.props.navigation.push('ListExpenseRoute')}>
          <Text>Despesas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => this.props.navigation.navigate('AddExpenseRoute')}>
          <Text>Adicionar Despesa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => this.props.navigation.goBack('EditExpenseRoute')}>
          <Text>Editar Despesa</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLeft: {
    alignSelf: 'stretch',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#2173d2',
    marginBottom: 10,
  },
  textButton: {
    fontSize: 25,
    color: '#fff',
  },
});

export default ExpenseScreen;
