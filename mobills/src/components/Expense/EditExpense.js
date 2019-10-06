import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

class EditExpense extends Component {
  static navigationOptions = {
    title: 'Editar Despesa',
    headerStyle: { // Estilizando o menu
      backgroundColor: '#f44336',
    },
    headerTintColor: '#fff',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Editar</Text>
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => this.props.navigation.push('EditExpenseRoute')}>
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
    backgroundColor: '#2173d2',
    marginBottom: 10,
  },
  textButton: {
    fontSize: 25,
    color: '#fff',
  },
});

export default EditExpense;
