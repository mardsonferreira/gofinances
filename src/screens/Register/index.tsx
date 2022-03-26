import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-native';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from './styles';

type TransactionType = 'income' | 'expense';

interface FormData {
    name: string;
    amount: string;
}

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const { control, handleSubmit } = useForm<FormData>();

    function handleTransactionTypeSelect(type: TransactionType) {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    function handleRegister(form: FormData) {
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key,
        };

        console.log(data);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <InputForm
                        name="name"
                        control={control}
                        placeholder="Nome"
                    />

                    <InputForm
                        name="amount"
                        control={control}
                        placeholder="Preço"
                    />

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

                    <CategorySelectButton
                        title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>

                <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    );
}
