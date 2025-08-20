export interface ChatMessage {
    id: string;
    username: string;
    message: string;
    timestamp: Date;
}

export interface User {
    id: string;
    username: string;
}