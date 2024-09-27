import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import styles from './Chat.module.scss';

const ChatApp = () => {
    const [isChatVisible, setChatVisible] = useState(false);
    const [messages, setMessages] = useState([
        { text: 'Hello, how are you?', sender: 'left' },
        { text: "I'm good, thanks! How about you?", sender: 'right' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const toggleChatWindow = () => {
        setChatVisible(!isChatVisible);
    };

    const handleCancel = () => {
        setChatVisible(false);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const messageToSend = { text: newMessage, sender: 'right' };

            console.log('Sent Message:', messageToSend);

            setMessages([...messages, messageToSend]);
            setNewMessage('');
        }
    };

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
                            <div key={index} className={`${styles['message']} ${styles[message.sender]}`}>
                                <p>{message.text}</p>
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
