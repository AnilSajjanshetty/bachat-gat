import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../state/authContext';

export default function DashboardScreen({ navigation }) {
  const { user, signOut } = useAuth();
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
        Welcome {user?.name || user?.mobile}
      </Text>
      <Text style={{ color: '#cbd5e1', marginBottom: 12 }}>
        Role: {user?.role}
      </Text>
      <Button
        title="Manage Bachats"
        onPress={() => navigation.navigate('Bachats')}
      />
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}
