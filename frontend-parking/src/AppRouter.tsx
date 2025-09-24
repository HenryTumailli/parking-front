import { BrowserRouter,Routes,Route, Navigate } from "react-router"
import AuthLayout from "./auth/layout/AuthLayout"
import LoginPage from "./auth/pages/LoginPage"
import RecoverPasswordPage from "./auth/pages/RecoverPasswordPage"
import MainLayout from "./layout/pages/MainLayout"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<AuthLayout/>}>
                    <Route path='/auth/login' element={<LoginPage/>}/>
                    <Route path='/auth/recoverpass' element={<RecoverPasswordPage/>}/>
                    <Route path="/auth" element={<Navigate to="/auth/login"/>}/>
                </Route>
                <Route path="/layout" element={<MainLayout />}>
                    <Route path="modulo1" element={<LoginPage />} />
                    <Route path="modulo2" element={<RecoverPasswordPage />} />
                    <Route path="*" element={<div>No encontrado</div>} />
                </Route>

                <Route path="/" element={<Navigate to="/auth"/>}/>
                <Route path="*" element={<Navigate to="/auth"/>}/>
            </Routes>
        </BrowserRouter>
    )
}