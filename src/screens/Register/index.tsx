import React, { useState } from 'react';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../../components/Form/CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from './styles';

type TransactionType = 'income' | 'expense';

export function Register() {
    const [transactionType, setTransactionType] = useState('');

    function handleTransactionTypeSelect(type: TransactionType) {
        setTransactionType(type);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input placeholder="Nome" />

                    <Input placeholder="Preço" />

                    <TransactionTypes>
                        <TransactionTypeButton
                            type="income"
                            title="Income"
                            onPress={() =>
                                handleTransactionTypeSelect('income')
                            }
                            isActive={transactionType === 'income'}
                        />
                        <TransactionTypeButton
                            type="expense"
                            title="Outcome"
                            onPress={() =>
                                handleTransactionTypeSelect('expense')
                            }
                            isActive={transactionType === 'expense'}
                        />
                    </TransactionTypes>

                    <CategorySelect title='Categoria' />
                </Fields>

                <Button title="Enviar" />
            </Form>
        </Container>
    );
}
