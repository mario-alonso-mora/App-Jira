
import { seedData } from '@/databases/seed-data';
import { Entry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from '../../databases';





type Data = {

    message: string


}

export default async function handler(req: NextApiRequest, resp: NextApiResponse<Data>) {

    if(process.env.NODE_ENV === 'production'){

        resp.status(401).json({

            message:'No tiene acceso a este servicio'
        })

    }

    await db.connect();

    await Entry.deleteMany();
    await Entry.insertMany(seedData.entries)


    await db.disconnect();

    resp.status(200).json({

       
        message:'Proceso realizado Correctamente',


    })
}