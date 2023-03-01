import { db } from '@/databases'
import { Entry } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IEntry } from '../../../models/Entry';


type Data = | { message: string } | IEntry[] | IEntry

export default function entriesEndpoint(request: NextApiRequest, response: NextApiResponse<Data>) {


    switch (request.method) {
        case 'GET':

            return getEntries(response)

        case 'POST':

            return postEntries(request, response)


    
        default:
            return response.status(200).json({

                message: 'Endpoint no existe'


            })


    }



}



const getEntries = async (response: NextApiResponse<Data>) => {

    await db.connect();

    const entries = await Entry.find().sort({ createdAt: 'ascending' });


    await db.disconnect();


    response.status(200).json(entries)


}

const postEntries = async (request: NextApiRequest, response: NextApiResponse<Data>) => {



    const { description = '' } = request.body;

    const newEntry = new Entry({

        description,
        createdAt: Date.now(),


    })


    try {

        await db.connect();

        await newEntry.save()


        await db.disconnect();


        return response.status(201).json(newEntry)

    } catch (error) {

        await db.disconnect();

        console.log(error);

        response.status(500).json({
            message: 'Algo salio mal revisar consola del servidor'
        })


    }





}






