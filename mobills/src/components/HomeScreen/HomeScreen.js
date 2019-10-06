import React, {Component} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import mobillsImage from '../../Assets/logoMobills.png';

import Ionicons from 'react-native-vector-icons/Ionicons';
class ListExpense extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      // Estilizando o menu
      backgroundColor: '#2173d2',
    },
    headerTintColor: '#fff',
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundView} />
        <Image source={mobillsImage} style={styles.mobillsImage} />
        <View style={styles.box}>
          <Text style={styles.boxText}>Visão geral</Text>
          <TouchableOpacity
            style={styles.buttonLeft}
            //onPress={() => this.props.navigation.push('ExpenseRoute')}
          >
            <Ionicons
              name="ios-trending-up"
              style={{fontSize: 20, color: '#4caf50'}}
            />
            <Text style={styles.textButtonIncome}>Receitas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={() => this.props.navigation.push('ExpenseRoute')}>
            <Ionicons
              name="ios-trending-down"
              style={{fontSize: 20, color: '#f44336'}}
            />
            <Text style={styles.textButtonExpense}>Despesas</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  backgroundView: {
    position: 'absolute',
    flex: 1,
    top: 0,
    backgroundColor: '#2173d2',
    width: 400,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 300,
  },
  mobillsImage: {
    width: 150,
    height: 150,
  },
  box: {
    height: 200,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    padding: 20,
    borderRadius: 10,
    marginBottom: 250,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#c3c3c3',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.0,
    shadowRadius: 10,
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  boxText: {
    fontSize: 17,
    color: '#333',
  },
  buttonLeft: {
    flexDirection: 'row',
    marginVertical: 1,
    alignSelf: 'stretch',
    paddingVertical: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
  },
  textButtonIncome: {
    fontSize: 16,
    color: '#4caf50',
    marginHorizontal: 10,
  },
  textButtonExpense: {
    fontSize: 16,
    color: '#f44336',
    marginHorizontal: 10,
  },
});

export default ListExpense;

