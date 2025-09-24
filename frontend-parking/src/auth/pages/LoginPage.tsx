import { Col, Card , Row } from 'antd';
import { Link } from 'react-router';

const LoginPage = () => {
  return (
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
                        
                    </Col>
                    <Col span={8}>Imagen</Col>
                </Row>
                <Row>
                    <Link to="/auth/recoverpass">Recuperar contraseña</Link>
                </Row>
            </Card>
        </Col>
    </Row>
  )
}


export default LoginPage