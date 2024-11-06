import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
} from "antd";
import { UploadCloud } from "lucide-react"; // Importing Lucide icons
import { Link } from "react-router-dom";

// Images
import ava1 from "../../../assets/images/logo-shopify.svg";
import face2 from "../../../assets/images/face-2.jpg";
import pencil from "../../../assets/images/pencil.svg";

const { Title } = Typography;

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

// Table Columns
const columns = [
  {
    title: "AUTHOR",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "FUNCTION",
    dataIndex: "function",
    key: "function",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "EMPLOYED",
    key: "employed",
    dataIndex: "employed",
  },
];

// Data for Authors Table
const data = [
  {
    key: "1",
    name: (
      <Avatar.Group>
        <Avatar className="shape-avatar" shape="square" size={40} src={face2} />
        <div className="avatar-info">
          <Title level={5}>Michael John</Title>
          <p>michael@mail.com</p>
        </div>
      </Avatar.Group>
    ),
    function: (
      <div className="author-info">
        <Title level={5}>Manager</Title>
        <p>Organization</p>
      </div>
    ),
    status: <Button type="primary" className="tag-primary">ONLINE</Button>,
    employed: (
      <div className="ant-employed">
        <span>23/04/18</span>
        <a href="#pablo">Edit</a>
      </div>
    ),
  },
  // Additional author data...
];

// Table Columns for Projects
const projectColumns = [
  {
    title: "COMPANIES",
    dataIndex: "name",
    width: "32%",
  },
  {
    title: "BUDGET",
    dataIndex: "age",
  },
  {
    title: "STATUS",
    dataIndex: "address",
  },
  {
    title: "COMPLETION",
    dataIndex: "completion",
  },
];

// Data for Projects Table
const projectData = [
  {
    key: "1",
    name: (
      <Avatar.Group>
        <Avatar className="shape-avatar" src={ava1} size={25} alt="" />
        <div className="avatar-info">
          <Title level={5}>Spotify Version</Title>
        </div>
      </Avatar.Group>
    ),
    age: <div className="semibold">$14,000</div>,
    address: <div className="text-sm">working</div>,
    completion: (
      <div className="ant-progress-project">
        <Progress percent={30} size="small" />
        <span>
          <Link to="/">
            <img src={pencil} alt="" />
          </Link>
        </span>
      </div>
    ),
  },
  // Additional project data...
];

const EmployeeView = () => {
  const onChange = (e) => console.log(`radio checked: ${e.target.value}`);

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Authors Table"
            extra={
              <Radio.Group onChange={onChange} defaultValue="a">
                <Radio.Button value="a">All</Radio.Button>
                <Radio.Button value="b">ONLINE</Radio.Button>
              </Radio.Group>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>

          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Projects Table"
            extra={
              <Radio.Group onChange={onChange} defaultValue="all">
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="online">ONLINE</Radio.Button>
                <Radio.Button value="store">STORES</Radio.Button>
              </Radio.Group>
            }
          >
            <div className="table-responsive">
              <Table
                columns={projectColumns}
                dataSource={projectData}
                pagination={false}
                className="ant-border-space"
              />
            </div>
            <div className="uploadfile pb-15 shadow-none">
              <Upload {...formProps}>
                <Button
                  type="dashed"
                  className="ant-full-box"
                  icon={<UploadCloud />}
                >
                  Click to Upload
                </Button>
              </Upload>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeView;
