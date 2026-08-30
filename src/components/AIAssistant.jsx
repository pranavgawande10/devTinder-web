import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { FaPaperPlane, FaRobot, FaTimes, FaLightbulb, FaTrophy, FaTools } from 'react-icons/fa';

const AIAssistant = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hi! I'm DevSpark AI. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const quickPrompts = [
        { icon: <FaLightbulb className="text-yellow-400" />, text: "Suggest 3 Full-Stack MERN project ideas" },
        { icon: <FaTrophy className="text-orange-400" />, text: "Ideas for a Hackathon" },
        { icon: <FaTools className="text-blue-400" />, text: "Project ideas combining React + Python + Machine Learning" }
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (promptText) => {
        const textToSend = promptText || input;
        if (!textToSend.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await axios.post(
                `${BASE_URL}/chat/ai`,
                { prompt: textToSend },
                { withCredentials: true }
            );

            setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
        } catch (err) {
            console.error("AI Error:", err);
            const errorMsg = err.response?.data?.message || "Sorry, I'm having trouble connecting right now. Please try again later.";
            setMessages(prev => [...prev, { role: 'ai', text: `**Error:** ${errorMsg}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col glass-card border-l border-white/10 bg-navy-900/90 shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 bg-black/20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-accent/20 flex items-center justify-center">
                        <FaRobot className="text-primary-accent" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-md tracking-wide">DevSpark AI</h3>
                        <p className="text-xs text-secondary-accent animate-pulse">Online</p>
                    </div>
                </div>
                <button onClick={onClose} className="btn btn-circle btn-xs btn-ghost text-gray-400 hover:text-white">
                    <FaTimes />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[90%] px-4 py-3 rounded-2xl text-sm shadow-md ${
                            msg.role === 'user' 
                                ? 'bg-primary-accent text-white rounded-br-sm' 
                                : 'bg-navy-800/80 text-gray-200 rounded-bl-sm border border-white/5'
                        }`}>
                            {msg.role === 'ai' ? (
                                <div className="prose prose-invert prose-sm max-w-none text-gray-200">
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>
                            ) : (
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                            )}
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-navy-800/80 px-4 py-3 rounded-2xl rounded-bl-sm border border-white/5 flex items-center gap-2 shadow-md">
                            <span className="w-2 h-2 rounded-full bg-primary-accent animate-bounce"></span>
                            <span className="w-2 h-2 rounded-full bg-primary-accent animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-2 h-2 rounded-full bg-primary-accent animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts (Only show if messages length is small or input is empty) */}
            {messages.length < 3 && !input && (
                <div className="px-4 pb-2 flex flex-col gap-2">
                    {quickPrompts.map((qp, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSend(qp.text)}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 transition-all hover:border-primary-accent/50"
                        >
                            {qp.icon}
                            <span>{qp.text}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20 shrink-0">
                <div className="flex items-center gap-2 input-premium rounded-full px-2 py-1 focus-within:border-primary-accent transition-all">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                        placeholder="Ask DevSpark AI..."
                        className="flex-1 h-9 px-3 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isLoading}
                        className="w-9 h-9 rounded-full btn-primary-glow flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
                    >
                        <FaPaperPlane className="text-xs ml-0.5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
