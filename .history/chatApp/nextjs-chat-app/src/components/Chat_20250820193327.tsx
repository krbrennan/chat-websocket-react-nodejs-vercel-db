import React, { useEffect, useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        // get old messages from redis on mount

        fetch('/api/save-chat')
            .then(res => res.json())
            .then(data => {
                if(Array.isArray(data)){
                    setMessages(data.map(messageObj => messageObj.message))
                }
            });
    }, []);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080'); // Adjust the URL as needed

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    

    }, []);

    const sendMessage = () => {
        if (ws && input) {
            ws.send(input);
            setInput('');
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;