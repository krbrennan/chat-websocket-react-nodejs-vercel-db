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
                console.log(data);
                if(Array.isArray(data)){
                    setMessages(data.map(messageObj => messageObj.message));
                }
            });
    }, []);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080'); // Adjust the URL as needed

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            if(typeof event.data === "string") {
                setMessages((prevMessages) => [...prevMessages, event.data]);
            } else if (event.data instanceof Blob) {
                event.data.text().then(text => {
                    setMessages((prevMessages) => [...prevMessages, text]);
                });
            }
            console.log("event!");
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    

    }, []);

    const sendMessage = () => {
        if (ws && input) {
            ws.send(input);

            // save message to redis via the api
            fetch('/api/save-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

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