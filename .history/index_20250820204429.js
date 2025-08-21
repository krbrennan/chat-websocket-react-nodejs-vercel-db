import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws){
    console.log("connection opened");
    ws.on('message', function message(data){
        console.log('received: %s', data);

        // Broadcast to all clients
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws.OPEN) {
                console.log(data);
                client.send(data);
            }
        });
    })
})



process.on('SIGTERM', () => {
    wss.close(() => {
        console.log('WebSocket server closed gracefully');
        process.exit(0);
    })
})