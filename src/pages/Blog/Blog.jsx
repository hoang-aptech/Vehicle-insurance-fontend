import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Input, Row, Col, Card, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './Blog.module.scss';
import axios from 'axios';
import config from '~/config';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Meta } = Card;

const Blog = () => {
    const [dataState, setDataState] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const getDataFromAPI = useCallback(async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/News');
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }, []);

    const createData = useCallback(async () => {
        const dataFromAPI = await getDataFromAPI();
        const newData = dataFromAPI.map((item) => {
            const image = item.image ? `data:image/png;base64,${item.image}` : '';
            return {
                title: item.name,
                description: item.description,
                link: config.routes.blogDetails.replace(':id', item.id),
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
                <Title level={1} style={{ fontSize: '5rem', color: 'green' }}>
                    Oneteam Blog
                </Title>
                <Title level={2} style={{ fontSize: '34px' }}>
                    Confident living, confident loving with Oneteam
                </Title>
            </div>
            <div className={styles.blogContent}>
                <div className={styles.searchBar}>
                    <Input placeholder="Search for an article" suffix={<SearchOutlined />} />
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
                                <Meta
                                    title={<Link to={item.link}>{item.title}</Link>}
                                    description={
                                        <div
                                            className={styles.descriptionBlog}
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    }
                                />
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
