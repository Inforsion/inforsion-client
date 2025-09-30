import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
    TextInput,
    StyleSheet,
} from 'react-native';
import { ingrStyles } from '@/src/styles/IngrStyle';
import StockListItem from '@/src/components/Ingr/StockListItem';
import CommonModal from '@/src/components/common/CommonModal';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';

type StockItem = {
    id: string;
    name: string;
    price: number;
    stock: string;
    quantity: number;
    price: number;
    imageUri?: string | null;
};

const Ingr = () => {
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const [stockList, setStockList] = useState<StockItem[]>([]);
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [focus, setFocus] = useState({
        name: false,
        capacity: false,
        quantity: false,
        price: false,
    });


    const toggleSelect = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = () => {
        if (selected.length === 0) return;
        setStockList(prev => prev.filter(item => !selected.includes(item.id)));
        setSelected([]);
    };

    const handleSubmit = () => {
        if (!name.trim() || !capacity.trim() || !quantity.trim() || !price.trim()) {
            Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
            return;
        }
        const newItem: StockItem = {
            id: String(Date.now()),
            name: name.trim(),
            stock: capacity.trim(),
            quantity: Number(quantity),
            price: Number(price),
        };

        setStockList([...stockList, newItem]);

        setName('');
        setPrice('');
        setStock('');
        setQuantity('');
        setPhoto(null);
    };
    return (
        <View style={[ingrStyles.container, { paddingBottom: 40 }]}>
            {/* 상단 */}
            <Text style={screenStyles.pageTitle}>재료 등록</Text>
            <View style={ingrStyles.headerRow}>
                <Text style={screenStyles.pageSub}>
                    {effectiveSelectMode
                        ? '레시피에 들어갈 재료를 선택하세요.'
                        : '재료를 등록하고 편리하게 메뉴를 관리해보세요.'}
                </Text>

                {effectiveSelectMode ? (
                    <TouchableOpacity onPress={finishSelection} disabled={selected.length === 0}>
                        <Text
                            style={[
                                ingrStyles.editText,
                                { color: '#4E71D3' },
                                selected.length === 0 && { opacity: 0.35 },
                            ]}
                        >
                            확인
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => {
                            setEdit((m) => !m);
                            setSelected([]);
                        }}
                    >
                        <Text style={ingrStyles.editText}>{edit ? '완료' : '편집'}</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={[ingrStyles.card, screenStyles.cardElevated]}>
                <View style={[ingrStyles.tableHeader, screenStyles.headerThin]}>
                    <Text style={[ingrStyles.th, screenStyles.thName]}>재료 이름</Text>
                    <Text style={[ingrStyles.th, screenStyles.thSmall]}>용량</Text>
                    <Text style={[ingrStyles.th, screenStyles.thSmall]}>재고</Text>
                    <Text style={[ingrStyles.th, screenStyles.thSmall]}>가격</Text>
                </View>

                {stockList.length === 0 ? (
                    <View style={screenStyles.emptyWrap}>
                        <Text style={screenStyles.emptyText}>저장된 재료가 없습니다.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={stockList}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <StockListItem
                                item={item}
                                edit={showCheckboxes}
                                selected={selected.includes(item.id)}
                                onToggle={() => toggleSelect(item.id)}
                            />
                        )}
                        showsVerticalScrollIndicator
                        style={screenStyles.list}
                        contentContainerStyle={{ paddingBottom: 8 }}
                    />
                )}

                {!effectiveSelectMode && edit && selected.length > 0 && (
                    <TouchableOpacity
                        onPress={handleDeleteSelected}
                        style={ingrStyles.deleteBtn}
                        activeOpacity={0.9}
                    >
                        <Text style={ingrStyles.deleteBtnText}>삭제</Text>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity
                style={screenStyles.outlineBtn}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={screenStyles.outlineBtnText}>재료추가</Text>
            </TouchableOpacity>

            <CommonModal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
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
                                    placeholder="용량을 입력하세요"
                                    placeholderTextColor="#B5B7BD"
                                    value={capacity}
                                    onChangeText={setCapacity}
                                    onFocus={() => setFocus((p) => ({ ...p, capacity: true }))}
                                    onBlur={() => setFocus((p) => ({ ...p, capacity: false }))}
                                    style={modalStyles.input}
                                />
                            </View>
                        </View>

            </ScrollView>
        </View>
    );
};

export default Ingr;


const screenStyles = StyleSheet.create({
    pageTitle: { fontSize: 20, fontWeight: '700', color: '#222', marginBottom: 6 },
    pageSub: { fontSize: 13, color: '#7D7D7D', marginBottom: 14 },
    cardElevated: {
        borderWidth: 0,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 18,
        elevation: 4,
    },
    headerThin: { borderBottomColor: '#ECEDEF', backgroundColor: '#FAF9F9' },
    thName: { flex: 1, textAlign: 'left', paddingLeft: 6 },
    thSmall: { flex: 1 },
    emptyWrap: { paddingVertical: 24, alignItems: 'center' },
    emptyText: { color: '#9AA0A6' },
    list: { maxHeight: 360 },
    outlineBtn: {
        alignSelf: 'center',
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#D7D9DE',
        borderRadius: 10,
        height: 44,
        paddingHorizontal: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outlineBtnText: { color: '#5A5F6A', fontSize: 14, fontWeight: '600' },
});

const modalStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: { fontSize: 16, fontWeight: '700', color: '#383838' },
    form: { marginTop: 24, gap: 32 },
    label: { fontSize: 14, fontWeight: '600', color: '#2D2D2D', marginBottom: 12 },
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
    saveRight: { flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' },
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
