import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '@/databases';
import { Entry } from '@/models';
import { IEntry } from '../../../models/Entry';


type Data = | {message: string} | IEntry

export default function putEntriesById (req: NextApiRequest, resp: NextApiResponse<Data>) {


    const {id} = req.query;


    if (!mongoose.isValidObjectId(id)) {

            return resp.status(400).json({message:'El id no es valido ' +  id})
    }


    switch (req.method) {
        case 'PUT':
            
            return updateEntry(req,resp)
    
            case 'GET':
            
            return getEntryById(req,resp)


            case 'DELETE':                    
            return deleteEntry( req, resp )

        default:
            return resp.status(400).json({message:'Metodo no existe'})

    }
   
}

const getEntryById = async (req:NextApiRequest,resp:NextApiResponse<Data>) =>{

    const {id} = req.query;

    await db.connect();

    const getEntryForId = await Entry.findById(id)

    if (!getEntryForId) {

        await db.disconnect();

        return resp.status(400).json({message:'No hay entrada con ese ID' + id})
        
    }

    return resp.status(200).json(getEntryForId)

        
}


    const updateEntry = async (req:NextApiRequest,resp:NextApiResponse<Data>) =>{

        const {id} = req.query;

        await db.connect();

        const entryToUpdate = await Entry.findById(id)

        if (!entryToUpdate) {

            await db.disconnect();

            return resp.status(400).json({message:'No hay entrada con ese ID' + id})
            
        }

        const { 

            description = entryToUpdate.description,
            status = entryToUpdate.status,

        } = req.body

        
        try {
                
            const updatedEntry = await Entry.findByIdAndUpdate(id,{description , status},{runValidators:true, new:true});
            await db.disconnect();
            resp.status(200).json(updatedEntry!)

        } catch (error) {

            await db.disconnect();

            resp.status(400).json({message:'bad request'})
            
        }

       

    
    }

    const deleteEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
       
        const { id } = req.query;   
     
        await db.connect();
        const entryDBTodelete = await Entry.findByIdAndDelete( id );
        await db.disconnect();
     
    
     
        if ( !entryDBTodelete ) {
            return res.status(400).json({message: 'No hay entrada con ese id ' + id });
        }
        
        return res.status(200).json( entryDBTodelete );
     
    } 