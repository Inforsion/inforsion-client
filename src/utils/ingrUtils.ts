import { Platform } from 'react-native';

export const getBaseUrl = () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';
    if (Platform.OS === 'android' && apiUrl.includes('localhost')) {
        return apiUrl.replace('localhost', '10.0.2.2');
    }
    return apiUrl;
};

export const parseNumber = (raw: string) => {
    const onlyNumber = (raw ?? '').toString().replace(/[^0-9.]/g, '');
    return onlyNumber ? Number(onlyNumber) : 0;
};

export const parseUnit = (raw: string) => {
    const unit = raw.replace(/[0-9.]/g, '').trim();
    return unit || '개';
};