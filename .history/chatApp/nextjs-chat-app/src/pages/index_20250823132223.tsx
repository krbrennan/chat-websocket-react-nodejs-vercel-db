import { useEffect, useState } from 'react';
import Chat from '../components/Chat';

const Home = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        setWs(socket);

        socket.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = (message: string) => {
        if (ws) {
            ws.send(message);
        }
    };

    return (
        <div>
            <h1>Chit</h1>
            {/* <Chat messages={messages} onSendMessage={sendMessage} /> */}
        </div>
    );
};

export default Home;