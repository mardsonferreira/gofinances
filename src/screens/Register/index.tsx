import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { AppRoutesParamList } from '../../routes/app.routes';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from './styles';

type TransactionType = 'income' | 'expense';

type RegisterNavigationProps = BottomTabNavigationProp<AppRoutesParamList>;

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number()
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
        .required('Preço é obrigatório'),
});

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const navigation = useNavigation<RegisterNavigationProps>();

    const dataKey = '@gofinances:transactions';

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    function handleTransactionTypeSelect(type: TransactionType) {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData) {
        if (!transactionType) {
            return Alert.alert('Selecione o tipo da transação');
        }

        if (category.key === 'category') {
            return Alert.alert('Selecione a categoria');
        }

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date(),
        };

        try {
            const storageData = await AsyncStorage.getItem(dataKey);
            const currentData = storageData ? JSON.parse(storageData) : [];

            const dataFormatted = [...currentData, newTransaction];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria',
            });

            navigation.navigate('Listagem');
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível salvar transação');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
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

                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}
