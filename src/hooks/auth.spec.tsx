import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'jest-mock';
import fetchMock from 'jest-fetch-mock';
import { startAsync } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthProvider, useAuth } from './auth';

fetchMock.enableMocks();

const userTest = {
    id: 'any_id',
    email: 'john.doe@email.com',
    name: 'John Doe',
    photo: 'any_photo.png',
};

jest.mock('expo-auth-session');

describe('Auth Hook', () => {
    beforeEach(async () => {
        const userCollectionKey = '@gofinances:users';
        await AsyncStorage.removeItem(userCollectionKey);
    });

    it('should be able to sign in with Google account existing', async () => {
        const googleMocked = mocked(startAsync as any);
        googleMocked.mockReturnValueOnce({
            type: 'success',
            params: {
                access_token: 'any_token',
            },
        });

        fetchMock.mockResponseOnce(JSON.stringify(userTest));

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user.email).toBe(userTest.email);
    });

    it('user should not connect if cancel authentication with google', async () => {
        const googleMocked = mocked(startAsync as any);
        googleMocked.mockReturnValueOnce({
            type: 'cancel',
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user).not.toHaveProperty('id');
    });
});
