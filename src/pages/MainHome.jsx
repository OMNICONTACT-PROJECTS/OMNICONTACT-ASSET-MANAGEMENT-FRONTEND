import authService from '../services/auth.service'
import Home from './admin/Home'
import EmployeeHome from './employee/EmployeeHome'

const MainHome = () => {
    const ROLE = authService.getUserRole()
    return (
        <>
            {ROLE === "ADMIN" && <Home />}
            {ROLE === "IS_SUPPORT" && <EmployeeHome />}
        </>
    )
}

export default MainHome;
