import React from 'react';

import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    CategoryDate,
} from './styles';

export function TransactionCard() {
    return (
        <Container>
            <Title>Desenvovimento de site</Title>
            <Amount>R$ 12000</Amount>

            <Footer>
                <Category>
                    <Icon name="dollar-sign" />
                    <CategoryName>Vendas</CategoryName>
                </Category>

                <CategoryDate>19/03/2022</CategoryDate>
            </Footer>
        </Container>
    );
}
