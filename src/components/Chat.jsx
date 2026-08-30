import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { getSocket } from '../utils/socket';
import { FaPaperPlane, FaArrowLeft } from 'react-icons/fa';

const Chat = () => {
    const { targetUserId } = useParams();
    const user = useSelector((store) => store.user);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [chatId, setChatId] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Fetch chat history
    useEffect(() => {
        const fetchChat = async () => {
            try {
                const res = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });
                setChatId(res.data.chatId);
                setMessages(res.data.messages);
            } catch (err) {
                console.error("Error fetching chat:", err);
            }
        };
        fetchChat();
    }, [targetUserId]);

    // Socket events
    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        socket.emit("joinChat", { targetUserId });

        socket.on("receiveMessage", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        socket.on("typing", () => setIsTyping(true));
        socket.on("stopTyping", () => setIsTyping(false));

        return () => {
            socket.off("receiveMessage");
            socket.off("typing");
            socket.off("stopTyping");
        };
    }, [targetUserId]);

    // Scroll on new messages
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim() || !chatId) return;
        const socket = getSocket();
        if (!socket) return;

        socket.emit("sendMessage", {
            chatId,
            text: newMessage.trim(),
            targetUserId,
        });

        socket.emit("stopTyping", { targetUserId });
        setNewMessage("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleTyping = (e) => {
        setNewMessage(e.target.value);
        const socket = getSocket();
        if (!socket) return;

        socket.emit("typing", { targetUserId });

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit("stopTyping", { targetUserId });
        }, 2000);
    };

    return (
        <div className="flex-1 w-full flex items-center justify-center pt-20 pb-10 px-4 animate-fade-in relative z-10">

            {/* Chat Box Container */}
            <div className="w-full max-w-3xl h-[80vh] flex flex-col glass-card rounded-3xl overflow-hidden shadow-2xl">
                
                {/* Chat Header */}
                <div className="bg-navy-900/60 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center gap-4 shrink-0">
                    <button
                        onClick={() => navigate("/connections")}
                        className="btn btn-circle btn-sm btn-ghost text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <FaArrowLeft className="text-lg" />
                    </button>
                    <div className="flex flex-col">
                        <h2 className="text-white font-bold text-lg tracking-wide">Chat</h2>
                        {isTyping && (
                            <span className="text-secondary-accent text-xs animate-pulse font-medium">typing...</span>
                        )}
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <div className="w-16 h-16 rounded-full bg-primary-accent/10 flex items-center justify-center mb-4">
                                <FaPaperPlane className="text-2xl text-primary-accent" />
                            </div>
                            <p className="text-lg font-medium text-white/70">No messages yet</p>
                            <p className="text-sm">Say hello! 👋</p>
                        </div>
                    )}
                    {messages.map((msg, index) => {
                        const isMine = msg.senderId?._id === user?._id || msg.senderId === user?._id;
                        return (
                            <div
                                key={msg._id || index}
                                className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-md
                                        ${isMine
                                            ? 'bg-primary-accent text-white rounded-br-sm'
                                            : 'bg-navy-800/80 text-gray-200 rounded-bl-sm border border-white/5'
                                        }`}
                                >
                                    <p className="leading-relaxed">{msg.text}</p>
                                    <p className={`text-[10px] mt-1 text-right ${isMine ? 'text-white/70' : 'text-gray-500'}`}>
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-navy-900/60 backdrop-blur-md border-t border-white/10 px-4 py-4 shrink-0">
                    <div className="flex items-center gap-3 input-premium rounded-full px-2 py-1 focus-within:border-primary-accent transition-all">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={handleTyping}
                            onKeyDown={handleKeyPress}
                            placeholder="Type a message..."
                            className="flex-1 h-10 px-4 bg-transparent text-white placeholder-gray-500 outline-none"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!newMessage.trim()}
                            className="w-10 h-10 rounded-full btn-primary-glow
                                       flex items-center justify-center text-white
                                       disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none
                                       transition-all shrink-0"
                        >
                            <FaPaperPlane className="mr-0.5 text-sm" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
