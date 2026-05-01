import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from '../lib/axios';

export default function BachatsScreen({ navigation }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    let mounted = true;
    axios
      .get('/api/bachats/')
      .then(r => mounted && setList(r.data.data))
      .catch(() => {});
    return () => (mounted = false);
  }, []);
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#0f172a' }}>
      <Text
        style={{
          color: '#38bdf8',
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 12,
        }}
      >
        Bachats
      </Text>
      {list.map(b => (
        <View key={b._id} style={{ marginVertical: 8 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{b.name}</Text>
          <Text style={{ color: '#cbd5e1' }}>{b.description}</Text>
          <Button
            title="Open"
            onPress={() => navigation.navigate('BachatDetail', { id: b._id })}
          />
        </View>
      ))}
    </View>
  );
}
