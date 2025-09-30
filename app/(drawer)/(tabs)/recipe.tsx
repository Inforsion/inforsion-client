import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Alert,
} from 'react-native';
import { recipeStyles } from '@/src/styles/RecipeStyle';
import StepIndicator from '@/src/components/Ingr/StepIndicator';
import ImgUpload from '@/src/components/common/ImgUpload';
import InputField from '@/src/components/Ingr/InputField';
import RecipeListItem from '@/src/components/recipe/RecipeListItem';
import CommonModal from '@/src/components/common/CommonModal';
import { useRouter } from 'expo-router';

type MenuItem = {
    id: string;
    name: string;
    price: number;
    imageUri?: string | null;
};

const Recipe = () => {
    const [photo, setPhoto] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [menuList, setMenuList] = useState<MenuItem[]>([]);

    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState<string[]>(['원두 18g']);
    const [focus, setFocus] = useState({ recipe: false });

    const router = useRouter();

    const toggleSelect = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id],
        );
    };

    const handleDeleteSelected = () => {
        if (selected.length === 0) return;
        setMenuList(prev => prev.filter(item => !selected.includes(item.id)));
        setSelected([]);
    };

    const resetModal = () => {
        setRecipeName('');
        setIngredients(['원두 18g']);
        setFocus({ recipe: false });
    };

    const handleSave = () => {
        if (!recipeName.trim()) {
            Alert.alert('레시피 이름을 입력해주세요.');
            return;
        }
        const newItem: MenuItem = {
            id: String(Date.now()),
            name: name.trim(),
            price: Number(price),
            imageUri: photo || null,
        };
        setMenuList(prev => [...prev, newItem]);
        resetModal();
        setIsModalVisible(false);
    };

    const openIngredientSelector = () => {
        const cbKey = `onSelect_${Date.now()}`;

        (globalThis as any)[cbKey] = (selectedItems: any[]) => {
            const chips = selectedItems.map((it: any) => `${it.name} ${it.stock}`);
            setIngredients(prev => [...prev, ...chips]);
            setIsModalVisible(true); // 선택 완료 후 모달 즉시 재오픈
        };

        setIsModalVisible(false);
        setTimeout(() => {
            router.push({
                pathname: '/(drawer)/(tabs)/ingr',
                params: { selectMode: 'true', onSelectKey: cbKey },
            });
        }, 150);
    };

    const removeIngredientChip = (idx: number) => {
        setIngredients(prev => prev.filter((_, i) => i !== idx));
    };

    return (
        <View style={recipeStyles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <StepIndicator currentStep={2} />
                </View>

                <View style={recipeStyles.card}>
                    <ImgUpload value={photo} onChange={setPhoto} />

                    <InputField
                        label="상품명"
                        placeholder="상품이름을 입력해주세요."
                        value={name}
                        onChangeText={setName}
                    />
                    <InputField
                        label="판매가격"
                        placeholder="가격을 입력해주세요."
                        value={price}
                        onChangeText={setPrice}
                    />
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}
                    >
                        <Text style={recipeStyles.label}>포함재료</Text>
                    </View>
                </View>

                <TouchableOpacity style={recipeStyles.submitButton} onPress={handleSave}>
                    <Text style={recipeStyles.submitText}>저장</Text>
                </TouchableOpacity>

                <View style={[recipeStyles.card, { position: 'relative' }]}>
                    <View style={recipeStyles.headerRow}>
                        <Text style={recipeStyles.listTitle}>메뉴 목록</Text>

                        <TouchableOpacity
                            onPress={() => {
                                setEdit(m => !m);
                                setSelected([]);
                            }}
                        >
                            <Text style={recipeStyles.editText}>
                                {edit ? '완료' : '수정하기'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={recipeStyles.tableHeader}>
                        <Text style={recipeStyles.th}>NO.</Text>
                        <Text style={recipeStyles.th}>사진</Text>
                        <Text style={recipeStyles.th}>상품명</Text>
                        <Text style={recipeStyles.th}>가격</Text>
                    </View>

                    {menuList.length === 0 ? (
                        <View style={{ paddingVertical: 30, alignItems: 'center' }}>
                            <Text style={{ color: '#888' }}>저장된 메뉴가 없습니다.</Text>
                        </View>
                    ) : (
                        <View style={{ maxHeight: 400 }}>
                            <FlatList
                                data={menuList}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => (
                                    <RecipeListItem
                                        item={item}
                                        num={(index + 1).toString().padStart(2, '0')}
                                        edit={edit}
                                        selected={selected.includes(item.id)}
                                        onToggle={() => toggleSelect(item.id)}
                                    />
                                )}
                                scrollEnabled={menuList.length > 5}
                                showsVerticalScrollIndicator
                            />
                        </View>
                    )}

                {edit && selected.length > 0 && (
                    <TouchableOpacity onPress={handleDeleteSelected} style={recipeStyles.deleteBtn} activeOpacity={0.9}>
                        <Text style={recipeStyles.deleteBtnText}>삭제</Text>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity style={styles.outlineBtn} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.outlineBtnText}>레시피 추가</Text>
            </TouchableOpacity>


            <CommonModal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalContent}>
                        <Text style={modalStyles.title}>레시피 추가</Text>

                        <Text style={modalStyles.label}>레시피 이름</Text>
                        <View style={[modalStyles.inputBox, focus.recipe && modalStyles.inputBoxActive]}>
                            <TextInput
                                placeholder="레시피 이름"
                                placeholderTextColor="#B5B7BD"
                                value={recipeName}
                                onChangeText={setRecipeName}
                                onFocus={() => setFocus({ recipe: true })}
                                onBlur={() => setFocus({ recipe: false })}
                                style={modalStyles.input}
                            />
                        </View>

                        <Text style={[modalStyles.label, { marginTop: 18 }]}>재료 선택</Text>
                        <View style={modalStyles.chipsRow}>
                            {ingredients.map((chip, idx) => (
                                <View key={`${chip}-${idx}`} style={modalStyles.chip}>
                                    <Text style={modalStyles.chipText}>{chip}</Text>
                                    <Text style={modalStyles.chipDel} onPress={() => removeIngredientChip(idx)}>•</Text>
                                </View>
                            ))}
                            <TouchableOpacity onPress={openIngredientSelector} style={modalStyles.addChipBtn}>
                                <Text style={modalStyles.addChipText}>+ 재료추가</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity onPress={handleSave} style={modalStyles.saveBtn}>
                        <Text style={modalStyles.saveBtnText}>저장</Text>
                    </TouchableOpacity>
                </View>
            </CommonModal>
        </View>
    );
};

