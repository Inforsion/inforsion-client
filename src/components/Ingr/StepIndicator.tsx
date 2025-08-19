import React from 'react';
import { View, Text } from 'react-native';
import { ingrStyles } from '@/src/styles/IngrStyle';

const StepIndicator = () => (
    <View style={ingrStyles.stepWrapper}>
        <View style={ingrStyles.stepCircle}>
            <Text style={ingrStyles.stepText}>1</Text>
        </View>
        <View style={[ingrStyles.stepCircle, { backgroundColor: '#E0E0E0' }]}>
            <Text style={{ color: '#A0A0A0', fontWeight: 'bold' }}>2</Text>
        </View>
    </View>
);

export default StepIndicator;
