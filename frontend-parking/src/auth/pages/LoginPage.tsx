import { useState } from "react";
import { Link, useNavigate } from 'react-router';
import { Col, Card , Row , Button, Form, Input, notification, type FormProps} from 'antd';
import type { AuthResponse, Login } from '../interfaces/Auth.interface'
import { login } from '../services/Auth.service';
import { openNotificationWithIcon } from '../../shared/services/Shared.service';

const LoginPage = () => {
    const [loginForm] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish: FormProps<Login>['onFinish'] = async (values: Login) => {
        try {
            setLoading(true);
            const authResponse: AuthResponse = await login(values);
            setUserInfo(authResponse);
            navigate("/layout", { replace: true });
        } catch (error) {
            openNotificationWithIcon(
                api,
                'error',
                'Inicio de sesión',
                'Las credenciales ingresadas son incorrectas, por favor revíselas.'
            )
        } finally {
            setLoading(false);
        }
    };

    const setUserInfo = (userInfo:AuthResponse) => {
        const {user,token} = userInfo
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    }

    return (
        <>
            {contextHolder}
            <Row align="middle" style={{ height: "100vh" }}>
                <Col span={10} offset = {7}>
                    <Card>
                        <Row justify="center">
                            <Col>
                                <h1>Iniciar Sesión</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={16}>
                                <Form
                                    form={loginForm}
                                    name="loginForm"
                                    layout="vertical"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    style={{ maxWidth: 600 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    autoComplete="off"
                                >
                                    <Form.Item<Login>
                                    label="Usuario"
                                    name="username"
                                    rules={[{ required: true, message: 'El usuario es requerido' }]}
                                    >
                                    <Input />
                                    </Form.Item>

                                    <Form.Item<Login>
                                    label="Contraseña"
                                    name="password"
                                    rules={[{ required: true, message: 'La contraseña es requerida' }]}
                                    >
                                    <Input.Password />
                                    </Form.Item>

                                    <Form.Item label={null}>
                                    {!loading && (
                                    <Button type="primary" htmlType="submit">
                                        Iniciar Sesión
                                    </Button>
                                    )}
                                    {loading && (
                                    <Button type="primary" htmlType="submit" loading iconPosition='end'>
                                        Iniciando sesión
                                    </Button>
                                    )}
                                    </Form.Item>
                                </Form>

                            </Col>
                            <Col span={8}>Imagen</Col>
                        </Row>
                        <Row>
                            <Link to="/auth/recoverpass">Recuperar contraseña</Link>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default LoginPage