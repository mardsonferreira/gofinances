import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import { Container, Header, Title, Content, ChartContainer } from './styles';
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
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function Resume() {
    const [categoriesList, setCategoriesList] = useState<CategoryData[]>([]);
    const theme = useTheme();

    async function loadData() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const totalByCategory: CategoryData[] = [];

        const expenses: TransactionData[] = responseFormatted.filter(
            (expense: TransactionData) => expense.type == 'expense'
        );

        const expensesTotal = expenses.reduce(
            (acc: number, expense: TransactionData) => {
                return acc + Number(expense.amount);
            },
            0
        );

        categories.forEach((category) => {
            let categorySum = 0;
            expenses.forEach((expense) => {
                if (expense.category === category.key) {
                    categorySum += Number(expense.amount);
                }
            });

            if (categorySum > 0) {
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });

                const percent = `${(
                    (categorySum / expensesTotal) *
                    100
                ).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent,
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
                <ChartContainer>
                    <VictoryPie
                        data={categoriesList}
                        colorScale={categoriesList.map(
                            (category) => category.color
                        )}
                        style={{
                            labels: {
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: theme.colors.shape,
                            },
                        }}
                        labelRadius={50}
                        x="percent"
                        y="total"
                    />
                </ChartContainer>
                {categoriesList.map((item) => (
                    <HistoryCard
                        key={item.key}
                        title={item.name}
                        amount={item.totalFormatted}
                        color={item.color}
                    />
                ))}
            </Content>
        </Container>
    );
}
