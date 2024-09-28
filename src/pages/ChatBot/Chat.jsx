import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import axios from 'axios';
import styles from './Chat.module.scss';

const ChatApp = () => {
    const [isChatVisible, setChatVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const fetchMessages = async () => {
        try {
            const response = await axios.get('https://localhost:7289/api/Messages', {
                params: { customersupportId: 1 },
            });
            const formattedMessages = response.data.map((msg) => ({
                ...msg,
                sender: msg.role === 'User' ? 'right' : 'left',
            }));
            setMessages(formattedMessages);
        } catch (error) {
            console.error('Lỗi khi nhận tin nhắn:', error);
        }
    };

    const sendMessage = async (role) => {
        const currentTime = new Date().toISOString();
        const messageToSend = {
            time: currentTime,
            message: newMessage,
            customersupportId: 1,
            role: role,
        };

        try {
            await axios.post('https://localhost:7289/api/Messages', messageToSend);
            setMessages([...messages, { message: newMessage, sender: 'right', time: currentTime, role }]);
            setNewMessage('');
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
        }
    };

    const toggleChatWindow = () => {
        setChatVisible(!isChatVisible);
        if (!isChatVisible) {
            fetchMessages();
        }
    };

    const handleCancel = () => {
        setChatVisible(false);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            sendMessage('user');
        }
    };

    useEffect(() => {
        if (isChatVisible) {
            fetchMessages();
        }
    }, [isChatVisible]);

    return (
        <div>
            <Button
                type="primary"
                icon={<WechatOutlined />}
                onClick={toggleChatWindow}
                style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}
            />

            <Modal
                visible={isChatVisible}
                footer={null}
                onCancel={handleCancel}
                width={400}
                className={styles['chat-modal']}
                style={{ padding: 0 }}
                closable={false}
                centered
            >
                <div className={styles['chat-header']}>
                    <h3>ChatBot Saladin</h3>
                    <Button onClick={handleCancel} className={styles['close-button']}>
                        X
                    </Button>
                </div>
                <div className={styles['chat-body']}>
                    <div className={styles['messages']}>
                        {messages.map((message, index) => (
                            <div key={index} className={`${styles['message-container']} ${styles[message.sender]}`}>
                                {message.sender === 'right' && (
                                    <span className={`${styles['message-time']} ${styles['right-time']}`}>
                                        {new Date(message.time).toLocaleTimeString()}
                                    </span>
                                )}
                                <div className={`${styles['message']} ${styles[message.sender]}`}>
                                    {message.message}
                                </div>
                                {message.sender === 'left' && (
                                    <span className={`${styles['message-time']} ${styles['left-time']}`}>
                                        {new Date(message.time).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles['chat-footer']}>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className={styles['message-input']}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button type="primary" className={styles['send-button']} onClick={handleSendMessage}>
                        Send
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default ChatApp;
