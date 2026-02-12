import { useCallback, useState } from 'react';
import { Platform } from 'react-native';

export type IngredientPayload = {
    storeId: number;
    name: string;
    unit: string;
    stockPrice: number;
    unitCapacity: number;
    stockQuantity: number;
};

export type IngredientResponse = {
    id: number;
};

function safeJson(e: any) {
    try { return JSON.parse(e); } catch { return null; }
}

function getBaseUrl() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';

    if (Platform.OS === 'android' && apiUrl.includes('localhost')) {
        return apiUrl.replace('localhost', '10.0.2.2');
    }

    return apiUrl;
}

export async function createIngrApi(
    baseUrl: string,
    payload: IngredientPayload,
    token: string,
    opts?: { headers?: Record<string, string> }
): Promise<IngredientResponse> {

    const url = `${baseUrl}/api/v1/ingredients`;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...(opts?.headers ?? {}),
        },
        body: JSON.stringify(payload),
    });

    const resText = await res.text();

    if (!res.ok) {
        const data = safeJson(resText);
        const msg = data?.message ?? data?.error ?? resText ?? 'Failed to create ingredient';
        throw new Error(msg);
    }

    return JSON.parse(resText);
}

export function useCreateIngr() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const baseUrl = getBaseUrl();

    const mutateAsync = useCallback(
        async (payload: IngredientPayload, token: string) => {
            setLoading(true);
            setError(null);

            try {
                const data = await createIngrApi(baseUrl, payload, token);
                return data;
            } catch (err: any) {
                setError(err);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [baseUrl],
    );

    return { mutateAsync, loading, error };
}