import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Alert,
    TextInput,
    StyleSheet,
} from 'react-native';
import { ingrStyles } from '@/src/styles/IngrStyle';
import StepIndicator from '@/src/components/Ingr/StepIndicator';
import InputField from '@/src/components/Ingr/InputField';
import StockListItem from '@/src/components/Ingr/StockListItem';
import ImgUpload from "@/src/components/common/ImgUpload";

const CameraImg = require('@/assets/images/Ingr/camera.png');

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
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [quantity, setQuantity] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);
    const [stockList, setStockList] = useState<StockItem[]>([]);
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);


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
        if (!name.trim() || !price.trim() || !stock.trim() || !quantity.trim()) {
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
