/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import 'moment/locale/pt-br';

class IncomeScreen extends Component {
  constructor() {
    super();
    this.refExpense = firestore().collection('income');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      incomes: [],
    };
  }
  static navigationOptions = {
    title: 'Receitas',
    headerStyle: { // Estilizando o menu
      backgroundColor: '#4caf50',
    },
    headerTintColor: '#fff',
  };

  onCollectionUpdate = querySnapshot => {
    const incomes = [];
    querySnapshot.forEach(doc => {
      const {value, description, date, received} = doc.data();
      incomes.push({
        key: doc.id,
        doc, // DocumentSnapshot
        value,
        description,
        date,
        received,
      });
    });
    this.setState({
      incomes,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.refExpense.onSnapshot(this.onCollectionUpdate);
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
      <SafeAreaView>
        <ScrollView style={styles.container}>
          {this.state.incomes.map((item, i) => (
            <ListItem
              key={i}
              style={styles.item}
              title={item.description}
              titleStyle={{color:'#333'}}
              subtitle={moment(item.date.toDate())
                .locale('pt-br')
                .format('LL')}
              rightTitle={`R$ ${item.value
                .toFixed(2) // casas decimais
                .replace('.', ',')}`} // Alterando valor com (.) para (,)
              rightTitleStyle={{color: '#4caf50'}}
              rightSubtitle={
                item.received === true ? (
                  <View
                    style={{
                      backgroundColor: '#4caf50',
                      borderRadius: 50,
                      paddingHorizontal: 10,
                      marginTop: 5,
                    }}>
                    <Text style={styles.textStatusExpense}>Recebido</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: '#e8b723',
                      borderRadius: 50,
                      paddingHorizontal: 10,
                      marginTop: 5,
                    }}>
                    <Text style={styles.textStatusExpense}>Pendente</Text>
                  </View>
                )
              }
              bottomDivider
              leftIcon={
                <Ionicons
                  name="ios-trending-up"
                  size={16}
                  style={styles.leftIconExpense}
                />
              }
              onPress={() => {
                this.props.navigation.navigate('EditIncomeRoute', {
                  incomeKey: `${JSON.stringify(item.key)}`,
                });
              }}
            />
          ))}
        </ScrollView>
        <View>
          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={() => this.props.navigation.navigate('AddIncomeRoute')}>
            <IconAntDesign name="plus" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  },
  item: {
    height: 65,
  },
  leftIconExpense: {
    color: '#fff',
    backgroundColor: '#4caf50',
    borderRadius: 50,
    paddingHorizontal: 11,
    paddingVertical: 10,
  },
  statusExpense: {
    backgroundColor: '#4caf50',
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  textStatusExpense: {
    color: '#fff',
    fontSize: 12,
  },
  buttonLeft: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 20,
    bottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#4caf50',
  },
  icon: {
    color: '#fff',
    fontSize: 18,
  },
  textButton: {
    fontSize: 25,
    color: '#fff',
  },
});

export default IncomeScreen;
