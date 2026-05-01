import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from '../lib/axios';

export default function BachatDetailScreen({ route }) {
  const { id } = route.params;
  const [b, setB] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/bachats/${id}`)
      .then(r => setB(r.data.data))
      .catch(() => {});
  }, [id]);
  if (!b)
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: '#0f172a' }}>
        <ActivityIndicator />
      </View>
    );
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
        {b.name}
      </Text>
      <Text style={{ color: '#cbd5e1' }}>{b.description}</Text>
      <Text style={{ color: '#fff', marginTop: 10 }}>Members:</Text>
      {b.members.map(m => (
        <Text key={m.user._id} style={{ color: '#cbd5e1' }}>
          {m.user.name} - {m.role}
        </Text>
      ))}
    </View>
  );
}
