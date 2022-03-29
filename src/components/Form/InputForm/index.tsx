import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { Container, Error } from './styles';

import { Input } from '../Input';

interface InputFormProps extends TextInputProps {
    control: Control<any, any>;
    name: string;
    error: string | undefined;
}

export function InputForm({ control, name, error, ...rest }: InputFormProps) {
    return (
        <Container>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <Input onChangeText={onChange} value={value} {...rest} />
                )}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
}
