import { Button, Box, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/saveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useState, ChangeEvent, useContext } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '@/context/ui/UIContext';

export const NewEntry = () => {


   
    const [inputValue, setInputValue] = useState('');

    const [touched, setTouched] = useState(false);

    const {addNewEntry} = useContext(EntriesContext)

    const {setIsAddingEntry,isAddingEntry} = useContext(UIContext)


    const onTextFieldChange = (event:ChangeEvent<HTMLInputElement>) =>{

      setInputValue(event.target.value);
    }


    const onSave = () =>{

        if(inputValue.length === 0) return;

        addNewEntry(inputValue);
        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');

    }


    return (
        <Box sx={{ marginBottom: 2, paddingX: 3 }}>


            {

                isAddingEntry ? (

                    <>

                        <TextField fullWidth sx={{ marginTop: 2, marginBottom: 1, color: 'white' }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva Entrada'
                            helperText={inputValue.length <=0 && touched && 'Ingrese un valor'}
                            error={inputValue.length <=0 && touched}
                            value={inputValue}
                            onChange={onTextFieldChange}
                            onBlur={()=>setTouched(true)}
                        >

                        </TextField>


                        <Box display='flex' justifyContent='space-between'>
                            <Button variant='outlined' color='warning' onClick={()=>setIsAddingEntry(false)}>
                                Cancelar
                            </Button>

                            <Button variant='outlined' color='info' endIcon={<SaveOutlinedIcon /> }
                            onClick={onSave}
                            >
                                Guardar
                            </Button>
                        </Box>


                    </>

                ) : (

                    <Button startIcon={<AddCircleOutlineOutlinedIcon />} sx={{ marginTop: 2, marginBottom: 1, color: 'white' }}
                        fullWidth
                        variant='outlined'
                        onClick={()=>setIsAddingEntry(true)}

                    >
                        Agregar Tarea
                    </Button>

                )
            }


        </Box>
    )
}
