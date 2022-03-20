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

interface Category {
    name: string;
    icon: string;
}
export interface TransactionCardProps {
   type: 'income' | 'expense';
    title: string;
    amount: string;
    category: Category;
    date: string;
}

interface Props {
    data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount type={data.type}>
                {data.type === 'expense' && '- '}
                {data.amount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={data.category.icon} />
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>

                <CategoryDate>{data.date}</CategoryDate>
            </Footer>
        </Container>
    );
}
