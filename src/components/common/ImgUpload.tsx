import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ingrStyles } from '@/src/styles/IngrStyle';
import CameraImg from "@/assets/images/Ingr/camera.png";

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
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.9,
        });

        if (!result.canceled && result.assets?.length > 0) {
            onChange(result.assets[0].uri);
        }
    };

    return (
        <TouchableOpacity
            style={ingrStyles.photoUpload}
            activeOpacity={0.8}
            onPress={handlePickImage}
        >
            <View style={ingrStyles.photoIconCircle}>
                {value ? (
                    <Image source={{ uri: value }} style={ingrStyles.photoImage} />
                ) : (
                    <>
                        <Image source={CameraImg} />
                        <Text style={ingrStyles.photoText}>사진을 등록해주세요</Text>
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default ImgUpload;
