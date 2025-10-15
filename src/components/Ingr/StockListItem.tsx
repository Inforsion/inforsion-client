import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ingrStyles } from '@/src/styles/IngrStyle';
import Icon from '@/src/components/common/Icon';
import DragSVG from '@/assets/images/Ingr/ItemDrag.svg';

type StockItem = {
    id: string;
    name: string;
    price: number | string;
    stock: string;
    quantity: number | string;
    imageUri?: string | null;
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
                       }: Props) => {
    return (
        <View style={ingrStyles.rowList}>
            {edit ? (
                <TouchableOpacity
                    onPress={onToggle}
                    activeOpacity={0.8}
                    style={[
                        ingrStyles.checkboxSlot,
                        ingrStyles.checkboxBox,
                        selected && ingrStyles.checkboxBoxChecked,
                    ]}
                >
                    {selected && <Text style={ingrStyles.checkboxMark}>✓</Text>}
                </TouchableOpacity>
            ) : (
                <View style={ingrStyles.checkboxSpacer} />
            )}

            <Text style={[ingrStyles.td, ingrStyles.cellName]} numberOfLines={1}>
                {item.name}
            </Text>
            <Text style={[ingrStyles.td, ingrStyles.cellSmall]} numberOfLines={1}>
                {item.price}
            </Text>
            <Text style={[ingrStyles.td, ingrStyles.cellSmall]} numberOfLines={1}>
                {item.stock}개
            </Text>
            <Text style={[ingrStyles.td, ingrStyles.cellSmall]} numberOfLines={1}>
                {item.quantity}원
            </Text>

\            <View style={ingrStyles.dragHandle}>
                <Icon icon={DragSVG} size={16} color="#A0A0A0" />
            </View>
        </View>
    );
};

export default StockListItem;
