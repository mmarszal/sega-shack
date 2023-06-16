import { UnstyledButton, Group, Avatar, Text } from '@mantine/core';

function Logo() {
    return (
        <UnstyledButton>
            <Group spacing="xs">
                <Avatar size={30} color="blue">
                    SSH
                </Avatar>
                <Text fw={700}>Sega Shack</Text>
            </Group>
        </UnstyledButton>
    )
}

export default Logo;