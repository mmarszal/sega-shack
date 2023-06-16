import { useState } from 'react'
import { 
  AppShell, 
  Navbar, 
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  ActionIcon,
  Group,
  ScrollArea,
  NavLink
} from '@mantine/core';
import {
  useHotkeys,
  useLocalStorage
} from '@mantine/hooks';
import { IconSun, IconMoonStars, IconDeviceGamepad, IconHome } from '@tabler/icons-react';
import Logo from './components/Logo';

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{colorScheme}} withNormalizeCSS withGlobalStyles>
        <AppShell
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
              <Navbar.Section grow component={ScrollArea}>
                <NavLink label="Home" icon={<IconHome />} />
                <NavLink 
                  label="Mega Drive Mods"
                  icon={<IconDeviceGamepad size="1.5rem"/>}
                >
                  <NavLink label="Region Mod"/>
                  <NavLink label="Mega Amp" />
                  <NavLink label="NTSC/PAL Switcher" />
                </NavLink>
                <NavLink 
                  label="Sega CD Mods"
                  icon={<IconDeviceGamepad size="1.5rem"/>}
                >
                  <NavLink label="Region Free Bios" />
                  <NavLink label="Bios Switcher" />
                  <NavLink label="Restore Model 1 Sound" />
                </NavLink>
                <NavLink 
                  label="Sega Saturn Mods"
                  icon={<IconDeviceGamepad size="1.5rem"/>}
                >
                  <NavLink label="FRAM Replacement"/>
                  <NavLink label="Region Free Bios" />
                  <NavLink label="Mod Chip Install" />
                </NavLink>
              </Navbar.Section>
            </Navbar>
          }
          header={
            <Header height={{ base: 60, md: 60 }} p="md">
              <Group position="apart">
                <Group>
                  <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </MediaQuery>
                  <Logo />
                </Group>
                <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                  {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
                </ActionIcon>
              </Group>
            </Header>
          }
        >
          <Text>Resize app to see responsive navbar in action</Text>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
