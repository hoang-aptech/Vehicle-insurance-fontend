import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, Input, Row, Col, Card, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './Blog.module.scss';
import Cute from '../../assets/Images/cute1.png';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const { Meta } = Card;

const Blog = () => {
    const [dataState, setDataState] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const getDataFromAPI = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7289/api/News');
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }, []);

    const createData = useCallback(async () => {
        const dataFromAPI = await getDataFromAPI();
        const newData = dataFromAPI.map((item) => {
            const image = item.image_path ? `data:image/png;base64,${item.image_path}` : '';
            return {
                title: item.name,
                description: item.description,
                link: '#',
                image,
            };
        });
        return newData;
    }, [getDataFromAPI]);

    useEffect(() => {
        const fetchData = async () => {
            const newData = await createData();
            setDataState(newData);
        };
        fetchData();
    }, [createData, setDataState]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const currentItems = dataState.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className={styles.blogDetailsContainer}>
            <div className={styles.blogHeader}>
                <Title level={1} style={{ fontSize: '16px', color: 'green' }}>
                    Saladin Blog
                </Title>
                <Title level={2} style={{ fontSize: '34px' }}>
                    Tự tin sống, tự tin yêu thương cùng Saladin
                </Title>
            </div>
            <div className={styles.blogContent}>
                <div className={styles.blogBanner}>
                    <div className={styles.bannerText}>
                        <Title level={3} style={{ color: 'white', fontSize: '34px' }}>
                            Từ điển bảo hiểm
                        </Title>
                        <Paragraph style={{ color: 'white', fontSize: '20px' }}>
                            Bạn thắc mắc về ý nghĩa của các thuật ngữ bảo hiểm? Hãy để Saladin giúp bạn!
                        </Paragraph>
                        <Button type="primary" size="large" className={styles.btn}>
                            Khám phá
                        </Button>
                    </div>
                    <div className={styles.bannerImage}>
                        <img src={Cute} alt="Girl with question mark" />
                    </div>
                </div>

                <div className={styles.searchBar}>
                    <Input placeholder="Tìm kiếm bài báo" suffix={<SearchOutlined />} />
                </div>

                <Row gutter={[16, 16]} style={{ marginTop: '40px' }}>
                    {currentItems.map((item) => (
                        <Col xs={24} sm={12} md={8} key={item.title}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={item.title}
                                        src={item.image}
                                        style={{ height: 150, objectFit: 'cover' }}
                                    />
                                }
                            >
                                <Meta title={<a href={item.link}>{item.title}</a>} description={item.description} />
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={dataState.length}
                    onChange={handlePageChange}
                    style={{ marginTop: '20px', textAlign: 'center' }}
                />
            </div>
        </div>
    );
};

export default Blog;
