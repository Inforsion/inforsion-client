import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import CommonModal from '@/src/components/common/CommonModal';

interface CreateIngrModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        capacity: string;
        quantity: string;
        price: string;
    }) => Promise<void>;
    loading: boolean;
}

const CreateIngrModal = ({
                             visible,
                             onClose,
                             onSubmit,
                             loading,
                         }: CreateIngrModalProps) => {
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const [focus, setFocus] = useState({
        name: false,
        capacity: false,
        quantity: false,
        price: false,
    });

    useEffect(() => {
        if (!visible) {
            resetForm();
        }
    }, [visible]);

    const resetForm = () => {
        setName('');
        setCapacity('');
        setQuantity('');
        setPrice('');
        setFocus({ name: false, capacity: false, quantity: false, price: false });
    };

    const handleSave = async () => {
        if (!name.trim() || !capacity.trim() || !quantity.trim() || !price.trim()) {
            Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
            return;
        }

        await onSubmit({ name, capacity, quantity, price });
        resetForm();
    };

    return (
        <CommonModal visible={visible} onClose={onClose}>
            <View style={modalStyles.header}>
                <Text style={modalStyles.title}>재료추가</Text>
            </View>

            <View style={modalStyles.form}>
                <View>
                    <Text style={modalStyles.label}>재료 이름</Text>
                    <View
                        style={[
                            modalStyles.inputBox,
                            focus.name && modalStyles.inputBoxActive,
                        ]}
                    >
                        <TextInput
                            placeholder="이름을 입력하세요"
                            placeholderTextColor="#B5B7BD"
                            value={name}
                            onChangeText={setName}
                            onFocus={() => setFocus((p) => ({ ...p, name: true }))}
                            onBlur={() => setFocus((p) => ({ ...p, name: false }))}
                            style={modalStyles.input}
                        />
                    </View>
                </View>

                <View style={modalStyles.row2}>
                    <View style={modalStyles.col}>
                        <Text style={modalStyles.label}>용량</Text>
                        <View
                            style={[
                                modalStyles.inputBox,
                                focus.capacity && modalStyles.inputBoxActive,
                            ]}
                        >
                            <TextInput
                                placeholder="예) 18g, 0.5kg"
                                placeholderTextColor="#B5B7BD"
                                value={capacity}
                                onChangeText={setCapacity}
                                onFocus={() =>
                                    setFocus((p) => ({ ...p, capacity: true }))
                                }
                                onBlur={() =>
                                    setFocus((p) => ({ ...p, capacity: false }))
                                }
                                style={modalStyles.input}
                            />
                        </View>
                    </View>

                    <View style={modalStyles.col}>
                        <Text style={modalStyles.label}>재고</Text>
                        <View
                            style={[
                                modalStyles.inputBox,
                                focus.quantity && modalStyles.inputBoxActive,
                            ]}
                        >
                            <TextInput
                                placeholder="재고 수량"
                                placeholderTextColor="#B5B7BD"
                                keyboardType="number-pad"
                                value={quantity}
                                onChangeText={setQuantity}
                                onFocus={() =>
                                    setFocus((p) => ({ ...p, quantity: true }))
                                }
                                onBlur={() =>
                                    setFocus((p) => ({ ...p, quantity: false }))
                                }
                                style={modalStyles.input}
                            />
                        </View>
                    </View>
                </View>

                <View style={modalStyles.row2}>
                    <View style={{ flex: 1 }}>
                        <Text style={modalStyles.label}>단가(원)</Text>
                        <View
                            style={[
                                modalStyles.inputBox,
                                focus.price && modalStyles.inputBoxActive,
                            ]}
                        >
                            <TextInput
                                placeholder="가격을 입력하세요"
                                placeholderTextColor="#B5B7BD"
                                keyboardType="number-pad"
                                value={price}
                                onChangeText={setPrice}
                                onFocus={() =>
                                    setFocus((p) => ({ ...p, price: true }))
                                }
                                onBlur={() =>
                                    setFocus((p) => ({ ...p, price: false }))
                                }
                                style={modalStyles.input}
                            />
                        </View>
                    </View>

                    <View style={modalStyles.saveRight}>
                        <TouchableOpacity
                            onPress={handleSave}
                            style={modalStyles.saveBtn}
                            disabled={loading}
                        >
                            <Text style={modalStyles.saveBtnText}>
                                {loading ? '저장 중...' : '저장'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </CommonModal>
    );
};

export default CreateIngrModal;

const modalStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: { fontSize: 16, fontWeight: '700', color: '#383838' },
    form: { marginTop: 24, gap: 32 },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D2D2D',
        marginBottom: 12,
    },
    inputBox: {
        borderWidth: 1,
        borderColor: '#D8DADF',
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 48,
        justifyContent: 'center',
    },
    inputBoxActive: {
        borderWidth: 1.5,
        borderColor: '#006FFD',
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 48,
        justifyContent: 'center',
    },
    input: { fontSize: 16, color: '#15181E' },
    row2: { flexDirection: 'row', gap: 16 },
    col: { flex: 1 },
    saveRight: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    saveBtn: {
        backgroundColor: '#406ADF',
        height: 48,
        paddingHorizontal: 36,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveBtnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});