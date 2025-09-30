import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { ingrStyles } from '@/src/styles/IngrStyle';

export type RecipeItem = {
    id: string;
    name: string;
    price: number;
};

type Props = {
    item: RecipeItem;
    edit?: boolean;
    selected?: boolean;
    onToggle?: () => void;
};

const RecipeListItem = ({ item, edit = false, selected = false, onToggle }: Props) => {
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
            </View>
            <Text style={ingrStyles.td}>{item.name}</Text>
            <Text style={ingrStyles.td}>{item.price}</Text>
        </View>
    );
};

export default RecipeListItem;
