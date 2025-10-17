import { Col, Card , Row } from 'antd';

const RecoverPasswordPage = () => {
      return (
    <Row align="middle" style={{ height: "100vh" }}>
        <Col span={10} offset = {7}>
            <Card>
                <Row justify="center">
                    <Col>
                        <h1>Recuperación de contraseña</h1>
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        
                    </Col>
                    <Col span={8}>Imagen</Col>
                </Row>
            </Card>
        </Col>
    </Row>
  )
}

export default RecoverPasswordPage