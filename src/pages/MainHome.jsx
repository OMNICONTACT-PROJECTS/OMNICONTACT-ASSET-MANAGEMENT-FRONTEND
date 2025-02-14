import authService from '../services/auth.service'
import Home from './admin/Home'
import UserHome from './general_employee/UserHome'

const MainHome = () => {
    const ROLE = authService.getUserRole()
    return (
        <>
            {(ROLE === "ADMIN" || ROLE === "IS_SUPPORT") && <Home />}
            {ROLE === "USER" && <UserHome />}
        </>
    )
}

export default MainHome;
