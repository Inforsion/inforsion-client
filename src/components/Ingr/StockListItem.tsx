import React from 'react';
import { View, Text, TouchableOpacity,} from 'react-native';
import { ingrStyles } from '@/src/styles/IngrStyle';

type StockItem = {
    id: string;
    name: string;
    price: number | string;
    stock: string;
    quantity: number | string;
};

interface Props {
    item: StockItem;
    edit?: boolean;
    selected?: boolean;
    onToggle?: () => void;
}

const StockListItem = ({
                           item,
                           edit = false,
                           selected = false,
                           onToggle,
                       }: Props) => (
    <View style={ingrStyles.rowList}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={ingrStyles.td}>{item.id}</Text>

            {edit && (
                <TouchableOpacity
                    onPress={onToggle}
                    activeOpacity={0.8}
                    style={[
                        ingrStyles.checkboxBox,
                        selected && ingrStyles.checkboxBoxChecked,
                    ]}
                >
                    {selected && <Text style={ingrStyles.checkboxMark}>✓</Text>}
                </TouchableOpacity>
            )}
        </View>
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
