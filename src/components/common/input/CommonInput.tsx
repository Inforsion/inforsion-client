import { Colors } from '@/src/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

interface CommonInputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  type?: 'text' | 'password';
  placeholder?: string;
}

const CommonInput = ({ type = 'text', placeholder, style, ...restProps }: CommonInputProps) => {
  const styles = useStyles();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'] || Colors.light;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, type === 'password' && styles.inputWithIcon, style]}
        placeholder={placeholder}
        secureTextEntry={type === 'password' && !isPasswordVisible}
        placeholderTextColor={colors.gray[500]}
        {...restProps}
      />
      {type === 'password' && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={togglePasswordVisibility}
          activeOpacity={0.7}
        >
          <Ionicons
            name={!isPasswordVisible ? 'eye-off' : 'eye'}
            size={16}
            color={colors.gray[500]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const useStyles = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'] || Colors.light;

  return StyleSheet.create({
    container: {
      position: 'relative',
      width: '100%',
    },
    input: {
      height: 48,
      borderColor: colors.gray[500],
      borderWidth: 1,
      paddingHorizontal: 16,
      borderRadius: 12,
      fontSize: 14,
      color: colors.text.primary,
      backgroundColor: colors.background.primary,
    },
    inputWithIcon: {
      paddingRight: 48,
    },
    iconButton: {
      position: 'absolute',
      right: 16,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: 24,
    },
  });
};

export default CommonInput;
