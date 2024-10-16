import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal } from 'antd';
import {
    WechatOutlined,
    MessageOutlined,
    PhoneOutlined,
    CloseCircleOutlined,
    FacebookOutlined,
} from '@ant-design/icons';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import PropTypes from 'prop-types';

import styles from './Chat.module.scss';

const ChatApp = forwardRef(({ chatId, role }, ref) => {
    const [isChatVisible, setChatVisible] = useState(true);
    const [isIconVisible, setIconVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conn, setConnection] = useState(null);
    const messagesEndRef = useRef(null);

    useImperativeHandle(ref, () => ({
        handleShowChat() {
            setChatVisible(true);
        },
    }));

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const joinChatRoom = useCallback(async () => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl('https://localhost:7289/chat')
                .configureLogging(LogLevel.Information)
                .build();

            connection.on('ReceiveMessages', (receivedMessages) => {
                const formattedMessages = receivedMessages.map((msg) => ({
                    ...msg,
                    sender: msg.role === role ? 'right' : 'left',
                }));
                setMessages(formattedMessages);
            });

            connection.on('ReceiveMessage', (message) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        ...message,
                        sender: message.role === role ? 'right' : 'left',
                    },
                ]);
                scrollToBottom();
            });

            await connection.start();
            await connection.invoke('JoinSpecificGroup', chatId);
            setConnection(connection);
        } catch (err) {
            console.error('Error joining chat room:', err);
        }
    }, [chatId, role]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const currentTimeUTC = new Date();
        const timeZoneOffset = 7 * 60; // Adjust as needed
        const currentTimePlus7 = new Date(currentTimeUTC.getTime() + timeZoneOffset * 60 * 1000);
        const currentTimePlus7ISO = currentTimePlus7.toISOString().slice(0, 19);
        const messageToSend = {
            time: currentTimePlus7ISO,
            message: newMessage,
            customersupportId: chatId,
            role,
        };

        try {
            await conn.invoke('SendMessage', messageToSend);
            setNewMessage('');
            scrollToBottom();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const toggleIconVisibility = () => {
        setIconVisible(!isIconVisible);
    };

    const showChatWindow = () => {
        setChatVisible(true);
    };

    const handleCancel = () => {
        setChatVisible(false);
        setIconVisible(false);
    };

    const handleSendMessage = () => {
        sendMessage();
    };

    useEffect(() => {
        if (isChatVisible) {
            joinChatRoom();
        } else if (conn) {
            conn.stop().catch((err) => console.error('Error stopping connection:', err));
        }

        return () => {
            if (conn) {
                conn.stop().catch((err) => console.error('Error while stopping connection on unmount:', err));
            }
        };
    }, [isChatVisible, joinChatRoom]);

    return (
        <div>
            {!isIconVisible ? (
                <Button
                    type="primary"
                    icon={<WechatOutlined />}
                    onClick={toggleIconVisibility}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        zIndex: 1000,
                        backgroundColor: '#14c560',
                    }}
                />
            ) : (
                <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
                    <Button
                        type="primary"
                        icon={<MessageOutlined />}
                        onClick={showChatWindow}
                        style={{ marginRight: '10px', backgroundColor: '#14c560' }}
                    />
                    <Button
                        type="primary"
                        icon={<PhoneOutlined />}
                        style={{ marginRight: '10px', backgroundColor: '#14c560' }}
                    />
                    <Button
                        type="primary"
                        icon={<FacebookOutlined />}
                        style={{ marginRight: '10px', backgroundColor: '#14c560' }}
                    />
                    <Button
                        type="primary"
                        icon={<CloseCircleOutlined />}
                        onClick={handleCancel}
                        style={{ backgroundColor: '#14c560' }}
                    />
                </div>
            )}

            <Modal
                open={isChatVisible}
                footer={null}
                onCancel={handleCancel}
                width={400}
                className={styles['chat-modal']}
                style={{ padding: 0 }}
                closable={false}
                centered
            >
                <div className={styles['chat-header']}>
                    <h3>ChatBot One team</h3>
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
                        <div ref={messagesEndRef} />
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
});

ChatApp.propTypes = {
    chatId: PropTypes.number.isRequired,
    role: PropTypes.oneOf(['User', 'Employee']).isRequired,
};

export default ChatApp;
