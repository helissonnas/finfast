import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

class Home extends React.Component {
  state = {
    expenses: [],
    name: null,
    price: null,
    showForm: false,
    tags: [],
  };

  onPress = ev => {
    if (!this.state.showForm) {
      this.setState({showForm: true});
    } else {
      this.setState(
        {
          expenses: [
            ...this.state.expenses,
            {name: this.state.name, price: this.state.price, tags: []},
          ],
        },
        () => {
          this.setState({name: null, price: null, showForm: false});
        },
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.expenses}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text>
                {item.name} - R$ {item.price}
              </Text>
            </View>
          )}
          keyExtractor={item => item.name + Math.random()}
        />
        {this.state.showForm && (
          <View style={styles.row}>
            <TextInput
              placeholder="Nome"
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 16,
              }}
              onChangeText={text => this.setState({name: text})}
              value={this.state.name}
            />
            <TextInput
              keyboardType="number-pad"
              placeholder="Preço"
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={text => this.setState({price: text})}
              value={this.state.price}
            />
          </View>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            disabled={
              this.state.showForm && !this.state.name && !this.state.price
            }
            onPress={this.onPress}>
            <Text> {this.state.showForm ? '+' : '✍'} </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonRow: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 16,
  },
  row: {
    width: '100%',
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 70,
    height: 70,
    fontSize: 32,
    backgroundColor: '#e8d241',
  },
  card: {
    backgroundColor: '#e8e8e8',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
  },
});

export default Home;
