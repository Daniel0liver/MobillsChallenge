import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const refExpense = firestore().collection('expense');
class ListDetailExpense extends Component {
  constructor() {
    super();
    this.refExpense = firestore().collection('expense');
    this.state = {
      isLoading: true,
      expenses: {},
      key: '',
    };
  }

  static navigationOptions = {
    title: 'Detalhes da Despesa',
  };

  componentDidMount() {
    const {navigation} = this.props;
    const ref = this.refExpense.doc(
      JSON.parse(navigation.getParam('expenseKey')));
    
      ref.get().then(doc => {
      if (doc.exists) {
        alert(`Esse id: ${doc.id} existe e pertence a despesa: ${doc.get('description')} !`);
      } else {
        alert(`Esse id: ${doc.id} existe!`);
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => this.props.navigation.push('ListExpenseRoute')}>
          <Text>Detalhes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonLeft}>
          <Text>Deletar</Text>
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

export default ListDetailExpense;
