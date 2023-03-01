import {EntriesProvider}  from '../context/entries/EntriesProviders';
import  {UIProvider}  from '@/context/ui/UIProvider';
import '@/styles/globals.css'
import { DarkTheme} from '@/themes/dark-theme';
import {  CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';






function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
    <EntriesProvider entries={[]}>
    <UIProvider sidemenuOpen={false} isAddingEntry={false} isDragging={false}>
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline/>
      <Component {...pageProps} />
    </ThemeProvider>
    </UIProvider>
    </EntriesProvider>
    </SnackbarProvider>

  )
}

export default App