import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../state/authContext';

export default function LoginScreen() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  async function onLogin() {
    setLoading(true);
    try {
      await signIn({ mobile, password });
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

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
        BachatGat Login
      </Text>
      <TextInput
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
        style={{
          backgroundColor: '#fff',
          padding: 8,
          marginBottom: 12,
          borderRadius: 6,
        }}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: '#fff',
          padding: 8,
          marginBottom: 12,
          borderRadius: 6,
        }}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <PrimaryButton title="Sign in" onPress={onLogin} />
      )}
    </View>
  );
}
