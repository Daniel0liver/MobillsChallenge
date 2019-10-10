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

class EditIncome extends Component {
  constructor(props) {
    super(props);
    this.refIncome = firestore().collection('income'); // Pegando a referencia da tabela "expense"
    this.updateIncome = this.updateIncome.bind(this);
    this.state = {
      key: '',
      value: 0.0,
      description: '',
      date: new Date(),
      received: true,
      isDateTimePickerVisible: false,
      isLoading: true,
    };
  }

  static navigationOptions = {
    // Titulo da Página
    title: 'Editar Receita',
    headerStyle: {
      // Estilizando o menu
      backgroundColor: '#4caf50',
    },
    headerTintColor: '#fff',
  };

  componentDidMount() {
    const {navigation} = this.props;
    const ref = this.refIncome.doc(
      JSON.parse(navigation.getParam('incomeKey')),
    );

    // Listando todos os dados da despesa com id que está em ref
    ref.get().then(doc => {
      if (doc.exists) {
        const income = doc.data(); // Pegando os dados da despesa
        this.setState({
          key: doc.id,
          value: income.value,
          date: new Date(income.date._seconds * 1000), // Convertenda de timestamp para Date
          description: income.description,
          received: income.received,
          isLoading: false,
        });
      } else {
        alert(`O id não foi encotrado!`);
      }
    });
  }

  updateIncome() {
    this.setState({
      isLoading: true,
    });
    const updateRef = this.refIncome.doc(this.state.key);
    updateRef
      .update({
        value: parseFloat(this.state.value),
        description: this.state.description,
        date: new moment(this.state.date).toDate(),
        received: this.state.received,
      })
      .then(docRef => {
        this.setState({
          key: '',
          value: 0.0,
          description: '',
          date: new Date(),
          received: true,
          isLoading: false,
        });
        this.props.navigation.navigate('IncomeRoute');
      })
      .catch(error => {
        console.error('Error adding document: ', error);
        this.setState({
          isLoading: false,
        });
      });
  }

  deleteIncome(key) {
    const {navigation} = this.props;
    this.setState({
      isLoading: true,
    });

    this.refIncome
      .doc(key)
      .delete()
      .then(() => {
        this.setState({
          isLoading: false,
        });
        this.props.navigation.navigate('IncomeRoute');
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
              // Estou convertendo a data pois estava no padrão americano e estou mostrando no padrão br,
              // logo o tamanho é desproporcional e da erro invalid date
              date={this.state.date}
              mode="date"
              placeholder="selecione a data"
              format="DD/MM/YYYY"
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
              value={this.state.received}
              onValueChange={received => this.setState({received})}
            />
            <Text style={{marginLeft: 10}}>Está pago</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={this.updateIncome}>
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
                    onPress: () => this.deleteIncome(this.state.key),
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
    backgroundColor: '#4caf50',
    marginBottom: 10,
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
  },
});

export default EditIncome;
