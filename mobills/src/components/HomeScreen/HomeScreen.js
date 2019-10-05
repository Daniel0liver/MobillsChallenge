import React, {Component} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import mobillsImage from '../../Assets/logoMobills.png';
class ListExpense extends Component {
  static navigationOptions = {
    title: 'Home',
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
            onPress={() => this.props.navigation.push('ExpenseRoute')}>
            <Text style={styles.textButton}>Despesas</Text>
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
    marginVertical: 20,
    alignSelf: 'stretch',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 5,
  },
  textButton: {
    fontSize: 16,
    color: '#f13',
  },
});

export default ListExpense;

