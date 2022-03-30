import React from 'react';

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
    LogoutButton
} from './styles';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [
        {
            id: '1',
            type: 'income',
            title: 'Desenvolvimento de site',
            amount: 'R$ 12000',
            date: '19/03/2022',
            category: { name: 'Vendas', icon: 'dollar-sign' },
        },
        {
            id: '2',
            type: 'expense',
            title: 'Hamburgueria Pizzy',
            amount: 'R$ 59,00',
            date: '20/03/2022',
            category: { name: 'Alimentação', icon: 'coffee' },
        },
        {
            id: '3',
            type: 'expense',
            title: 'Aluguel Apartamento',
            amount: 'R$ 1200',
            date: '20/03/2022',
            category: { name: 'Moradia', icon: 'shopping-bag' },
        },
    ];

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{
                                uri: 'https://avatars.githubusercontent.com/u/5270702?v=4',
                            }}
                        />

                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Mardson</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power" />
                    </LogoutButton>
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400"
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down"
                    title="Saídas"
                    amount="R$ 1.259"
                    lastTransaction="Última saída dia 03 de abril"
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$ 16.141"
                    lastTransaction="01 à 16 de abril"
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    );
}
