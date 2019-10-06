/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  CheckBox,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontIsto from 'react-native-vector-icons/Fontisto';
import firestore from '@react-native-firebase/firestore';

const refExpense = firestore().collection('despesa');

class AddExpense extends Component {
  state = {
    value: 0,
    description: '',
    date: new Date().toLocaleDateString('pt-BR'),
    paidOut: true,
    isAdded: false,
    isDateTimePickerVisible: false,
  };
  
  static navigationOptions = {
    title: 'Adicionar Despesa',
  };

  addExpense = async () => {
    const {value, description, date, paidOut} = this.state;

    try {
      await refExpense.add({
        value: parseFloat(value),
        description: description,
        date: Date(date),
        paidOut: paidOut, 
      });
      this.setState({isAdded: true});
    } catch (err) {
      alert(err);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enable={Platform.OS === 'ios'} style={styles.container}>
        <View>
          <View style={styles.fields}>
            <IconMaterialIcons name="attach-money" style={styles.icon}/>
            <TextInput
              style={styles.input}
              placeholder="Insira um valor"
              keyboardType={'number-pad'}
              value={this.state.value}
              onChangeText={value => this.setState({value})}/>
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
              onChangeText={description => this.setState({description})} />
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
            <Text>Adicionar</Text>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
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

export default AddExpense;
