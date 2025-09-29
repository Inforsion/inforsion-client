import { Colors } from '@/src/constants/Colors';
import React from 'react';
import { StyleSheet, TextInput, useColorScheme } from 'react-native';

interface CommonInputProps {
  type: 'text' | 'password';
  placeholder: string;
}

const CommonInput = ({ type, placeholder }: CommonInputProps) => {
  const styles = useStyles();

  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={type === 'password'}
      placeholderTextColor={styles.placeholderText.color}
    />
  );
};

const useStyles = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'] || Colors.light;
  const styles = StyleSheet.create({
    input: {
      height: 48,
      borderColor: colors.gray[500],
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 12,
    },
    placeholderText: {
      color: colors.gray[500],
    },
  });
  return styles;
};

export default CommonInput;
