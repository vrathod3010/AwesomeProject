import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

export default Test = props => {
  const {data, setData} = useState(0);

  const db = SQLite.openDatabase(
    {
      name: 'test.db',
      location: 'default',
      createFromLocation: '~www/test.db',
    },
    db => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM users;', [], (tx, results) => {
          const rows = results.rows.raw();
          setData(rows);
          console.log(raws);
        });
      });
    },
    error => {
      console.log(error);
    },
  );

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users;', [], (tx, results) => {
        const rows = results.rows.raw();
        setData(rows);
        console.log(raws);
      });
    });
  }, [data]);

  return (
    <View>
      <Text style={{textAlign: 'center', fontSize: 30}}>Hello</Text>
      <Text>{data}</Text>
    </View>
  );
};
