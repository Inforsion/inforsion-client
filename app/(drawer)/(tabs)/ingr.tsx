import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import { ingrStyles } from '@/src/styles/IngrStyle';
import Icon from '@/src/components/common/Icon';
import DeleteBtnSVG from '@/assets/images/Ingr/DeleteBtn.svg';

import StockListItem from '@/src/components/Ingr/StockListItem';
import CreateIngrModal from '@/src/components/Ingr/CreateIngrModal';

import { useIngredients } from '@/hooks/ingredient/useIngredients';
import { useCreateIngr, IngredientPayload } from '@/hooks/ingredient/useCreateIngr';
import { parseNumber, parseUnit, getBaseUrl } from '@/src/utils/ingrUtils';


const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
};

const Ingr = () => {
    const STORE_ID = Number(process.env.EXPO_PUBLIC_TEMP_STORE_ID || 0);
    const ACCESS_TOKEN = process.env.EXPO_PUBLIC_TEMP_ACCESS_TOKEN || "";

    const baseUrl = getBaseUrl();

    const {
        stockList,
        isLoading,
        isRefreshing,
        onRefresh,
        fetchIngredients,
        deleteIngredients
    } = useIngredients(STORE_ID);

    const { mutateAsync: createIngrApi, loading: creating } = useCreateIngr();

    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (STORE_ID === 0) {
            Alert.alert("설정 오류", "가게 ID를 확인해주세요.");
        }
    }, [STORE_ID]);

    const handleEditToggle = () => {
        setEdit((prev) => !prev);
        setSelected([]);
    };


    const toggleSelect = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id],
        );
    };


    const handleDeleteSelected = () => {
        if (!selected.length) return;

        Alert.alert(
            '재료 삭제',
            `선택한 ${selected.length}개의 재료를 삭제할까요?`,
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '삭제',
                    style: 'destructive',
                    onPress: async () => {
                        const success = await deleteIngredients(selected);
                        if (success) {
                            setSelected([]);
                            Alert.alert('성공', '선택한 재료가 삭제되었습니다.');
                        } else {
                            Alert.alert('삭제 실패', '오류가 발생했습니다.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };


    const handleCreateSubmit = async (data: { name: string; capacity: string; quantity: string; price: string }) => {
        const unit = parseUnit(data.capacity);
        const unitCapacity = parseNumber(data.capacity);
        const stockPrice = Number(data.price);
        const stockQuantity = Number(data.quantity);

        const payload: IngredientPayload = {
            storeId: STORE_ID,
            name: data.name.trim(),
            unit: unit,
            stockPrice: stockPrice,
            unitCapacity: unitCapacity,
            stockQuantity: stockQuantity,
        };

        try {
            const createdIngr = await createIngrApi(payload, ACCESS_TOKEN);

            if (!createdIngr || !createdIngr.id) {
                throw new Error("재료 생성 응답에 고유 ID가 없습니다.");
            }

            const today = new Date();
            const nextYear = new Date();
            nextYear.setFullYear(today.getFullYear() + 1);

            const inventoryPayload = {
                storeId: STORE_ID,
                ingredientId: createdIngr.id,
                ingredientName: payload.name,
                unit: payload.unit,
                currentStock: payload.stockQuantity,
                minStock: 0,
                maxStock: 9999,
                unitCost: payload.stockPrice,
                expiryDate: formatDate(nextYear),
                lastRestockedDate: formatDate(today)
            };

            const inventoryResponse = await fetch(`${baseUrl}/api/v1/inventory`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inventoryPayload)
            });

            if (!inventoryResponse.ok) {
                const errText = await inventoryResponse.text();
                console.error("인벤토리 등록 실패:", errText);
                throw new Error('재료는 등록되었으나 재고 연동에 실패했습니다.');
            }


            await fetchIngredients();
            setIsModalVisible(false);

            Alert.alert('성공', '재료 및 초기 재고가 정상 등록되었습니다.');
        } catch (e: any) {
            Alert.alert('등록 실패', e?.message ?? '오류가 발생했습니다.');
        }
    };

    return (
        <View style={[ingrStyles.container, { paddingBottom: 40 }]}>
            <Text style={screenStyles.pageTitle}>재료 등록</Text>
            <View style={ingrStyles.headerRow}>
                <Text style={screenStyles.pageSub}>
                    재료를 등록하고 편리하게 메뉴를 관리해보세요.
                </Text>

                <TouchableOpacity onPress={handleEditToggle}>
                    <Text style={ingrStyles.editText}>{edit ? '완료' : '편집'}</Text>
                </TouchableOpacity>
            </View>


            <View style={[ingrStyles.card, screenStyles.cardElevated]}>
                <View style={[ingrStyles.tableHeader, screenStyles.headerThin]}>
                    {edit ? <View style={ingrStyles.checkboxSlot} /> : null}
                    <Text style={[ingrStyles.th, ingrStyles.thName]}>재료 이름</Text>
                    <Text style={[ingrStyles.th, ingrStyles.thSmall]}>용량</Text>
                    <Text style={[ingrStyles.th, ingrStyles.thSmall]}>재고</Text>
                    <Text style={[ingrStyles.th, ingrStyles.thSmall]}>가격</Text>

                    <View style={ingrStyles.dragHandle}>
                        {edit && (
                            <TouchableOpacity
                                onPress={handleDeleteSelected}
                                activeOpacity={0.8}
                                disabled={!selected.length}
                                style={!selected.length ? { opacity: 0.3 } : undefined}
                            >
                                <Icon icon={DeleteBtnSVG} size={18} color="#FF9C9C" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {!isLoading && stockList.length === 0 ? (
                    <View style={screenStyles.emptyWrap}>
                        <Text style={screenStyles.emptyText}>
                            저장된 재료가 없습니다.
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={stockList}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <StockListItem
                                item={item}
                                edit={edit}
                                selected={selected.includes(item.id)}
                                onToggle={() => toggleSelect(item.id)}
                            />
                        )}
                        onRefresh={onRefresh}
                        refreshing={isRefreshing}
                        showsVerticalScrollIndicator
                        style={screenStyles.list}
                        contentContainerStyle={{ paddingBottom: 8 }}
                        ListFooterComponent={
                            isLoading && !isRefreshing ? (
                                <ActivityIndicator style={{ marginTop: 20 }} />
                            ) : null
                        }
                    />
                )}
            </View>

            <TouchableOpacity
                style={screenStyles.outlineBtn}
                onPress={() => setIsModalVisible(true)}
                disabled={creating}
            >
                <Text style={screenStyles.outlineBtnText}>
                    {creating ? '등록 중...' : '재료추가'}
                </Text>
            </TouchableOpacity>

            <CreateIngrModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSubmit={handleCreateSubmit}
                loading={creating}
            />
        </View>
    );
};

export default Ingr;

const screenStyles = StyleSheet.create({
    pageTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#222',
        marginBottom: 6,
    },
    pageSub: {
        fontSize: 13,
        color: '#7D7D7D',
        marginBottom: 14,
    },
    cardElevated: {
        borderWidth: 0,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 18,
        elevation: 4,
    },
    headerThin: {
        borderBottomColor: '#ECEDEF',
        backgroundColor: '#FAF9F9',
    },
    emptyWrap: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    emptyText: {
        color: '#9AA0A6',
    },
    list: {
        maxHeight: 360,
    },
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
    outlineBtnText: {
        color: '#5A5F6A',
        fontSize: 14,
        fontWeight: '600',
    },
});