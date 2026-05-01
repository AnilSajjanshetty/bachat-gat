import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from './src/lib/axios';

const Stack = createNativeStackNavigator();

import { AuthContext } from './src/state/authContext';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import BachatsScreen from './src/screens/BachatsScreen';
import BachatDetailScreen from './src/screens/BachatDetailScreen';

export default function App() {
  const [state, setState] = useState({
    user: null,
    token: null,
    loading: true,
  });

  useEffect(() => {
    // try to load token from storage (omitted for brevity)
    setState(s => ({ ...s, loading: false }));
  }, []);

  const auth = {
    user: state.user,
    async signIn({ mobile, password }: { mobile: string; password: string }) {
      const res: any = await axios.post('/api/auth/login', {
        mobile,
        password,
      });
      const token = res.data.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const me: any = await axios
        .get('/api/users/me')
        .then((r: any) => r.data.data)
        .catch(() => null);
      setState({ user: me, token, loading: false });
    },
    signOut() {
      delete axios.defaults.headers.common['Authorization'];
      setState({ user: null, token: null, loading: false });
    },
  };
  const authAny = auth as any;
  if (state.loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authAny}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.user ? (
              <>
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="Bachats" component={BachatsScreen} />
                <Stack.Screen
                  name="BachatDetail"
                  component={BachatDetailScreen}
                />
              </>
            ) : (
              <Stack.Screen name="Login" component={LoginScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f172a' },
  title: {
    fontSize: 22,
    color: '#38bdf8',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 8,
    borderRadius: 6,
  },
});
