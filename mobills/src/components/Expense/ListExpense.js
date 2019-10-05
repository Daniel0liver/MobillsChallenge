import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

class ListExpense extends Component {
  static navigationOptions = {
    title: 'Todas as Despesas',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Totas as Despesas</Text>
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => this.props.navigation.push('ListExpenseRoute')}>
          <Text>Detalhes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => this.props.navigation.navigate('ExpenseRoute')}>
          <Text>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => this.props.navigation.goBack()}>
          <Text>Voltar</Text>
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
    backgroundColor: '#f13',
    marginBottom: 10,
  },
  textButton: {
    fontSize: 25,
    color: '#fff',
  },
});

export default ListExpense;