

import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';


export const LightTheme = createTheme({


  palette: {
  
    mode: 'light',
   

    secondary:{

      main:'#19857b'

    },
    error:{

      main: red.A400
  
    },
    

  },

  components:{

      MuiAppBar:{

        defaultProps:{

          elevation:0
        }

      }

  }

  
  });