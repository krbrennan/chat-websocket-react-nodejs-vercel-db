import type { NextApiRequest, NextApiResponse } from 'next';
import { put } from '@vercel/blob';
import kv from '@vercel/kv';
// import set from '@vercel/kv';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { message } = req.body;
        let messages = await kv.get('chat/messages') || [];
        messages.push({ message, timestamp: Date.now() });
        await kv.set('chat/messages', messages);
        res.status(200).json({ success: true });
    } else if (req.method === 'GET') {
        const messages = await kv.get('chat/messages') || [];
        res.status(200).json(messages);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}