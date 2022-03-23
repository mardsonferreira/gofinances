import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

const icons = {
    income: 'arrow-up-circle',
    expense: 'arrow-down-circle',
};

interface TransactionTypeButtonProps extends TouchableOpacityProps {
    title: string;
    type: 'income' | 'expense';
    isActive: boolean;
}

export function TransactionTypeButton({
    title,
    type,
    isActive,
    ...rest
}: TransactionTypeButtonProps) {
    return (
        <Container isActive={isActive} type={type} {...rest}>
            <Icon name={icons[type]} type={type} />
            <Title>{title}</Title>
        </Container>
    );
}
