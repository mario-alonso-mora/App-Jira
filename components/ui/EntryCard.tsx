import { Card, CardActionArea, CardContent, Typography, CardActions, colors } from '@mui/material';
import { FC, DragEvent, useContext } from 'react';
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from 'next/router';
import { getformatDistanceToNow } from '../../utils/dateFunctions';


interface Props {

  entry:Entry

}

export const EntryCard:FC<Props> = ({entry}) => {


    const {startDragging,endDragging} = useContext(UIContext);

   const router = useRouter();


    const onDragStart = (event:DragEvent) =>{


      event.dataTransfer.setData('text',entry._id)

      startDragging();


    }

    const onDragEnd = () =>{
      endDragging();

    }

    const onclick = () =>{

      router.push(`/entries/${entry._id}`)
    }


   


  return (

        <Card sx={{marginBottom:1}}
        onClick={onclick}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}

        >

        <CardActionArea>

            <CardContent>

            <Typography sx={{whiteSpace:'pre-line'}}>{entry.description}</Typography>

            </CardContent>

            <CardActions sx={{display:'flex',justifyContent:'end',paddingRight:2}}>

                <Typography variant='body2'>{getformatDistanceToNow(entry.createdAt)}</Typography>

            </CardActions>


        </CardActionArea>

        </Card>


  )
}
