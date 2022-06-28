import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile Screen', () => {
    it('check if show correctly input name placeholder', () => {
        const { getByPlaceholderText } = render(<Profile />);

        const inputName = getByPlaceholderText('Nome');

        expect(inputName).toBeTruthy();
    });

    it('Check if user data has been loaded', () => {
        const { getByTestId } = render(<Profile />);

        const inputName = getByTestId('input-name');
        const inputSurname = getByTestId('input-surname');

        expect(inputName.props.value).toEqual('Mardson');
        expect(inputSurname.props.value).toEqual('Ferreira');
    });

    it('checks if title render correctly', () => {
        const { getByTestId } = render(<Profile />);

        const textTitle = getByTestId('text-title');

        expect(textTitle.props.children).toContain('Perfil');
    });
});
