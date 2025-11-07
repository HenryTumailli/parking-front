import { BrowserRouter,Routes,Route, Navigate } from "react-router"
import AuthLayout from "./auth/layout/AuthLayout"
import LoginPage from "./auth/pages/LoginPage"
import { lazy, Suspense } from "react"
import Loading from "./shared/components/Loading"
import PrivateRoute from "./auth/components/PrivateRoute"

const MainLayout = lazy( () => import ('./layout/pages/MainLayout'))
const RecoverPasswordPage = lazy( () => import ('./auth/pages/RecoverPasswordPage'))
const UsersPage = lazy( () => import ('./administration/pages/UsersPage'))
const PermissionsPage = lazy( () => import ('./administration/pages/PermissionsPage'))


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
                        <PrivateRoute>
                            <MainLayout />
                        </PrivateRoute>
                    </Suspense>
                }>
                    <Route path="admin/users" element={<UsersPage />} />
                    <Route path="admin/permissions" element={<PermissionsPage />} />
                    <Route path="modulo2" element={<RecoverPasswordPage />} />
                    <Route path="*" element={<div>No encontrado</div>} />
                </Route>

                <Route path="/" element={<Navigate to="/auth"/>}/>
                <Route path="*" element={<Navigate to="/auth"/>}/>
            </Routes>
        </BrowserRouter>
    )
}