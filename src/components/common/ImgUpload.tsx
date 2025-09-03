import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CameraImg from '@/assets/images/Ingr/camera.png';

type Props = {
    value?: string | null;
    onChange: (uri: string | null) => void;
};

const ImgUpload = ({ value, onChange }: Props) => {
    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('사진 라이브러리 접근 권한이 필요합니다.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], // RN 0.74+ 권장 방식 (expo-image-picker 최신 경고 회피)
            allowsEditing: true,
            quality: 0.9,
        });

        if (!result.canceled && result.assets?.length > 0) {
            onChange(result.assets[0].uri);
        }
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={handlePickImage}>
            <View style={styles.circle}>
                {value ? (
                    <Image source={{ uri: value }} style={styles.photo} />
                ) : (
                    <>
                        <Image source={CameraImg} />
                        <Text style={styles.helper}>사진을 등록해주세요</Text>
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default ImgUpload;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    circle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    helper: {
        marginTop: 10,
        color: '#515151',
        fontSize: 10,
    },
    photo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
