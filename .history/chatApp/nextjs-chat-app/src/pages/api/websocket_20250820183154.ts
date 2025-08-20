import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'ws';

const WebSocketServer = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'WebSocket server is running' }));
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};

const wss = new Server({ noServer: true });

wss.on('connection', (ws) => {
    console.log('New client connected');
    
    ws.on('message', (message) => {
        console.log('Received:', message);
        wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        WebSocketServer(req, res);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};