import { UIContext } from './UIContext'
import { uiReducer } from './uiReducer'
import { FC } from 'react'
import { useReducer } from 'react'



export interface UIState {

    sidemenuOpen: boolean;
    children?: React.ReactNode | undefined;
    isAddingEntry:boolean
    isDragging:boolean
   

}


const UI_INITIAL_STATE: UIState = {

    sidemenuOpen: false,
    isAddingEntry:false,
    isDragging:false

}


export const UIProvider: FC<UIState> = ({ children }) => {


    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () =>{

        dispatch({type:'UI-Open-SideBar'})
    }

    const closeSideMenu = () =>{

        dispatch({type:'UI-Close-SideBar'})
    }

    const setIsAddingEntry = (isAdding:boolean) =>{

        dispatch({type:'UI - Set isAddingEntry', payload:isAdding})

    }

    const startDragging = () =>{

        dispatch({type:'UI - Start-Dragging'})
    }

    const endDragging = () =>{

        dispatch({type:'UI - End-Dragging'})
    }


  

    return (

        <UIContext.Provider value={{
            
                ...state ,
                openSideMenu,
                closeSideMenu,
                setIsAddingEntry,
                startDragging,
                endDragging,
                
                
                
            
            }}>

            {children}

        </UIContext.Provider>

    )

}