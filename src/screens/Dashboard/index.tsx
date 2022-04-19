import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer,
} from './styles';

import { useAuth } from '../../hooks/auth';

import { HighlightCard } from '../../components/HighlightCard';
import {
    TransactionCard,
    TransactionCardProps,
} from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}
interface HighlightData {
    incomes: HighlightProps;
    expenses: HighlightProps;
    total: HighlightProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>(
        {} as HighlightData
    );

    const theme = useTheme();
    const { user, signOut } = useAuth();

    const dataKey = `@gofinances:transactions_user:${user.id}`;

    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'income' | 'expense'
    ) {
        const collectionFiltered = collection.filter(
            (item) => item.type === type
        );

        if (collectionFiltered.length === 0) {
            return 0;
        }

        const lastTransaction = new Date(
            Math.max.apply(
                Math,
                collectionFiltered.map((item) => new Date(item.date).getTime())
            )
        );

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
            'pt-BR',
            {
                month: 'long',
            }
        )}`;
    }

    async function loadTransactions() {
        const response = await AsyncStorage.getItem(dataKey);

        const transactions = response ? JSON.parse(response) : [];

        let incomeTotal = 0;
        let expenseTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions.map(
            (item: DataListProps) => {
                if (item.type === 'income') {
                    incomeTotal += Number(item.amount);
                } else {
                    expenseTotal += Number(item.amount);
                }

                const amount = Number(item.amount).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                }).format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date,
                };
            }
        );

        setTransactions(transactionsFormatted);

        const lastTransactionIncomes = getLastTransactionDate(
            transactions,
            'income'
        );
        const lastTransactionExpenses = getLastTransactionDate(
            transactions,
            'expense'
        );
        const totalInterval =
            lastTransactionExpenses === 0
                ? 'Não há transações'
                : `01 a ${lastTransactionExpenses}`;

        const total = incomeTotal - expenseTotal;

        setHighlightData({
            expenses: {
                amount: expenseTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction:
                    lastTransactionExpenses === 0
                        ? 'Não há transações'
                        : `Última saída dia ${lastTransactionExpenses}`,
            },
            incomes: {
                amount: incomeTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction:
                    lastTransactionIncomes === 0
                        ? 'Não há transações'
                        : `Última entrada dia ${lastTransactionIncomes}`,
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: totalInterval,
            },
        });

        setIsLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            loadTransactions();
        }, [])
    );

    return (
        <Container>
            {isLoading ? (
                <LoadContainer>
                    <ActivityIndicator
                        color={theme.colors.primary}
                        size="large"
                    />
                </LoadContainer>
            ) : (
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Photo
                                    source={{
                                        uri: user.photo,
                                    }}
                                />

                                <User>
                                    <UserGreeting>Olá,</UserGreeting>
                                    <UserName>{user.name}</UserName>
                                </User>
                            </UserInfo>
                            <LogoutButton onPress={signOut}>
                                <Icon name="power" />
                            </LogoutButton>
                        </UserWrapper>
                    </Header>

                    <HighlightCards>
                        <HighlightCard
                            type="up"
                            title="Entradas"
                            amount={highlightData.incomes.amount}
                            lastTransaction={
                                highlightData.incomes.lastTransaction
                            }
                        />
                        <HighlightCard
                            type="down"
                            title="Saídas"
                            amount={highlightData.expenses.amount}
                            lastTransaction={
                                highlightData.expenses.lastTransaction
                            }
                        />
                        <HighlightCard
                            type="total"
                            title="Total"
                            amount={highlightData.total.amount}
                            lastTransaction={
                                highlightData.total.lastTransaction
                            }
                        />
                    </HighlightCards>

                    <Transactions>
                        <Title>Listagem</Title>

                        <TransactionList
                            data={transactions}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TransactionCard data={item} />
                            )}
                        />
                    </Transactions>
                </>
            )}
        </Container>
    );
}
