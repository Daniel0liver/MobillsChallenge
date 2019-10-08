/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Text,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import ExpenseScreen from './ExpenseScreen';

class AddExpense extends Component {
  constructor() {
    super();
    this.refExpense = firestore().collection('expense'); // Pegando a referencia da tabela "expense"
    this.state = {
      key: '',
      value: 0.00,
      description: '',
      date: new Date().toLocaleDateString('pt-BR'),
      paidOut: true,
      isDateTimePickerVisible: false,
      isLoading: true,
    };
  }

  static navigationOptions = {
    // Titulo da Página
    title: 'Editar Despesa',
    headerStyle: {
      // Estilizando o menu
      backgroundColor: '#f44336',
    },
    headerTintColor: '#fff',
  };

  componentDidMount() {
    const {navigation} = this.props;
    const ref = this.refExpense.doc(
      JSON.parse(navigation.getParam('expenseKey')));
    
    // Listando todos os dados da despesa com id que está em ref
    ref.get().then(doc => {
      if (doc.exists) {
        const expense = doc.data(); // Pegando os dados da despesa
        this.setState({
          key: doc.id,
          value: expense.value,
          date: expense.date,
          description: expense.description,
          paidOut: expense.paidOut,
          isLoading: false,
        });
      } else {
        alert(`O id não foi encotrado!`)
      }
    });
  }

  updateExpense() {
    this.setState({
      isLoading: true,
    });
    const {value, description, date, paidOut} = this.state;
    // Validando campos varios no formulário
    if (value > 0 || description != '') {
      try {
        this.refExpense
          .add({
            // Adicionando valores na tabela "expense"
            value: parseFloat(value),
            description: description,
            date: Date(date),
            paidOut: paidOut,
          })
          .then(refDocExpense => {
            // Ao adicionar reseto os valores dos inputs
            this.setState({
              value: 0.00,
              description: '',
              date: date,
              paidOut: true,
              isLoading: false,
            });
            this.props.navigation.navigate('ExpenseScreen');
          });
      } catch (err) {
        alert('Erro ao editar despesa ', err);
        this.setState({
          isLoading: false,
        });
      }
    } else {
      alert('Preencha todos os campos!')
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#2173d2" />
        </View>
      );
    }
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enable={Platform.OS === 'ios'}
        style={styles.container}>
        <View>
          <View style={styles.fields}>
            <IconMaterialIcons name="attach-money" style={styles.icon}/>
            <TextInput
              style={styles.input}
              showSoftInputOnFocus
              placeholder="Insira um valor"
              numeric
              keyboardType={'decimal-pad'}
              value={`${this.state.value}`} // Transmitindo valor na forma de String pois TextInput recebe String
              onChangeText={value => this.setState({value})}
            />
          </View>
          <View style={styles.fields}>
            <IconMaterialIcons name="date-range" style={styles.icon}/>
            <DatePicker
              style={{width: 200}}
              // Estou convertendo a data pois estava no padrão americano e estou mostrando no padrão br,
              // logo o tamanho é desproporcional e da erro invalid date
              date={new Date(this.state.date).toLocaleDateString('pt-BR')}
              mode="date"
              placeholder="selecione a data"
              format="DD/MM/YYYY"
              customStyles={{
                dateIcon: {
                  display: 'none', // removendo icon padrão
                },
                dateInput: {
                  marginLeft: 36,
                  borderRadius: 50,
                  borderColor: '#f1f1f1',
                  backgroundColor: '#f1f1f1',
                },
              }}
              onDateChange={date => {
                this.setState({date: date});
              }}
            />
          </View>
          <View style={styles.fields}>
            <IconMaterialIcons name="description" style={styles.icon}/>
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={this.state.description}
              onChangeText={description => this.setState({description})}
            />
          </View>
          <View style={styles.fields}>
            <CheckBox
              value={this.state.paidOut}
              onValueChange={() =>
                this.setState({paidOut: !this.state.paidOut})
              }
            />
            <Text style={{marginLeft: 10}}>Está pago</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={this.updateExpense}>
            <Text style={styles.textButton}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonLeft}>
            <Text>Deletar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    padding: 20,
  },
  fields: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 0,
    color: '#777',
    fontSize: 30,
  },
  input: {
    width: 300,
    height: 40,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#c3c3c3',
    marginLeft: 10,
    marginVertical: 20,
  },
  buttons: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLeft: {
    alignSelf: 'stretch',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#f44336',
    marginBottom: 10,
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
  },
});

export default AddExpense;
