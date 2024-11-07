import PropTypes from "prop-types";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  Table,
  CreditCard,
  User,
  UserPlus,
  LayoutDashboard,
  Users,
  CheckCircle,
  FileSearch,
} from "lucide-react";
import logo from "../../assets/images/omni-logos/omnicontact-logo-white.png";
import authService from "../../services/auth.service";

const Sidenav = ({ color }) => {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const ROLE = authService.getUserRole();

  return (
    <>
      {
        ROLE === "ADMIN" && (
          <Menu className="top-0 left-0" theme="light" mode="inline" defaultSelectedKeys={["2"]}>
            <Menu.Item className="menu-item-header" key="0">
              <span to="/">
                <img className="" src={logo} alt="Logo" />
              </span>
            </Menu.Item>

            {/* Dashboard */}
            <Menu.Item className="menu-item-header" key="1">
              Dashboard
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/">
                <span className="icon" style={{ background: page === "dashboard" ? color : "" }}>
                  <LayoutDashboard color={color} />
                </span>
                <span className="label">Dashboard</span>
              </NavLink>
            </Menu.Item>

            {/* Employee Management */}
            <Menu.Item className="menu-item-header" key="3">
              Employee Management
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/admin/onboarding">
                <span className="icon" style={{ background: page === "onboarding" ? color : "" }}>
                  <UserPlus color={color} />
                </span>
                <span className="label">Onboarding</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to="/admin/employees">
                <span className="icon" style={{ background: page === "employees" ? color : "" }}>
                  <Users color={color} />
                </span>
                <span className="label">Employees</span>
              </NavLink>
            </Menu.Item>

            {/* Asset Management */}
            <Menu.Item className="menu-item-header" key="7">
              Asset Management
            </Menu.Item>
            <Menu.Item key="9">
              <NavLink to="/admin/asset-categories">
                <span className="icon" style={{ background: page === "asset-categories" ? color : "" }}>
                  <CreditCard color={color} />
                </span>
                <span className="label">Asset Categories</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="8">
              <NavLink to="/admin/asset-items">
                <span className="icon" style={{ background: page === "asset-items" ? color : "" }}>
                  <Table color={color} />
                </span>
                <span className="label">Asset Items</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="10">
              <NavLink to="/admin/asset-tracking">
                <span className="icon" style={{ background: page === "asset-tracking" ? color : "" }}>
                  <Users color={color} />
                </span>
                <span className="label">Asset Tracking</span>
              </NavLink>
            </Menu.Item>

            {/* Request Management */}
            <Menu.Item className="menu-item-header" key="14">
              Ticket Management
            </Menu.Item>
            <Menu.Item key="15">
              <NavLink to="/admin/request-asset">
                <span className="icon" style={{ background: page === "request-asset" ? color : "" }}>
                  <Users color={color} />
                </span>
                <span className="label">Request Asset</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="16">
              <NavLink to="/admin/approval-workflow">
                <span className="icon" style={{ background: page === "approval-workflow" ? color : "" }}>
                  <CheckCircle color={color} />
                </span>
                <span className="label">Approval Workflow</span>
              </NavLink>
            </Menu.Item>

            {/* Audit and Compliance */}
            <Menu.Item className="menu-item-header" key="17">
              Audit Trails
            </Menu.Item>
            <Menu.Item key="18">
              <NavLink to="/admin/audit-trails">
                <span className="icon" style={{ background: page === "audit-trails" ? color : "" }}>
                  <FileSearch color={color} />
                </span>
                <span className="label">Audit Trails</span>
              </NavLink>
            </Menu.Item>

            {/* Account Pages */}
            <Menu.Item className="menu-item-header" key="20">
              Account Pages
            </Menu.Item>
            <Menu.Item key="21">
              <NavLink to="/admin/profile">
                <span className="icon" style={{ background: page === "profile" ? color : "" }}>
                  <User color={color} />
                </span>
                <span className="label">Profile</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        )
      }

      {
        ROLE === "IS_SUPPORT" && (
          <Menu theme="light" mode="inline" defaultSelectedKeys={["2"]}>
            <Menu.Item className="menu-item-header" key="0">
              <span to="/">
                <img className="" src={logo} alt="Logo" />
              </span>
            </Menu.Item>

            {/* Dashboard */}
            <Menu.Item className="menu-item-header" key="1">
              Dashboard
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/">
                <span className="icon" style={{ background: page === "dashboard" ? color : "" }}>
                  <LayoutDashboard color={color} />
                </span>
                <span className="label">Dashboard</span>
              </NavLink>
            </Menu.Item>

            {/* Asset Management */}
            <Menu.Item className="menu-item-header" key="7">
              Asset Management
            </Menu.Item>
            <Menu.Item key="9">
              <NavLink to="/admin/asset-categories">
                <span className="icon" style={{ background: page === "asset-categories" ? color : "" }}>
                  <CreditCard color={color} />
                </span>
                <span className="label">Asset Categories</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="8">
              <NavLink to="/admin/asset-items">
                <span className="icon" style={{ background: page === "asset-items" ? color : "" }}>
                  <Table color={color} />
                </span>
                <span className="label">Asset Items</span>
              </NavLink>
            </Menu.Item>

            {/* Request Management */}
            <Menu.Item className="menu-item-header" key="14">
              Ticket Management
            </Menu.Item>
            <Menu.Item key="15">
              <NavLink to="/admin/request-asset">
                <span className="icon" style={{ background: page === "request-asset" ? color : "" }}>
                  <Users color={color} />
                </span>
                <span className="label">Request Asset</span>
              </NavLink>
            </Menu.Item>

            {/* Account Pages */}
            <Menu.Item className="menu-item-header" key="20">
              Account Pages
            </Menu.Item>
            <Menu.Item key="21">
              <NavLink to="/admin/profile">
                <span className="icon" style={{ background: page === "profile" ? color : "" }}>
                  <User color={color} />
                </span>
                <span className="label">Profile</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        )
      }
    </>
  );
};

Sidenav.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Sidenav;
