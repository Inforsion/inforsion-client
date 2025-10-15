import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ingrStyles } from '@/src/styles/IngrStyle';
import Icon from "@/src/components/common/Icon";
import DragSVG from "@/assets/images/Ingr/ItemDrag.svg";

export type RecipeItem = {
    id: string;
    name: string;
    price?: number;
    ingredients?: string[];
};

type Props = {
    item: RecipeItem;
    edit?: boolean;
    selected?: boolean;
    onToggle?: () => void;
};

const RecipeListItem = ({
                            item,
                            edit = false,
                            selected = false,
                            onToggle,
                        }: Props) => {
    const chips = item.ingredients ?? [];

    return (
        <View style={[ingrStyles.rowList, styles.row]}>
            <View style={styles.left}>
                {edit && (
                    <TouchableOpacity
                        onPress={onToggle}
                        activeOpacity={0.8}
                        style={[
                            ingrStyles.checkboxBox,
                            selected && ingrStyles.checkboxBoxChecked,
                            { marginRight: 10 },
                        ]}
                    >
                        {selected && <Text style={ingrStyles.checkboxMark}>✓</Text>}
                    </TouchableOpacity>
                )}

                <View style={{ flex: 1 }}>
                    <Text style={styles.menuName} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text style={styles.seeMore}>자세히보기</Text>
                </View>
            </View>

            <View style={styles.right}>
                {chips.length === 0 ? (
                    <Text style={styles.emptyChip}>재료 없음</Text>
                ) : (
                    <View style={styles.chipsWrap}>
                        {chips.map((chip, idx) => {
                            const [label, ...rest] = chip.trim().split(' ');
                            const amount = rest.join(' ');
                            return (
                                <View key={`${chip}-${idx}`} style={styles.chip}>
                                    <Text style={styles.chipLabel} numberOfLines={1}>
                                        {label}
                                    </Text>
                                    {!!amount && (
                                        <Text style={styles.chipAmount} numberOfLines={1}>
                                            {amount}
                                        </Text>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                )}
            </View>
            <View style={ingrStyles.dragHandle}>
                <Icon icon={DragSVG} size={16} color="#A0A0A0" />
            </View>
        </View>
    );
};

export default RecipeListItem;

const styles = StyleSheet.create({
    row: {
        paddingVertical: 14,
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 8,
    },
    menuName: {
        color: '#222',
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 2,
    },
    seeMore: {
        fontSize: 12,
        color: '#9AA0A6',
    },
    right: {
        flex: 2,
        alignItems: 'flex-start',
    },
    chipsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    chip: {
        minWidth: 64,
        maxWidth: 120,
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    chipLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1E1E1E',
    },
    chipAmount: {
        marginTop: 2,
        fontSize: 11,
        color: '#8C8C8C',
    },
    emptyChip: {
        fontSize: 12,
        color: '#A0A4AB',
    },
});
