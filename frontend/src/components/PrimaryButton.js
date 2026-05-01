import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({ title, onPress, outline }) {
  return (
    <TouchableOpacity
      style={[styles.btn, outline && styles.outline]}
      onPress={onPress}
    >
      <Text style={[styles.txt, outline && styles.txtOutline]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#38bdf8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  txt: { color: '#0f172a', fontWeight: 'bold' },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  txtOutline: { color: '#38bdf8' },
});
