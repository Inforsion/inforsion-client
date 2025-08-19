import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Alert,
} from 'react-native';
import { ingrStyles } from '@/src/styles/IngrStyle';
import StepIndicator from '@/src/components/Ingr/StepIndicator';
import InputField from '@/src/components/Ingr/InputField';
import StockListItem from '@/src/components/Ingr/StockListItem';

const CameraImg = require('@/assets/images/Ingr/camera.png');

type StockItem = {
    id: string;
    name: string;
    price: number;
    stock: string;
    quantity: number;
};

const Ingr = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [quantity, setQuantity] = useState('');
    const [stockList, setStockList] = useState<StockItem[]>([]);

    const handleSubmit = () => {
        if (!name.trim() || !price.trim() || !stock.trim() || !quantity.trim()) {
            Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
            return;
        }

        const newItem = {
            id: (stockList.length + 1).toString().padStart(2, '0'),
            name,
            price: Number(price),
            stock,
            quantity: Number(quantity),
        };

        setStockList([...stockList, newItem]);

        setName('');
        setPrice('');
        setStock('');
        setQuantity('');
    };
    return (
        <View style={ingrStyles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                <StepIndicator />

                <View style={ingrStyles.card}>
                    <View style={ingrStyles.photoUpload}>
                        <View style={ingrStyles.photoIconCircle}>
                            <Image source={CameraImg} />
                            <Text style={ingrStyles.photoText}>사진을 등록해주세요</Text>
                        </View>
                    </View>

                    <InputField
                        label="재료명"
                        placeholder="상품이름을 입력해주세요."
                        value={name}
                        onChangeText={setName}/>
                    <InputField
                        label="재료 가격"
                        placeholder="가격을 입력해주세요."
                        value={price}
                        onChangeText={setPrice}/>
                    <InputField
                        label="1개당 재료용량"
                        placeholder="용량을 입력해주세요."
                        unit="(단위: g, ml)"
                        value={stock}
                        onChangeText={setStock}
                    />
                    <InputField
                        label="재고 수"
                        placeholder="재고를 입력해주세요."
                        value={quantity}
                        onChangeText={setQuantity}
                    />
                </View>

                <TouchableOpacity
                    style={ingrStyles.submitButton}
                    onPress={handleSubmit}>
                    <Text style={ingrStyles.submitText}>저장</Text>
                </TouchableOpacity>

                <View style={ingrStyles.card}>
                    <View style={ingrStyles.headerRow}>
                        <Text style={ingrStyles.listTitle}>재고 목록</Text>
                        <Text style={ingrStyles.editText}>수정하기</Text>
                    </View>

                    <View style={ingrStyles.tableHeader}>
                        <Text style={ingrStyles.th}>NO.</Text>
                        <Text style={ingrStyles.th}>사진</Text>
                        <Text style={ingrStyles.th}>상품명</Text>
                        <Text style={ingrStyles.th}>가격</Text>
                        <Text style={ingrStyles.th}>남은 재고</Text>
                    </View>

                    {stockList.length === 0 ? (
                        <View style={{ paddingVertical: 30, alignItems: 'center' }}>
                            <Text style={{ color: '#888' }}>저장된 재료가 없습니다.</Text>
                        </View>
                    ) : (
                        <View style={{ maxHeight: 400 }}>
                            <FlatList
                                data={stockList}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => <StockListItem item={item} />}
                                scrollEnabled={stockList.length > 5}
                                showsVerticalScrollIndicator={true}
                            />
                        </View>
                    )}
                </View>


            </ScrollView>
        </View>
    );
};

export default Ingr;
