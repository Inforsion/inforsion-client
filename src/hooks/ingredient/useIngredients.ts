import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { getBaseUrl } from '@/src/utils/ingrUtils';

export type StockItem = {
    id: string;
    name: string;
    stock: string;
    quantity: number;
    price: number;
    imageUri?: string | null;
};

type ServerIngredientItem = {
    id: number;
    name: string;
    unitCapacity: number;
    unit: string;
    stockQuantity: number;
    stockPrice: number;
    imageUrl?: string | null;
};

export const useIngredients = (storeId: number) => {
    const [stockList, setStockList] = useState<StockItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const baseUrl = getBaseUrl();
    const ACCESS_TOKEN = process.env.EXPO_PUBLIC_TEMP_ACCESS_TOKEN || "";

    const fetchIngredients = useCallback(async () => {
        if (!storeId) return;

        try {
            if (!isRefreshing) setIsLoading(true);

            const response = await fetch(`${baseUrl}/api/v1/ingredients/store/${storeId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('목록 조회 실패');

            const data: ServerIngredientItem[] = await response.json();

            const formattedList: StockItem[] = data.map((item) => ({
                id: String(item.id),
                name: item.name,
                stock: `${item.unitCapacity}${item.unit || ''}`,
                quantity: item.stockQuantity,
                price: item.stockPrice,
                imageUri: item.imageUrl ?? null,
            }));

            setStockList(formattedList);
        } catch (error) {
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, [baseUrl, ACCESS_TOKEN, storeId, isRefreshing]);

    const deleteIngredients = async (selectedIds: string[]) => {
        try {
            await Promise.all(
                selectedIds.map(id =>
                    fetch(`${baseUrl}/api/v1/ingredients/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${ACCESS_TOKEN}`,
                            'Content-Type': 'application/json',
                        },
                    }).then(async res => {
                        if (!res.ok) throw new Error('삭제 실패');
                    })
                )
            );
            await fetchIngredients();
            return true;
        } catch (e) {
            return false;
        }
    };

    useEffect(() => {
        fetchIngredients();
    }, [fetchIngredients]);

    const onRefresh = () => {
        setIsRefreshing(true);
        fetchIngredients();
    };

    return {
        stockList,
        isLoading,
        isRefreshing,
        onRefresh,
        fetchIngredients,
        deleteIngredients
    };
};