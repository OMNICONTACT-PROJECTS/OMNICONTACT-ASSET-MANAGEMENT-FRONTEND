/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Breadcrumb,
  Dropdown,
  Button,
  Input,
  Drawer,
  Typography,
  Switch,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import authService from "../../services/auth.service";

const ButtonContainer = styled.div`
  .ant-btn-primary {
    background-color: #1890ff;
  }
  .ant-btn-success {
    background-color: #52c41a;
  }
  .ant-btn-danger {
    background-color: #d9363e;
  }
  .ant-btn-yellow {
    background-color: #fadb14;
  }
  .ant-btn-black {
    background-color: #262626;
    color: #fff;
    border: 0;
    border-radius: 5px;
  }
  .ant-switch-active {
    background-color: #1890ff;
  }
`;

const Header = ({
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleFixedNavbar,
}) => {
  const { Title, Text } = Typography;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);

  const items = [
    {
      key: "0",
      label: (
        <Link to="/profile">
          <UserOutlined /> Profile
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Link onClick={() => showDrawer()}>
          <SettingOutlined /> Settings
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link onClick={() => authService.logout()}>
          <LogoutOutlined /> Logout
        </Link>
      ),
    },
  ];

  const breadcrumbItems = [
    {
      title: <NavLink to="/"><strong>Pages</strong></NavLink>,
      key: "pages",
    },
    {
      title: name.replace("/", " / "),
      key: "name",
    },
  ];
  const fullName = authService.getFullName();
  return (
    <>
      <Row
        style={{ marginTop: "-20px", marginLeft: "-10px" }}
        className="bg-[#ffffff] py-2 rounded-lg"
        gutter={[24, 0]}
      >
        <Col span={24} md={6}>
          <Breadcrumb items={breadcrumbItems} />
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName.split("/").filter(Boolean).pop()}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Button type="link" className="sidebar-toggler" onClick={onPress}>
            {/* Toggle Button Icon */}
          </Button>
          <Drawer
            className="settings-drawer"
            mask={true}
            width={260}
            onClose={hideDrawer}
            open={visible}
          >
            <div layout="vertical">
              <div className="header-top">
                <Title level={4}>Settings Config</Title>
                <Text className="subtitle">See our dashboard options.</Text>
              </div>

              <div className="sidebar-color">
                <Title level={5}>Sidebar Color</Title>
                <div className="mb-2 theme-color">
                  <ButtonContainer>
                    <Button
                      type="primary"
                      onClick={() => handleSidenavColor("#1890ff")}
                    >
                      1
                    </Button>
                    <Button
                      type="success"
                      onClick={() => handleSidenavColor("#52c41a")}
                    >
                      1
                    </Button>
                    <Button
                      type="danger"
                      onClick={() => handleSidenavColor("#d9363e")}
                    >
                      1
                    </Button>
                    <Button
                      type="yellow"
                      onClick={() => handleSidenavColor("#fadb14")}
                    >
                      1
                    </Button>
                    <Button
                      type="black"
                      onClick={() => handleSidenavColor("#111")}
                    >
                      1
                    </Button>
                  </ButtonContainer>
                </div>
                <div className="mb-2 fixed-nav">
                  <Title level={5}>Navbar Fixed</Title>
                  <Switch onChange={handleFixedNavbar} />
                </div>
              </div>
            </div>
          </Drawer>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button
              style={{ boxShadow: "20px", color: "#FFFFFF", fontSize: "16px" }}
              type="link"
              className="header-dropdown-btn px-3 py-1 bg-[#163d69]"
            >
              {fullName}
              <UserOutlined color="#FFFFF" className="py-2 mr-0" />
            </Button>
          </Dropdown>
          {/* <div className="border-spacing-3">
            <Button type="link" icon={<MessageOutlined />} />
          </div> */}
          <Input
            className="header-search"
            placeholder="Type here..."
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
    </>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  subName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  handleSidenavColor: PropTypes.func.isRequired,
  handleSidenavType: PropTypes.func.isRequired,
  handleFixedNavbar: PropTypes.func.isRequired,
};

export default Header;
