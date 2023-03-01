import { EntriesContext } from './EntriesContext'
import { entriesReducer } from './entriesReducer'
import { FC } from 'react'
import { useReducer,useEffect } from 'react'
import { Entry } from '../../interfaces/entry';
import entriesApi from '../../apis/entriesApi';
import {useSnackbar} from 'notistack';



export interface EntriesState {
    entries: Entry[];
    children?: React.ReactNode | undefined;
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}


export const EntriesProvider: FC<EntriesState> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const {enqueueSnackbar} = useSnackbar();




    const addNewEntry = async (description: string) => {

        const {data} = await entriesApi.post<Entry>('/entries',{description})
      

        dispatch({ type: '[Entry] Add-Entry', payload: data });

    } 




    const updateEntry = async ({_id,description,status}:Entry, showSnackbar = false) =>{

        try {

            const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {description,status})

            dispatch({type:'[Entry] entry-updated',payload:data})

            
            if (showSnackbar) {


                enqueueSnackbar('Entrada Actualizada',{

                    variant:'success',
                    autoHideDuration:1500,
                    anchorOrigin:{
    
                        vertical:'top',
                        horizontal:'right'
                        
    
                    }
    
                })
    

                
            }

            
        
        } catch (error) {

            console.log(error);

            
        }


    }
    const deleteEntry = async ( entry: Entry, showSnackbar = false ) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${ entry._id }` )
 
            dispatch({
                type: '[Entry] - Entry-Deleted',
                payload: data
            })
 
            if( showSnackbar ) {
                enqueueSnackbar('Entrada borrada correctamente',{
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                })
            }
 
            
 
        } catch (error) {
            console.log({ error });
        }
    }



    const refreshEntries = async() =>{

        const {data} = await entriesApi.get<Entry[]>('/entries');

       dispatch({type:'[Entry] refresh-data', payload:data})

    }




    useEffect(() => {
      
        refreshEntries();
    
    }, [])
    


    return (

        <EntriesContext.Provider value={{ ...state, addNewEntry ,updateEntry ,deleteEntry  }}>

            { children }

        </EntriesContext.Provider>

    )

}