import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingVertical: 12, marginBottom: 8 },
  title: { fontSize: 20, color: '#38bdf8', fontWeight: 'bold' },
});
