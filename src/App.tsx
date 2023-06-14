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
  ColorSchemeProvider
} from '@mantine/core';
import {
  useHotkeys,
  useLocalStorage
} from '@mantine/hooks';

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
              <Text>Application navbar</Text>
            </Navbar>
          }
          header={
            <Header height={{ base: 50, md: 70 }} p="md">
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>

                <Text>Application header</Text>
              </div>
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
