import React, { useState } from 'react';
import { Typography, Button, Input, Row, Col, Card, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './Blog.module.scss';
import Cute from '../../assets/Images/cute1.png';
import blog1 from '../../assets/Images/blog1.png';
import blog2 from '../../assets/Images/blog2.png';
import blog3 from '../../assets/Images/blog3.png';
import blog4 from '../../assets/Images/blog4.png';
import blog5 from '../../assets/Images/blog5.png';
import blog6 from '../../assets/Images/blog6.png';
import blog7 from '../../assets/Images/blog7.png';
import blog8 from '../../assets/Images/blog8.png';
import blog9 from '../../assets/Images/blog9.png';
import blog10 from '../../assets/Images/blog10.png';
import blog11 from '../../assets/Images/blog11.png';
import blog12 from '../../assets/Images/blog12.png';
import blog13 from '../../assets/Images/blog13.png';
import blog14 from '../../assets/Images/blog14.png';
import blog15 from '../../assets/Images/blog15.png';
import blog16 from '../../assets/Images/blog16.png';
import blog17 from '../../assets/Images/blog17.png';
import blog18 from '../../assets/Images/blog18.png';
import blog19 from '../../assets/Images/blog19.png';
import blog20 from '../../assets/Images/blog20.png';
import blog21 from '../../assets/Images/blog21.png';
import blog22 from '../../assets/Images/blog22.png';
import blog23 from '../../assets/Images/blog23.png';
import blog24 from '../../assets/Images/blog24.png';

const { Title, Paragraph } = Typography;

const data = [
    {
        title: 'Bảo hiểm Thai sản độc quyền “Bên Mẹ, Bên Bé” nay đã đến bên bạn!',
        description:
            'Saladin phối hợp với Bảo hiểm Bảo Minh cho ra mắt sản phẩm Bảo hiểm Thai sản độc quyền với mức phí chỉ từ 750.000 VND/năm cùng 6 lựa chọn […]',
        link: '#',
        image: blog1,
    },
    {
        title: 'An toàn giao thông – Các điều tuyệt đối tránh sau khi lái xe ô tô gặp tai nạn giao thông',
        description:
            'Bị va chạm hoặc gây tai nạn khi tham gia giao thông có lẽ là những tình huống tồi tệ nhất mà chúng ta thường có tâm lý né tránh […]',
        link: '#',
        image: blog2,
    },
    {
        title: 'Quy trình hoàn tiền hủy chuyến khi mua bảo hiểm chuyến đi như thế nào?',
        description:
            'Bạn đã lên kế hoạch cho chuyến du lịch mơ ước và háo hức chờ ngày khởi hành? Nhưng bạn đã cân nhắc hết những rủi ro bất ngờ có […]',
        link: '#',
        image: blog3,
    },
    {
        title: 'Luật giao thông 2024: Không tích hợp giấy phép lái xe trên VNeID có bị phạt?',
        description:
            'Từ ngày 01/07/2024, người dân tham gia giao thông có thể sử dụng ứng dụng VNeID để xuất trình giấy phép lái xe (GPLX) và giấy đăng ký xe (đăng […]',
        link: '#',
        image: blog4,
    },
    {
        title: 'Kinh nghiệm du lịch Úc an toàn: Top những thành phố an toàn nhất ở Úc',
        description:
            'Úc là điểm đến khiến nhiều người mê say bởi thiên nhiên hùng vĩ, văn hóa đa dạng và nhiều thành phố xinh đẹp để khám phá. Nếu bạn đang […]',
        link: '#',
        image: blog5,
    },
    {
        title: 'Cách tra cứu phạt nguội và đăng kiểm toàn quốc',
        description:
            'Bên cạnh việc xử phạt ngay tại thời điểm vi phạm, Luật Giao thông đường bộ còn quy định hình thức xử lý “phạt nguội” đối với một số hành […]',
        link: '#',
        image: blog6,
    },
    {
        title: 'Những lưu ý khi mua bảo hiểm trợ cấp nằm viện',
        description:
            'Bảo hiểm trợ cấp nằm viện không chỉ bảo vệ tài chính của bạn khi phải nhập viện mà còn giúp bạn an tâm và tiện lợi trong các trường […]',
        link: '#',
        image: blog7,
    },
    {
        title: 'Điều kiện để được mua bảo hiểm cho người lớn tuổi',
        description:
            'Vấn đề sức khỏe và bảo hiểm du lịch đã trở thành một phần không thể thiếu trong cuộc sống của mỗi người. Tuy nhiên, khi đến tuổi già, việc […]',
        link: '#',
        image: blog8,
    },
    {
        title: 'Mẹ bầu không có bảo hiểm y tế nên mua bảo hiểm thai sản thế nào?',
        description:
            'Trong một giai đoạn cần nhiều sự chăm sóc như thai kỳ, việc mẹ bầu sở hữu một chương trình bảo hiểm thai sản đáng tin cậy sẽ đảm bảo […]',
        link: '#',
        image: blog9,
    },
    {
        title: 'Giá bảo hiểm thân vỏ ô tô khác nhau giữa các loại xe như thế nào và làm sao lấy báo giá trực tuyến?',
        description:
            'Trong thị trường bảo hiểm ô tô, giá bảo hiểm thân vỏ luôn được các chủ xe xem xét, bởi đây là bộ phận rất dễ hư hỏng từ các […]',
        link: '#',
        image: blog10,
    },
    {
        title: 'Những điều cần biết về giá mua bảo hiểm thân vỏ ô tô cao cấp',
        description:
            'Khi sở hữu một chiếc xe ô tô cao cấp, việc mua bảo hiểm thân vỏ là cần thiết để đảm bảo an toàn cho chiếc xe của chủ xe, […]',
        link: '#',
        image: blog11,
    },
    {
        title: 'Phí bảo hiểm thân vỏ ô tô cho xe kinh doanh tính thế nào?',
        description:
            'Hãy cùng khám phá cách tính phí bảo hiểm thân vỏ ô tô và ảnh hưởng của bảo hiểm này đối với doanh nghiệp kinh doanh xe ô tô. Đối […]',
        link: '#',
        image: blog12,
    },
    {
        title: 'Làm thế nào để định giá xe để tính phí bảo hiểm vật chất xe ô tô chuẩn nhất?',
        description:
            'Saladin phối hợp với Bảo hiểm Bảo Minh cho ra mắt sản phẩm Bảo hiểm Thai sản độc quyền với mức phí chỉ từ 750.000 VND/năm cùng 6 lựa chọn […]',
        link: '#',
        image: blog13,
    },
    {
        title: '11 điều sản phụ cần làm trước khi mang thai',
        description:
            'Bị va chạm hoặc gây tai nạn khi tham gia giao thông có lẽ là những tình huống tồi tệ nhất mà chúng ta thường có tâm lý né tránh […]',
        link: '#',
        image: blog14,
    },
    {
        title: 'Các loại bảo hiểm ô tô: Bảo hiểm ô tô 2 chiều là gì và cách mua thế nào?',
        description:
            'Bạn đã lên kế hoạch cho chuyến du lịch mơ ước và háo hức chờ ngày khởi hành? Nhưng bạn đã cân nhắc hết những rủi ro bất ngờ có […]',
        link: '#',
        image: blog15,
    },
    {
        title: 'Làm gì khi mất giấy chứng nhận kiểm định ô tô?',
        description:
            'Từ ngày 01/07/2024, người dân tham gia giao thông có thể sử dụng ứng dụng VNeID để xuất trình giấy phép lái xe (GPLX) và giấy đăng ký xe (đăng […]',
        link: '#',
        image: blog16,
    },
    {
        title: 'Một số biến chứng thai sản hay gặp trong quá trình mang thai',
        description:
            'Úc là điểm đến khiến nhiều người mê say bởi thiên nhiên hùng vĩ, văn hóa đa dạng và nhiều thành phố xinh đẹp để khám phá. Nếu bạn đang […]',
        link: '#',
        image: blog17,
    },
    {
        title: 'Kinh nghiệm du lịch Đài Loan: Bí kíp tham quan vườn quốc gia Taroko',
        description:
            'Bên cạnh việc xử phạt ngay tại thời điểm vi phạm, Luật Giao thông đường bộ còn quy định hình thức xử lý “phạt nguội” đối với một số hành […]',
        link: '#',
        image: blog18,
    },
    {
        title: 'Mua bảo hiểm cho xe ô tô điện cần lưu ý những gì?',
        description:
            'Bảo hiểm trợ cấp nằm viện không chỉ bảo vệ tài chính của bạn khi phải nhập viện mà còn giúp bạn an tâm và tiện lợi trong các trường […]',
        link: '#',
        image: blog19,
    },
    {
        title: 'So sánh bảo hiểm du lịch quốc tế: Nên mua bảo hiểm du lịch giá rẻ hay giá cao?',
        description:
            'Vấn đề sức khỏe và bảo hiểm du lịch đã trở thành một phần không thể thiếu trong cuộc sống của mỗi người. Tuy nhiên, khi đến tuổi già, việc […]',
        link: '#',
        image: blog20,
    },
    {
        title: 'Các trường hợp loại trừ trong bảo hiểm vận chuyển nội địa đối với người gửi và người nhận',
        description:
            'Trong một giai đoạn cần nhiều sự chăm sóc như thai kỳ, việc mẹ bầu sở hữu một chương trình bảo hiểm thai sản đáng tin cậy sẽ đảm bảo […]',
        link: '#',
        image: blog21,
    },
    {
        title: 'Luật giao thông 2024 – Cập nhật Luật Đường bộ và Luật Trật tự, an toàn giao thông đường bộ từ 27/6/2024',
        description:
            'Trong thị trường bảo hiểm ô tô, giá bảo hiểm thân vỏ luôn được các chủ xe xem xét, bởi đây là bộ phận rất dễ hư hỏng từ các […]',
        link: '#',
        image: blog22,
    },
    {
        title: 'Cháy xe máy điện có được bảo hiểm xe máy bồi thường không?',
        description:
            'Khi sở hữu một chiếc xe ô tô cao cấp, việc mua bảo hiểm thân vỏ là cần thiết để đảm bảo an toàn cho chiếc xe của chủ xe, […]',
        link: '#',
        image: blog23,
    },
    {
        title: '8 trường hợp bảo hiểm sức khỏe không chi trả',
        description:
            'Hãy cùng khám phá cách tính phí bảo hiểm thân vỏ ô tô và ảnh hưởng của bảo hiểm này đối với doanh nghiệp kinh doanh xe ô tô. Đối […]',
        link: '#',
        image: blog24,
    },
];

const { Meta } = Card;

const Blog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
                    total={data.length}
                    onChange={handlePageChange}
                    style={{ marginTop: '20px', textAlign: 'center' }}
                />
            </div>
        </div>
    );
};

export default Blog;
