import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
});
