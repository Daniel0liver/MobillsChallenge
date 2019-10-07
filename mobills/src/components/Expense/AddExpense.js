import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

class AddExpense extends Component {
  constructor() {
    super();
    this.refExpense = firestore().collection('expense'); // Pegando a referencia da tabela "expense"
    this.state = {
      value: 0.00,
      description: '',
      date: new Date().toLocaleDateString('pt-BR'),
      paidOut: true,
      isAdded: false,
      isDateTimePickerVisible: false,
    };
  }

  static navigationOptions = { // Titulo da Página 
    title: 'Adicionar Despesa',
    headerStyle: { // Estilizando o menu
      backgroundColor: '#f44336',
    },
    headerTintColor: '#fff',
  };

  addExpense = async () => {
    const {value, description, date, paidOut} = this.state;
    if (value > 0 || description != '') { // Validando campos varios no formulário
      try {
        await this.refExpense.add({ // Adicionando valores na tabela "expense"
          value: parseFloat(value),
          description: description,
          date: Date(date),
          paidOut: paidOut,
        });
        this.setState({
          isAdded: true,
        });
        if ((this.state.isAdded = true)) {
          // Se for adicionado, redirecionar para despesas
          this.props.navigation.goBack();
        }
      } catch (err) {
        alert(err);
      }
    } else {
      alert('Preencha todos os campos!')
    }
  };

  render() {
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
              value={this.state.value} // Transmitindo valor na forma de String
              onChangeText={value => this.setState({value})}
            />
          </View>
          <View style={styles.fields}>
            <IconMaterialIcons name="date-range" style={styles.icon}/>
            <DatePicker
              style={{width: 200}}
              date={this.state.date} //state data inicial
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
          <TouchableOpacity style={styles.buttonLeft} onPress={this.addExpense}>
            <Text style={styles.textButton}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
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
