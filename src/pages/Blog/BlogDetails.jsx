import React, { useState } from 'react';
import { Row, Col, Typography, Form, Input, Button, Collapse, Card } from 'antd';
import Truck from '../../assets/Images/tainan.jpg';
import styles from './BlogDetails.module.scss';
import Menu from '../../assets/Images/menu.png';
import Si from '../../assets/Images/Si-CarCom.png';
import { PhoneOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import Ima1 from '../../assets/Images/ima1.png';
import Ima2 from '../../assets/Images/imga2.png';
import Ima3 from '../../assets/Images/imga3.png';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

// Hàm để lưu dữ liệu blog
const getBlogData = () => {
    return {
        title: 'An toàn giao thông – Các điều tuyệt đối tránh sau khi lái xe ô tô gặp tai nạn giao thông',
        dateCreate: '25/09/2024',
        content: (
            <>
                <Title level={3} className={styles.mainTitle}>
                    I. Những điều không nên làm khi gặp tai nạn giao thông
                </Title>
                <div className={styles.itemTitleContainer}>
                    <h4 className={styles.itemTitle}>
                        1. Phớt lờ tình trạng sức khỏe của người liên quan trong vụ tai nạn
                    </h4>
                </div>
                <Paragraph>Khi gặp tai nạn giao thông, tài xế thường bị ảnh hưởng tâm lý rất lớn.</Paragraph>
                <Paragraph>
                    Dù bạn là người gây tai nạn hay gặp tai nạn, trước tiên bạn cần giữ bình tĩnh rồi kiểm tra sức khỏe
                    và cơ thể mình. Nguy hiểm nhất là những tình huống lái xe bị thương nhưng không cảm nhận được cơn
                    đau và để cho bản thân bị mất nhiều máu.
                </Paragraph>
                <Paragraph>
                    Một việc cần làm là cài sẵn số điện thoại khẩn cấp của cứu thương và người thân để đề phòng những
                    tình huống tương tự. Tiếp đến chính là kiểm tra tình trạng sức khỏe của hành khách trên xe bạn và xe
                    còn lại.
                </Paragraph>
                <Paragraph>
                    Xe ô tô gặp tai nạn giao thông thường tìm ẩn rất nhiều những rủi ro nguy hiểm đến tính mạng, vì vậy
                    bạn cần phải quan sát thật kĩ để nắm được tình trạng của những người khác trên xe và những rủi ro có
                    thể xuất hiện chiếc xe bị tai nạn. Trong trường hợp cần phải sơ tán khỏi xe, hãy ưu tiên người chịu
                    nhiều thương tích nhất.
                </Paragraph>
                <Paragraph>
                    <img src={Truck} alt="tainan" className={styles.blogImage} />
                    Nắm rõ những việc nên và không nên làm khi gặp tai nạn giao thông để đảm bảo an toàn và quyền lợi
                    cho tất cả mọi người.
                </Paragraph>
                <div className={styles.itemTitleContainer}>
                    <Paragraph className={styles.itemTitle}>
                        <h4>2. Tiếp cận xe ô tô gặp tai nạn trước khi quan sát</h4>
                    </Paragraph>
                </div>

                <Paragraph>
                    Trong trường hợp bị va chạm nhẹ, bạn có thể chuyển đến bước kiểm tra tình trạng của xe. Còn trong
                    tình huống xe bị hư hỏng nặng nề và bị rò rỉ nhiên liệu, điều đầu tiên bạn nên làm là hỗ trợ hành
                    khách trên xe nên rời khỏi và giữ khoảng cách an toàn so với hiện trường vụ tai nạn.
                </Paragraph>
                <div className={styles.itemTitleContainer}>
                    <Paragraph className={styles.itemTitle}>
                        <h4>3. Chậm trễ trong việc thông báo với phía nhà bảo hiểm</h4>
                    </Paragraph>
                </div>

                <Paragraph>
                    Thường mỗi bên bảo hiểm vật chất xe ô tô sẽ quy định một mốc thời gian cố định mà bạn có thể thông
                    báo cho phía công ty để được hỗ trợ bồi thường. Tuy nhiên, bạn nên thông báo với công ty bảo hiểm
                    ngay thời điểm xảy ra tai nạn để nhận được các chỉ dẫn cụ thể nhất, đảm bảo bạn không mất quyền lợi
                    bồi thường.
                </Paragraph>
                <Paragraph>
                    Nếu như bạn tiếp tục sử dụng phương tiện bị hư hỏng do tai nạn thêm một khoảng thời gian rồi mới đem
                    xe đi giám định thì công ty bảo hiểm hoàn toàn có quyền từ chối bồi thường cho bạn vì có thể xảy ra
                    các tổn thất phát sinh trong quá trình bạn sử dụng.
                </Paragraph>
                <div className={styles.itemTitleContainer}>
                    <Paragraph className={styles.itemTitle}>
                        <h4>4. Tự ý thay đổi hiện trường, dời xe ra khỏi hiện trường</h4>
                    </Paragraph>
                </div>

                <Paragraph>
                    Quy tắc bất di bất dịch của bảo hiểm là phải giữ nguyên hiện trạng của vụ tai nạn. Tùy thuộc vào mức
                    độ nghiêm trọng mà bạn có thể bị từ chối bảo hiểm TNDS ô tô, bảo hiểm vật chất xe ô tô và vụ tai nạn
                    có thể được truy tố ở mức hình sự, thậm chí phạt hành chính lên đến 18 triệu đồng.
                </Paragraph>
                <div className={styles.itemTitleContainer}>
                    <Paragraph className={styles.itemTitle}>
                        <h4>5. Bỏ qua bước ghi lại hình ảnh hiện trường vụ tai nạn</h4>
                    </Paragraph>
                </div>

                <Paragraph>
                    Bạn nên ghi lại hình ảnh, video về vụ tai nạn càng chi tiết và đầy đủ càng tốt. Hãy lưu giữ cả thông
                    tin về những người liên quan trong vụ tai nạn, có thể bao gồm tên, tuổi, số căn cước, bằng lái xe,…
                    Các thông tin này cực kì cần thiết khi lập hồ sơ yêu cầu bồi thường với phía bảo hiểm vật chất xe ô
                    tô cũng như phục vụ quá trình làm việc của công an giao thông nếu có.
                </Paragraph>
                <Title level={3} className={styles.mainTitle}>
                    II. Sở hữu bảo hiểm ô tô để bảo vệ tài sản và sức khỏe bản thân
                </Title>
                <Paragraph>
                    Như vậy, để có thể giải quyết một cách gọn gàng nhất trong tình huống xe ô tô gặp tai nạn giao thông
                    chúng ta cần phải thông qua những bước trên. Saladin hi vọng rằng bài viết này đã cung cấp cho bạn
                    những thông tin hữu ích nhất.
                </Paragraph>
                <Paragraph>Trong các vụ tai nạn, bảo hiểm xe ô tô sẽ phát huy tối đa tác dụng.</Paragraph>
                {/* Nút MUA NGAY */}
                <div className={styles.btn} style={{ textAlign: 'center' }}>
                    <img src={Si} alt="si" style={{ maxWidth: '100%', height: 'auto' }} />
                    <h6 style={{ margin: '10px 0' }}>Nhận báo giá từ 6 Công ty Bảo hiểm vật chất ô tô</h6>
                    <Button
                        type="primary"
                        style={{ backgroundColor: '#52c41a', borderColor: '#52c41a', marginTop: '10px' }}
                    >
                        MUA NGAY
                    </Button>
                </div>

                <Title level={3} className={styles.mainTitle}>
                    Các loại bảo hiểm ô tô
                </Title>
                <Paragraph>
                    Các bảo hiểm Vật chất ô tô hay thân vỏ ô tô giúp bạn chi trả cho tổn thất về phương tiện. Nhiều hư
                    hại gây ra bởi tai nạn có thể vô cùng tốn kém để khắc phục, lên đến hàng chục, hàng trăm triệu đồng.
                </Paragraph>
                <Paragraph>
                    Bảo hiểm TNDS ô tô là loại bảo hiểm bắt buộc cho mọi tài xế theo Luật Giao thông, giúp chi trả chi
                    phí y tế và đền bù cho bên thứ ba bị ảnh hưởng bởi tai nạn. Khi có chuyện không may xảy ra, bảo hiểm
                    này sẽ giúp bạn giảm gánh nặng tài chính và tinh thần.
                </Paragraph>
                <Paragraph>
                    Bảo hiểm tai nạn sẽ đền bù cho các thương tật đối với cơ thể bạn khi gặp tai nạn giao thông. Đây là
                    loại bảo hiểm cần thiết để đảm bảo bạn hưởng được hỗ trợ y tế tốt nhất khi gặp nguy hiểm.
                </Paragraph>
                <Title level={3} className={styles.mainTitle}>
                    Mua bảo hiểm ô tô tại Saladin
                </Title>
                <Paragraph>
                    Bạn có thể tham khảo các sản phẩm bảo hiểm tại Saladin – nền tảng bảo hiểm cho người Việt. Saladin
                    quy tụ các nhà bảo hiểm uy tín nhất thị trường và mang đến mức giá phải chăng.
                </Paragraph>
                <Paragraph>
                    Lấy 6 báo giá bảo hiểm ô tô chỉ với vài cú click. Mua ngay các sản phẩm bảo hiểm trên điện thoại
                    ngay tại nhà và thanh toán bằng chuyển khoản, quẹt thẻ, tiền mặt hoặc trả góp. Đội ngũ tư vấn viên
                    chuyên nghiệp luôn túc trực và sẵn sàng giải đáp mọi thắc mắc của bạn. Tham khảo website hoặc liên
                    hệ với Saladin ngay!
                </Paragraph>
                <Paragraph>
                    Bài viết chỉ mang tính chất tham khảo. Vui lòng liên hệ với Saladin để được tư vấn và hỗ trợ tìm
                    được các sản phẩm bảo hiểm phù hợp.
                </Paragraph>
                <Title level={3} className={styles.mainTitle}>
                    MỌI NHU CẦU TƯ VẤN VÀ THẮC MẮC LIÊN HỆ
                </Title>
                <Row gutter={16}>
                    <Col span={8}>
                        <div className={`${styles.contactBox} ${styles.hotline}`}>
                            <Title level={4}>Hotline</Title>
                            <Paragraph>1900 638 454</Paragraph>
                            <div className={styles.divider}></div>
                            <PhoneOutlined className={styles.icon} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={`${styles.contactBox} ${styles.email}`}>
                            <Title level={4}>Email</Title>
                            <Paragraph>cs@saladin.vn</Paragraph>
                            <div className={styles.divider}></div>
                            <MailOutlined className={styles.icon} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={`${styles.contactBox} ${styles.website}`}>
                            <Title level={4}>Website</Title>
                            <Paragraph>saladin.vn</Paragraph>
                            <div className={styles.divider}></div>
                            <GlobalOutlined className={styles.icon} />
                        </div>
                    </Col>
                </Row>
            </>
        ),
    };
};

const data = [
    {
        title: 'Cách lái xe ô tô an toàn khi chở trẻ em - Các loại bảo hiểm ô tô cần thiết cho gia đình có con nhỏ',
        description:
            'Cùng Saladin tìm hiểu cách lái xe ô tô an toàn khi chở trẻ em dưới đây bằng cách tránh các sai lầm nguy hiểm thường gặp, cũng như cách [...]',
        link: '#',
        image: Ima1,
    },
    {
        title: 'Giải đáp câu hỏi thường gặp về chi phí bảo hiểm thân vỏ xe ô tô',
        description:
            'Bảo hiểm thân vỏ xe ô tô là một giải pháp thông minh và an toàn giúp bảo vệ bản thân và tài sản quý giá của bạn khỏi những [...]',
        link: '#',
        image: Ima2,
    },
    {
        title: 'Nổ lốp xe có được bảo hiểm vật chất dành cho xe ô tô bồi thường?',
        description:
            'Nổ lốp xe là hiện tượng thường xuyên xảy ra với xe ô tô do nhiều nguyên nhân chủ quan lẫn khách quan. Nổ lốp có thể là một sự [...]',
        link: '#',
        image: Ima3,
    },
];

const { Meta } = Card;

const BlogDetails = () => {
    const blogData = getBlogData();
    const [isCollapseVisible, setIsCollapseVisible] = useState(false);

    const handleToggle = () => {
        setIsCollapseVisible(!isCollapseVisible);
    };

    const onFinish = (values) => {
        console.log('Received values:', values);
        // logic chưa nghĩ ra
    };

    const { TextArea } = Input;

    return (
        <div className={styles.blogContainer}>
            <div className={styles.Link}>
                <Link to="/blog" style={{ marginRight: '10px', color: 'green', textDecoration: 'none' }}>
                    Saladin Blog
                </Link>
                /
                <Link to="/blog/insurance" style={{ marginLeft: '10px', color: 'green', textDecoration: 'none' }}>
                    Bảo hiểm ô tô
                </Link>
            </div>
            <Title level={1} className={styles.blogTitle}>
                {blogData.title}
            </Title>
            <Title level={5} className={styles.blogDate}>
                {blogData.dateCreate}
            </Title>

            <Row gutter={16}>
                {/* Phần MỤC LỤC (70% bên trái) */}
                <Col span={17}>
                    <div style={{ backgroundColor: '#f6fefa', padding: '10px', marginBottom: '20px' }}>
                        <Button onClick={handleToggle} style={{ maxWidth: '44px', height: '37px', marginLeft: '5px' }}>
                            <img src={Menu} alt="menu" />
                        </Button>
                        <Collapse activeKey={isCollapseVisible ? '1' : ''} bordered={false}>
                            <Panel
                                header="Mục lục"
                                key="1"
                                showArrow={false}
                                style={{ fontSize: '18px', fontWeight: 'bold' }}
                            >
                                <ul style={{ fontSize: '12px' }}>
                                    <p>I. Những điều không nên làm khi gặp tai nạn giao thông</p>
                                    <p>II. Sở hữu bảo hiểm ô tô để bảo vệ tài sản và sức khỏe bản thân</p>
                                </ul>
                            </Panel>
                        </Collapse>
                    </div>
                    {/* Nội dung chính */}
                    <Paragraph>{blogData.content}</Paragraph>
                </Col>

                {/* Sidebar (30% bên phải) */}
                <Col span={7} className={styles.sidebar}>
                    <Paragraph>sidebar</Paragraph>
                </Col>
            </Row>

            {/* Comment Form */}
            <div style={{ margin: '20px 0' }}>
                <Typography.Title level={3}>Để lại bình luận của bạn</Typography.Title>
                <Form name="comment" onFinish={onFinish} layout="vertical" initialValues={{ remember: true }}>
                    <Form.Item
                        name="name"
                        label="Tên của bạn"
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                        <Input placeholder="Nhập tên của bạn" />
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        label="Nội dung bình luận"
                        rules={[{ required: true, message: 'Vui lòng nhập bình luận!' }]}
                    >
                        <TextArea rows={4} placeholder="Nhập bình luận của bạn" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Gửi bình luận
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div>
                <h2 style={{ textAlign: 'center' }}>Bài viết liên quan</h2>
                <Row gutter={[16, 16]}>
                    {data.map((item) => (
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
                                <div style={{ marginTop: 16 }}>
                                    <SafetyCertificateOutlined style={{ marginRight: 8 }} /> BẢO HIỂM Ô TÔ
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default BlogDetails;
