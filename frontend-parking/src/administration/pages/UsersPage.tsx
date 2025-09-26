import { Row,Col,Card} from "antd"
import UsersList from "../components/UsersList";

const UsersPage = () => {
    return (
    <>
        <Row>
            <Col><h1>Usuarios</h1></Col>
        </Row>
        <Row>
            <Card style={{ width: "100%" }}>
                <Row>
                    <h3>Lista de usuarios</h3>
                </Row>
                <Row>
                    <UsersList/>
                </Row>
            </Card>
        </Row>
    </>
    )
} 

export default UsersPage