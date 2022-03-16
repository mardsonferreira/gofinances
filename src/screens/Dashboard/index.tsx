import React from 'react';
import { Feather } from '@expo/vector-icons';

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
} from './styles';

import { HighlightCard } from '../../components/HighlightCard';

export function Dashboard() {
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{
                                uri: 'https://avatars.githubusercontent.com/u/5270702?v=4',
                            }}
                        />

                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Mardson</UserName>
                        </User>
                    </UserInfo>

                    <Icon name="power" />
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
            </HighlightCards>
        </Container>
    );
}
