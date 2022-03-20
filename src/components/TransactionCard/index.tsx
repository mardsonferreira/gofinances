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
interface TransactionCardProps {
    data: {
        title: string;
        amount: string;
        category: Category;
        date: string;
    };
}
export function TransactionCard({ data }: TransactionCardProps) {
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount>{data.amount}</Amount>

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
