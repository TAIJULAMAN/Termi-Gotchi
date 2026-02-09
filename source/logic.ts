import Conf from 'conf';

export interface PetState {
    name: string;
    level: number;
    xp: number;
    health: number; // 0-100
    lastFed: string; // ISO Date
    poopCount: number;
    event?: string;
}

const config = new Conf<PetState>({
    projectName: 'termi-gotchi',
    defaults: {
        name: 'Git-Mon',
        level: 1,
        xp: 0,
        health: 100,
        lastFed: new Date().toISOString(),
        poopCount: 0
    }
});

export const getPet = () => config.store;

export const feedPet = (linesAdded: number, linesDeleted: number) => {
    const pet = getPet();

    // Logic: deletions are better (refactoring)
    const nutrition = (linesAdded * 0.1) + (linesDeleted * 0.5);
    pet.xp += nutrition;
    pet.health = Math.min(100, pet.health + 10);
    pet.lastFed = new Date().toISOString();

    let event = 'EATING';

    // Level up logic
    if (pet.xp > pet.level * 50) {
        pet.level++;
        pet.xp = 0;
        event = 'LEVEL_UP';
    }

    config.set(pet);
    return { ...pet, event };
};
