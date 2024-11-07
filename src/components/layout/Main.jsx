import { Layout, Affix, Spin } from "antd";
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
  const [sidenavColor, setSidenavColor] = useState("#002147");
  const [sidenavType, setSidenavType] = useState("white");
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
  }

  return (
    <>
      {
        token && ROLE && (
          <Layout className={`layout-dashboard ${pathname === "profile" ? "layout-profile" : ""}`}>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              trigger={null}
              width={250}
              theme="light"
              className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""}`}
              style={{ background: sidenavType, height: "100vh", overflow: "hidden", overflowY: "scroll", scrollbarWidth: "none", backgroundColor: "#002147" }}
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
              <Content className="content-ant bg-[#ffffff] px-5 rounded-t-lg">
                <div className="p-5">
                  {navigation.state === "loading" ? <Loader /> : <Outlet />}
                </div>
              </Content>
            </Layout>
          </Layout>
        )
      }
    </>
  );
}

export default Main;
