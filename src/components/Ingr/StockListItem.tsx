import React from 'react';
import { View, Text } from 'react-native';
import { ingrStyles } from '@/src/styles/IngrStyle';

type StockItem = {
    id: string;
    name: string;
    price: number | string;
    stock: string;
    quantity: number | string;
};

const StockListItem = ({ item }: { item: StockItem }) => (
    <View style={ingrStyles.rowList}>
        <Text style={ingrStyles.td}>{item.id}</Text>
        <View style={ingrStyles.image} />
        <Text style={ingrStyles.td}>{item.name}</Text>
        <Text style={ingrStyles.td}>{item.price}</Text>
        <View style={ingrStyles.stockCell}>
            <Text style={ingrStyles.td}>{item.stock}</Text>
            <Text style={ingrStyles.subText}>({item.quantity}개)</Text>
        </View>
    </View>
);

export default StockListItem;
