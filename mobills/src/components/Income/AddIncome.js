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
import moment from 'moment';

class AddIncome extends Component {
  constructor() {
    super();
    this.refIncome = firestore().collection('income'); // Pegando a referencia da tabela "expense"
    this.state = {
      value: 0.00,
      description: '',
      date: new Date(),
      received: true,
      isAdded: false,
      isDateTimePickerVisible: false,
      isLoading: false,
    };
  }

  static navigationOptions = {
    // Titulo da Página
    title: 'Adicionar Receita',
    headerStyle: {
      // Estilizando o menu
      backgroundColor: '#4caf50',
    },
    headerTintColor: '#fff',
  };

  addIncome = async () => {
    this.setState({
      isLoading: true,
    });
    const {value, description, date, received} = this.state;
    // Validando campos varios no formulário
    if (value > 0 && description !== '') {
      try {
        await this.refIncome
          .add({
            // Adicionando valores na tabela "expense"
            value: parseFloat(value),
            description: description,
            date: new moment(date).toDate(), // Convertendo a data em timestamp
            received: received,
          })
          .then(refDocIncome => {
            // Ao adicionar reseto os valores dos inputs
            this.setState({
              value: 0.00,
              description: '',
              date: date,
              received: true,
              isLoading: false,
            });
            this.props.navigation.goBack();
          });
      } catch (err) {
        alert('Erro ao adicionar receita', err);
        this.setState({
          isLoading: false,
        });
      }
    } else {
      alert('Preencha todos os campos!');
      this.setState({
        isLoading: false,
      });
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
              customStyles={{
                dateIcon: {
                  display: 'none', // removendo icon padrão
                },
                dateText: {color: '#fff'},
                dateInput: {
                  marginLeft: 36,
                  borderRadius: 50,
                  borderColor: '#f1f1f1',
                  backgroundColor: '#4caf50',
                },
              }}
              onDateChange={date => {
                this.setState({date});
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
              value={this.state.received}
              onValueChange={() =>
                this.setState({received: !this.state.received})
              }
            />
            <Text style={{marginLeft: 10}}>Recebido</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonLeft} onPress={this.addIncome}>
            <Text style={styles.textButton}>Adicionar</Text>
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
    backgroundColor: '#4caf50',
    marginBottom: 10,
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
  },
});

export default AddIncome;
