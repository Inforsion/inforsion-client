import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { ingrStyles } from '@/src/styles/IngrStyle';

export type RecipeItem = {
    id: string;
    name: string;
    price: number;
    imageUri?: string | null;
};

type Props = {
    item: RecipeItem;
    num: string;
    edit?: boolean;
    selected?: boolean;
    onToggle?: () => void;
};

const RecipeListItem = ({ item, num, edit = false, selected = false, onToggle }: Props) => {
    return (
        <View style={ingrStyles.rowList}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
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
                <Text style={ingrStyles.td}>{num}</Text>
            </View>

            {item.imageUri ? (
                <Image source={{ uri: item.imageUri }} style={ingrStyles.image} />
            ) : (
                <View style={ingrStyles.image} />
            )}
            <Text style={ingrStyles.td}>{item.name}</Text>
            <Text style={ingrStyles.td}>{item.price}</Text>
        </View>
    );
};

export default RecipeListItem;
