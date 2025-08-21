import type { NextApiRequest, NextApiResponse } from 'next';
import { put } from '@vercel/blob';
import { get, set } from '@vercel/kv'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { messages } = req.body;
        await put('chat/messages', JSON.stringify(messages));
    } else if (req.method === 'GET') {
        // Replace this with your actual method to retrieve messages, e.g. from KV or file system
        // Example using KV:
        // const messages = await get('chat/messages');
        // res.status(200).json(messages);

        res.status(501).json({ error: 'GET not implemented: No get method available from @vercel/blob.' });
        res.status(200).json(messages);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}