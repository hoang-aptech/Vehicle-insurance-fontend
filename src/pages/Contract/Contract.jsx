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
                <h1>Hợp đồng bảo hiểm</h1>
                <Row gutter={32}>
                    <Col xs={24} sm={12} className={styles.contractSection}>
                        <Title level={3} className={styles.contractTitle}>
                            Bên A
                        </Title>
                        <Paragraph>Tên: ABC Company</Paragraph>
                        <Paragraph>Địa chỉ: 123 ABC Street, Hà Nội</Paragraph>
                        <Paragraph>Số điện thoại: 0909123456</Paragraph>
                    </Col>
                    <Col xs={24} sm={12} className={styles.contractSection}>
                        <Title level={3} className={styles.contractTitle}>
                            Bên B
                        </Title>
                        <Paragraph>Tên: XYZ Company</Paragraph>
                        <Paragraph>Địa chỉ: 456 XYZ Street, TP. Hồ Chí Minh</Paragraph>
                        <Paragraph>Số điện thoại: 0988765432</Paragraph>
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
