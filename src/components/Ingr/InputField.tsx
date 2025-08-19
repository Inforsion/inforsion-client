import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { ingrStyles } from '@/src/styles/IngrStyle';

type InputFieldProps = {
    label: string;
    placeholder: string;
    unit?: string;
    value: string;
    onChangeText: (value: string) => void;
};

const InputField = ({ label, placeholder, unit, value, onChangeText }: InputFieldProps) => (
    <View style={ingrStyles.row}>
        <View style={ingrStyles.col}>
            <Text style={ingrStyles.label}>{label}</Text>
            {unit && <Text style={ingrStyles.unitText}>{unit}</Text>}
        </View>
        <View style={ingrStyles.inputWrapper}>
            <TextInput
                placeholder={placeholder}
                style={ingrStyles.input}
                placeholderTextColor="#A0A0A0"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    </View>
);

export default InputField;
