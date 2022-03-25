import React from 'react';
import { Button } from '../../components/Form/Button';
import { categories } from '../../utils/categories';

import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    CategoryList,
    Separator,
    Footer,
} from './styles';

interface Category {
    key: string;
    name: string;
}

interface CategorySelectProps {
    category: string;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory,
}: CategorySelectProps) {
    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>

            <CategoryList
                data={categories}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category>
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button title="Selecionar" />
            </Footer>
        </Container>
    );
}
