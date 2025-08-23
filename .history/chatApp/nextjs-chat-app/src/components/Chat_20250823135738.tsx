import React, { useEffect, useState } from 'react';

const Chat = () => {
    // const [messages, setMessages] = useState<string[]>([]);
    const [messages, setMessages] = useState<{message: string, timestamp: number}[]>([])
    const [input, setInput] = useState<string>('');
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        // get old messages from redis on mount
        fetch('/api/save-chat')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(Array.isArray(data)){
                    // Mapping over an object to set object state:
                    // The function passed to setMessages takes the previous state (an array of objects)
                    // and returns a new array of objects. Each object in the new array is constructed
                    // by taking the properties of the corresponding object in the previous state
                    // (in this case, the message and timestamp properties) and returning a new object
                    // with the same properties. The new array of objects is then set as the new state.
                    setMessages(data.map(messageObj => { return { message: messageObj.message, timestamp: messageObj.timestamp } }));
                } else {
                    console.error("Data is not an array:", data);
                }
            });
    }, []);

    useEffect(() => {
        // opens websocket connect to detect new messages in real time
        const socket = new WebSocket('ws://localhost:8080'); // Adjust the URL as needed

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            if(typeof event.data === "string") {
                console.log('STRING');
                setMessages((prevMessages) => [...prevMessages, event.data]);
            } else if (event.data instanceof Blob) {
                console.log('blob');
                event.data.text().then(text => {
                    setMessages((prevMessages) => [...prevMessages, text]);
                });
            }
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
                    <div key={index}>{msg.message} <span>{new Date(msg.timestamp).toLocaleTimeString()}</span></div>
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