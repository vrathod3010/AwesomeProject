import React from 'react';
import {Text, View} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const db = SQLite.openDatabase(
      {
        name: 'data.db',
        location: 'default',
        createFromLocation: '~www/data.db',
      },
      () => {
        console.log('Success');
      },
      error => {
        console.log(error);
      },
    );
    this.state = {
      db,
      users: [],
    };
  }

  render() {
    const {users} = this.state;
    return (
      <View>
        <Text>Hello</Text>
        {users.map((user, index) => (
          <View key={index}>
            <Text>{user.id}</Text>
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
          </View>
        ))}
      </View>
    );
  }

  componentDidMount() {
    const {db} = this.state;
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users;', [], (tx, results) => {
        console.log(results.rows.raw());
        const rows = results.raws;
        let users = [];
        for (let i = 0; i < rows.length; i++) {
          users.push({
            ...rows.item(i),
          });
        }
        this.setState({users});
      });
    });
  }

  componentWillUnmount() {
    const {db} = this.state;
    db.close();
  }
}
