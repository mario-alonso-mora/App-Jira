import mongoose from 'mongoose';
import { db } from '@/databases';
import { Entry, IEntry } from '@/models';



export const getEntryById = async (id: string):Promise<IEntry | null> => {
  

    if (!mongoose.isValidObjectId(id)) return null ;


    await db.connect()

    const entry = await Entry.findById(id).lean();

    await db.disconnect();


    return JSON.parse(JSON.stringify(entry))




}
