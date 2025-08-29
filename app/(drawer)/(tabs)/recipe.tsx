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

    const handleSave = () => {
        if (!name.trim() || !price.trim()) {
            Alert.alert('상품명과 판매가격을 입력해주세요.');
            return;
        }
        const newItem: MenuItem = {
            id: String(Date.now()),
            name: name.trim(),
            price: Number(price),
            imageUri: photo || null,
        };
        setMenuList(prev => [...prev, newItem]);

        setName('');
        setPrice('');
        setPhoto(null);
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
                        <TouchableOpacity
                            onPress={handleDeleteSelected}
                            style={recipeStyles.deleteBtn}
                            activeOpacity={0.9}
                        >
                            <Text style={recipeStyles.deleteBtnText}>삭제</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default Recipe;
