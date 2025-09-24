import { BrowserRouter,Routes,Route, Navigate } from "react-router"
import AuthLayout from "./auth/layout/AuthLayout"
import LoginPage from "./auth/pages/LoginPage"
import { lazy, Suspense } from "react"
import Loading from "./shared/components/Loading"

const MainLayout = lazy( () => import ('./layout/pages/MainLayout'))
const RecoverPasswordPage = lazy( () => import ('./auth/pages/RecoverPasswordPage'))


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<AuthLayout/>}>
                    <Route path='/auth/login' element={<LoginPage/>}/>
                    <Route path='/auth/recoverpass' element={<RecoverPasswordPage/>}/>
                    <Route path="/auth" element={<Navigate to="/auth/login"/>}/>
                </Route>
                <Route path="/layout" element={
                    <Suspense fallback = {<Loading/>}>
                        <MainLayout />
                    </Suspense>
                }>
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