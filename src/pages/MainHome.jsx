import authService from '../services/auth.service'
import Home from './admin/Home'
import IsSupportHome from './is_support/IsSupportHome'

const MainHome = () => {
    const ROLE = authService.getUserRole()
    return (
        <>
            {ROLE === "ADMIN" && <Home />}
            {ROLE === "IS_SUPPORT" && <IsSupportHome />}
        </>
    )
}

export default MainHome;
