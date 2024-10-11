import React, { useRef, useState } from 'react';
import { Button, Row, Col, Typography, Progress } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import styles from './Contract.module.scss';

const { Title, Paragraph } = Typography;

const Contract = () => {
    const contractRef = useRef();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const exportPDF = () => {
        setLoading(true);
        let loadProgress = 0;
        const interval = setInterval(() => {
            loadProgress += 1;
            setProgress(loadProgress);
            if (loadProgress >= 100) {
                clearInterval(interval);
                const doc = new jsPDF();
                doc.text('Contract', 10, 10);
                doc.text('Party A: ABC Company', 10, 20);
                doc.text('Party B: XYZ Company', 10, 30);
                doc.text('Contract content: ....', 10, 40);
                doc.save('contract.pdf');
                setLoading(false);
                setProgress(0);
            }
        }, 100);
    };

    return (
        <div className={styles.contractContainer}>
            <div ref={contractRef} className={styles.contractContent}>
                <h1>Insurance contract</h1>
                <Row gutter={32}>
                    <Col span={12} className={styles.contractSection}>
                        <Title level={3} className={styles.contractTitle}>
                            Party A
                        </Title>
                        <Paragraph>Name: ABC Company</Paragraph>
                        <Paragraph>Address: 123 ABC Street, Hanoi</Paragraph>
                        <Paragraph>Phone number: 0909123456</Paragraph>
                    </Col>
                    <Col span={12} className={styles.contractSection}>
                        <Title level={3} className={styles.contractTitle}>
                            Party B
                        </Title>
                        <Paragraph>Name: XYZ Company</Paragraph>
                        <Paragraph>Address: 456 XYZ Street, Ho Chi Minh City</Paragraph>
                        <Paragraph>Phone number: 0988765432</Paragraph>
                    </Col>
                </Row>
            </div>

            <Button type="primary" onClick={exportPDF} className={styles.exportPdfButton} disabled={loading}>
                {loading ? (
                    <Progress
                        type="circle"
                        percent={progress}
                        width={70}
                        format={() => `${progress}%`}
                        strokeColor={progress < 20 ? '#ff4d4f' : progress <= 50 ? '#f4f816' : '#10daf9'}
                    />
                ) : (
                    <DownloadOutlined style={{ fontSize: '24px' }} />
                )}
            </Button>
        </div>
    );
};

export default Contract;
