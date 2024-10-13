import jsPDF from 'jspdf';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Row, Col, Typography, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { Context } from '~/Context';
import Wrapper from '~/components/Wrapper';
import config from '~/config';

const { Title, Paragraph } = Typography;

const Contract = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };
    const { user } = useContext(Context);
    const { id } = useParams();
    const contractRef = useRef();
    const [contractData, setContractData] = useState({});

    const getContractData = async () => {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/insurances/' + id);
        setContractData(res.data);
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        const lineHeight = 10;
        const pageHeight = 297;
        const marginLeft = 10;
        const marginTop = 10;
        const maxLineWidth = 210 - marginLeft * 2;

        let cursorY = marginTop; // Start cursor at the top margin

        // Function to check if the current Y-position exceeds the page height
        const checkPageOverflow = (doc, cursorY, lineHeight) => {
            if (cursorY + lineHeight > pageHeight - marginTop) {
                doc.addPage();
                return marginTop; // Reset cursor to top of the new page
            }
            return cursorY;
        };

        doc.setFont('times', 'bold');
        // Add title and basic information
        doc.text('Contract', marginLeft, cursorY);
        cursorY += lineHeight;

        doc.text('Party A', marginLeft, cursorY);
        cursorY += lineHeight;
        doc.setFont('times', 'normal');
        doc.text('Name: One team company', marginLeft, cursorY);
        cursorY += lineHeight;
        doc.text(
            'Address: 7th Floor, DC Building, 144 Doi Can, Ba Dinh District, Hanoi City, Vietnam',
            marginLeft,
            cursorY,
        );
        cursorY += lineHeight;
        doc.text('Phone: 19001011', marginLeft, cursorY);
        cursorY += lineHeight * 2;

        doc.setFont('times', 'bold');
        doc.text('Party B', marginLeft, cursorY);
        cursorY += lineHeight;
        doc.setFont('times', 'normal');
        doc.text('Name: ' + (user && user.fullname), marginLeft, cursorY);
        cursorY += lineHeight;
        doc.text('Address: ' + (user && user.address), marginLeft, cursorY);
        cursorY += lineHeight;
        doc.text('Phone: ' + (user && user.phone), marginLeft, cursorY);
        cursorY += lineHeight * 2; // Add some space before the contract clause

        doc.setFont('times', 'bold');
        doc.text('Clauses:', marginLeft, cursorY);
        cursorY += lineHeight * 2;
        doc.setFont('times', 'normal');
        // Add contract clause with automatic text wrapping and page breaks
        const clauseText = contractData.clause; // Your contract clause text
        const splitClauseText = doc.splitTextToSize(clauseText, maxLineWidth); // Split the text to fit within the max width

        splitClauseText.forEach((line) => {
            cursorY = checkPageOverflow(doc, cursorY, lineHeight); // Check if new page is needed
            doc.text(line, marginLeft, cursorY);
            cursorY += lineHeight; // Move cursor down for the next line
        });
        cursorY += lineHeight * 2;
        doc.setFont('times', 'bold');
        doc.text('Signature of Party A:                           Signature of Party B:', marginLeft, cursorY);

        // Save the PDF
        doc.save('contract.pdf');
    };

    useEffect(() => {
        getContractData();
    }, []);

    return (
        <Wrapper>
            {contextHolder}
            <div ref={contractRef} style={{ padding: '20px', border: '1px solid #ddd' }}>
                <Title level={2}>Contract</Title>

                <Row gutter={16}>
                    <Col span={12}>
                        <Title level={4}>Party A</Title>
                        <Paragraph>Name: One team company</Paragraph>
                        <Paragraph>
                            Address: 7th Floor, DC Building, 144 Doi Can, Ba Dinh District, Hanoi City, Vietnam
                        </Paragraph>
                        <Paragraph>Phone number: 19001011</Paragraph>
                    </Col>
                    <Col span={12}>
                        <Title level={4}>Party B</Title>
                        <Paragraph>Name: {(user && user.fullname) || 'customer fullname'}</Paragraph>
                        <Paragraph>Address: {(user && user.address) || 'customer address'}</Paragraph>
                        <Paragraph>Phone number: {(user && user.phone) || 'customer phone'}</Paragraph>
                    </Col>
                </Row>

                <Title level={4}>Contract Content</Title>
                <Paragraph>{contractData.clause}</Paragraph>
            </div>
            {user && (
                <Button type="default" onClick={exportPDF} style={{ marginTop: '20px' }}>
                    Export PDF
                </Button>
            )}
        </Wrapper>
    );
};

export default Contract;
