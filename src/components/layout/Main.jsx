import { Layout, Drawer, Affix, Spin } from "antd";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Sidenav from "./Sidenav";
import Header from "./Header";
import { LoginPage } from "../../pages/auth/LoginPage";
import useToken from "../../hooks/useToken";
import authService from "../../services/auth.service";

const { Header: AntHeader, Content, Sider } = Layout;

function Main() {
  const [visible, setVisible] = useState(false);
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  const Loader = () => {
    return (
      <div className='h-75 flex justify-center items-center'>
        <Spin size={"large"} />
        <p className='fw-semibold mt-2'>Loading</p>
      </div>
    )
  }

  const { token, setToken } = useToken();
  const ROLE = authService.getUserRole();

  const navigation = useNavigation();

  const handleVerifyToken = async () => {
    const refreshToken = authService.getRefreshToken();
    try {
      const refreshTokenResponse = await authService.verifyToken({ token: refreshToken });
      if (refreshTokenResponse?.status === 200) {
        try {
          const response = await authService.verifyToken({ token: token });
          if (response?.status === 200) {
            return 1;
          }
        } catch (e) {
          if (e?.response?.status === 401) {
            try {
              const newTokenResponse = await authService.refreshToken({ refresh: refreshToken });
              if (newTokenResponse?.status === 200) {
                setToken(newTokenResponse?.data);
                window.location.reload();
              }
            } catch (e) {
              console.error(e);
              window.location.reload();
            }
          }
        }
      } else {
        authService.logout();
      }
    } catch (e) {
      console.error(e);
      authService.logout();
    }
  }

  useEffect(
    () => {
      if (token) {
        handleVerifyToken();
      }
    }, [token]
  )

  if (!token || !ROLE) {
    console.error('Invalid token')
    return <LoginPage setToken={setToken} />
    // navigate("/login")
  }

  return (
    <>
      {console.log('token in Main: ', token, "ROLE: ", ROLE)}
      {
        token && ROLE && (
          <Layout className={`layout-dashboard ${pathname === "profile" ? "layout-profile" : ""} ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}>
            <Drawer
              title={false}
              closable={false}
              onClose={() => setVisible(false)}
              open={visible}
              width={250}
              className={`drawer-sidebar ${pathname === "rtl" ? "drawer-sidebar-rtl" : ""}`}
            >
              <Sider
                trigger={null}
                width={250}
                theme="light"
                className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""}`}
                style={{ background: sidenavType }}
              >
                <Sidenav color={sidenavColor} token={token} ROLE={ROLE} />
              </Sider>
            </Drawer>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              trigger={null}
              width={250}
              theme="light"
              className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""}`}
              style={{ background: sidenavType }}
            >
              <Sidenav color={sidenavColor} />
            </Sider>
            <Layout>
              {fixed ? (
                <Affix>
                  <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
                    <Header
                      onPress={openDrawer}
                      name={pathname}
                      subName={pathname}
                      handleSidenavColor={handleSidenavColor}
                      handleSidenavType={handleSidenavType}
                      handleFixedNavbar={handleFixedNavbar}
                    />
                  </AntHeader>
                </Affix>
              ) : (
                <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
                  <Header
                    onPress={openDrawer}
                    name={pathname}
                    subName={pathname}
                    handleSidenavColor={handleSidenavColor}
                    handleSidenavType={handleSidenavType}
                    handleFixedNavbar={handleFixedNavbar}
                  />
                </AntHeader>
              )}
              <Content className="content-ant">
                {navigation.state === "loading" ? <Loader /> : <Outlet />}
              </Content>
            </Layout>
          </Layout>
        )
      }
    </>
  );
}

export default Main;