export default Recipe;

const styles = StyleSheet.create({
    headerTop: { flexDirection: 'row', justifyContent: 'space-between' },
    pageTitle: { fontSize: 20, fontWeight: '700', color: '#222', marginBottom: 6 },
    pageSub: { fontSize: 13, color: '#7D7D7D', marginBottom: 14, alignItems: 'center' },
    searchBox: { height: 40, borderRadius: 8, backgroundColor: '#F3F4F6', justifyContent: 'center', paddingHorizontal: 12, marginTop: 12, marginBottom: 12 },
    searchPlaceholder: { color: '#B1B5BC', fontSize: 13 },
    cardElevated: { borderWidth: 0, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 6 }, shadowRadius: 18, elevation: 4 },
    headerThin: { borderBottomColor: '#ECEDEF', backgroundColor: '#FAF9F9', alignItems: "center" },
    thName: { flex: 1, textAlign: 'left', paddingLeft: 6 },
    thSmall: { flex: 2 },
    emptyWrap: { paddingVertical: 24, alignItems: 'center' },
    emptyText: { color: '#9AA0A6' },
    outlineBtn: { alignSelf: 'center', marginTop: 12, width: 180, height: 36, borderWidth: 0.4, borderColor: '#888888', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    outlineBtnText: { color: '#383838', fontSize: 16, fontWeight: '600' },
});

const modalStyles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: 'space-between' },
    modalContent: { flexGrow: 1 },
    title: { fontSize: 16, fontWeight: '700', color: '#383838', marginBottom: 8 },
    label: { fontSize: 14, fontWeight: '600', color: '#2D2D2D', marginBottom: 8, marginTop: 8 },
    inputBox: { borderWidth: 1, borderColor: '#D8DADF', borderRadius: 12, paddingHorizontal: 14, height: 48, justifyContent: 'center' },
    inputBoxActive: { borderWidth: 1.5, borderColor: '#2B70FF', borderRadius: 12, paddingHorizontal: 14, height: 48, justifyContent: 'center' },
    input: { fontSize: 16, color: '#15181E' },
    chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
    chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', borderRadius: 16, paddingHorizontal: 10, height: 32 },
    chipText: { color: '#3A52A6', fontSize: 12, marginRight: 6 },
    chipDel: { color: '#3A52A6', fontWeight: '700' },
    addChipBtn: { borderWidth: 1, borderColor: '#C9D1FF', borderRadius: 16, paddingHorizontal: 10, height: 32, alignItems: 'center', justifyContent: 'center' },
    addChipText: { color: '#3A52A6', fontSize: 12, fontWeight: '600' },
    saveBtn: { backgroundColor: '#4E71D3', height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 16 },
    saveBtnText: { color: '#ffffff', fontWeight: '600', fontSize: 14 },
});
