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
  Alert,
} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

class EditExpense extends Component {
  constructor(props) {
    super(props);
    this.refExpense = firestore().collection('expense'); // Pegando a referencia da tabela "expense"
    this.updateExpense = this.updateExpense.bind(this);
    this.state = {
      key: '',
      value: 0.0,
      description: '',
      date: new Date(),
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
      JSON.parse(navigation.getParam('expenseKey')),
    );

    // Listando todos os dados da despesa com id que está em ref
    ref.get().then(doc => {
      if (doc.exists) {
        const expense = doc.data(); // Pegando os dados da despesa
        this.setState({
          key: doc.id,
          value: expense.value,
          date: new Date(expense.date._seconds * 1000), // Convertenda de timestamp para Date
          description: expense.description,
          paidOut: expense.paidOut,
          isLoading: false,
        });
      } else {
        alert(`O id não foi encotrado!`);
      }
    });
  }

  updateExpense() {
    this.setState({
      isLoading: true,
    });
    const updateRef = this.refExpense.doc(this.state.key);

    if (this.state.value > 0 && this.state.description !== '') {
      updateRef
        .update({
          value: parseFloat(this.state.value),
          description: this.state.description,
          date: new moment(this.state.date).toDate(),
          paidOut: this.state.paidOut,
        })
        .then(docRef => {
          this.setState({
            key: '',
            value: 0.0,
            description: '',
            date: new Date(),
            paidOut: true,
            isLoading: false,
          });
          this.props.navigation.navigate('ExpenseRoute');
        })
        .catch(error => {
          console.error('Error adding document: ', error);
          this.setState({
            isLoading: false,
          });
        });
    } else {
      alert('Preencha todos os campos com valores validos!');
      this.setState({
        isLoading: false,
      });
    }
  }

  deleteExpense(key) {
    const {navigation} = this.props;
    this.setState({
      isLoading: true,
    });

    this.refExpense
      .doc(key)
      .delete()
      .then(() => {
        this.setState({
          isLoading: false,
        });
        this.props.navigation.navigate('ExpenseRoute');
      })
      .catch(err => {
        alert('Não foi possivel excluir', err)
        this.setState({
          isLoading: false,
        });
      });
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
      <KeyboardAvoidingView
        behavior="padding"
        enable={Platform.OS === 'ios'}
        style={styles.container}>
        <View>
          <View style={styles.fields}>
            <IconMaterialIcons name="attach-money" style={styles.icon} />
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
            <IconMaterialIcons name="date-range" style={styles.icon} />
            <DatePicker
              style={{width: 200}}
              // Estou deixando a data no padrão americano pois estava dando erro ao add e não consegui corrigir
              date={this.state.date}
              mode="date"
              placeholder="selecione a data"
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
                this.setState({date});
              }}
            />
          </View>
          <View style={styles.fields}>
            <IconMaterialIcons name="description" style={styles.icon} />
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
              onValueChange={paidOut => this.setState({paidOut})}
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

          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={() => {
              Alert.alert(
                'Deletar Despesa',
                'Você realmente deseja excluir essa despesa?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'Cancelar',
                  },
                  {
                    text: 'Excluir',
                    onPress: () => this.deleteExpense(this.state.key),
                  },
                ],
                {cancelable: false},
              );
            }}>
            <Text style={styles.textButton}>Excluir</Text>
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

export default EditExpense;
