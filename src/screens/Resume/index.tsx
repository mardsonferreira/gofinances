import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import { Container, Header, Title, Content } from './styles';
interface TransactionData {
    type: 'income' | 'expense';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: string;
    color: string;
}

export function Resume() {
    const [categoriesList, setCategoriesList] = useState<CategoryData[]>([]);

    async function loadData() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const totalByCategory: CategoryData[] = [];

        const expenses: TransactionData[] = responseFormatted.filter(
            (expense: TransactionData) => expense.type == 'expense'
        );

        categories.forEach((category) => {
            let categorySum = 0;
            expenses.forEach((expense) => {
                if (expense.category === category.key) {
                    categorySum += Number(expense.amount);
                }
            });

            if (categorySum > 0) {
                const total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });
                totalByCategory.push({
                    key: category.key, 
                    name: category.name,
                    color: category.color,
                    total,
                });
            }
        });

        setCategoriesList(totalByCategory);
    }

    useEffect(() => {
        loadData();
    }, []);
    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <Content>
                {categoriesList.map((item) => (
                    <HistoryCard
                        key={item.key}
                        title={item.name}
                        amount={item.total}
                        color={item.color}
                    />
                ))}
            </Content>
        </Container>
    );
}
