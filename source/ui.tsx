import React from 'react';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import { PetState } from './logic.js';

const PetAvatar = ({ mood }: { mood: string }) => {
    if (mood === 'happy') {
        return (
            <Box borderStyle="round" borderColor="green" padding={1}>
                <Text>
                    ( ^_^) {"\n"}
                    ( {'>'}☕{'<'} )
                </Text>
            </Box>
        );
    }
    if (mood === 'hungry') {
        return (
            <Box borderStyle="double" borderColor="red" padding={1}>
                <Text>
                    ( 0_0 ) {"\n"}
                    ( {'>'}🍕{'<'} ) ?
                </Text>
            </Box>
        );
    }
    return <Text>( -_- ) Zzz...</Text>;
};

export const App = ({ pet }: { pet: PetState }) => {
    const now = new Date();
    const lastFedDate = new Date(pet.lastFed);
    const diffHours = (now.getTime() - lastFedDate.getTime()) / (1000 * 60 * 60);
    const mood = diffHours > 4 ? 'hungry' : 'happy';

    return (
        <Box flexDirection="column" alignItems="center">
            <Gradient name="pastel">
                <BigText text="Termi-Gotchi" />
            </Gradient>

            <PetAvatar mood={mood} />

            <Box marginTop={1} flexDirection="column" alignItems="center">
                <Text color="green">Lvl {pet.level} {pet.name}</Text>
                <Text>XP: {pet.xp.toFixed(1)} / {pet.level * 50}</Text>
                <Text color={mood === 'hungry' ? 'red' : 'green'}>
                    Status: {mood.toUpperCase()}
                </Text>
                <Text>Health: {pet.health}%</Text>
            </Box>
        </Box>
    );
};
