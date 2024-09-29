import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import axios from 'axios';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import styles from './Chat.module.scss';

const ChatApp = ({ chatId, role }) => {
    console.log({ chatId, role });

    const [isChatVisible, setChatVisible] = useState(true);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conn, setConnection] = useState();
    const messagesEndRef = useRef();

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const joinChatRoom = async () => {
        console.log('joinChatRoom');

        try {
            const conn = new HubConnectionBuilder()
                .withUrl('https://localhost:7289/chat')
                .configureLogging(LogLevel.Information)
                .build();

            conn.on('ReceiveMessages', (messages) => {
                console.log(messages);
                const formattedMessages = messages.map((msg) => ({
                    ...msg,
                    sender: msg.role === role ? 'right' : 'left',
                }));
                setMessages(formattedMessages);
            });

            conn.on('ReceiveMessage', (m) => {
                console.log(m);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        ...m,
                        sender: m.role === role ? 'right' : 'left',
                    },
                ]);
            });

            await conn.start();
            await conn.invoke('JoinSpecificGroup', chatId);

            setConnection(conn);
        } catch (err) {
            console.error(err);
        }
    };

    // const fetchMessages = async () => {
    //     try {
    //         const response = await axios.get('https://localhost:7289/api/Messages', {
    //             params: { customersupportId: 1 },
    //         });
    //         const formattedMessages = response.data.map((msg) => ({
    //             ...msg,
    //             sender: msg.role === 'User' ? 'right' : 'left',
    //         }));
    //         setMessages(formattedMessages);
    //     } catch (error) {
    //         console.error('Lỗi khi nhận tin nhắn:', error);
    //     }
    // };

    const sendMessage = async () => {
        const currentTimeUTC = new Date();
        const timeZoneOffset = 7 * 60; // +7 hours converted to minutes
        const currentTimePlus7 = new Date(currentTimeUTC.getTime() + timeZoneOffset * 60 * 1000);
        const currentTimePlus7ISO = currentTimePlus7.toISOString().slice(0, 19);

        const messageToSend = {
            time: currentTimePlus7ISO,
            message: newMessage,
            customersupportId: chatId,
            role,
        };

        try {
            conn.invoke('SendMessage', messageToSend);
            // await axios.post('https://localhost:7289/api/Messages', messageToSend);
            // setMessages([...messages, { message: newMessage, sender: 'right', time: currentTimePlus7ISO, role }]);
            setNewMessage('');
            scrollToBottom();
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
        }
    };

    // const toggleChatWindow = () => {
    //     setChatVisible(!isChatVisible);
    //     if (!isChatVisible) {
    //         fetchMessages();
    //     }
    // };

    const handleCancel = () => {
        setChatVisible(false);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            sendMessage();
        }
    };

    useEffect(() => {
        if (isChatVisible) {
            joinChatRoom();
        } else if (conn) {
            try {
                conn.stop()
                    .then(() => {
                        console.log('Connection stopped.');
                    })
                    .catch((err) => console.error('Error while stopping connection: ', err));
            } catch (err) {
                console.error('Error while stopping connection: ', err);
            }
        }

        return () => {
            if (conn) {
                conn.stop().catch((err) => console.error('Error while stopping connection on unmount: ', err));
            }
        };
    }, [isChatVisible]);

    return (
        <div>
            {/* <Button
                type="primary"
                icon={<WechatOutlined />}
                onClick={toggleChatWindow}
                style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}
            /> */}

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
