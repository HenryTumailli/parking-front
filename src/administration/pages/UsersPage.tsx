import { Row,Col,Card, Modal} from "antd"
import UsersList from "../components/UsersList";
import { useState } from "react";
import type { User } from "../../auth/interfaces/Auth.interface";
import type {Action} from '../../shared/interfaces/Shared.interface'
import UsersCrud from "../components/UsersCrud";

const UsersPage = () => {
    const [user, setUser] = useState<User>();
    const [action, setAction] = useState<Action>('show');
    const [isModalUserOpen, setIsModalUserOpen] = useState(false);

    const showModalCrud = () => {
        setIsModalUserOpen(true);
    };

    const handleOk = () => {
        setIsModalUserOpen(false);
    };

    const handleCancel = () => {
        setIsModalUserOpen(false);
    };

    const manageAction = (user:User, action:Action) => {
        console.log("Usuario:", user);
        console.log("Acción:", action);
        setUser(user)
        setAction(action)
        if(action !== 'delete'){
            showModalCrud()
        }else{

        }
    };

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
                    <UsersList onAction={manageAction}/>
                </Row>
            </Card>
        </Row>
        <Modal
            title = {action === 'edit' ? "Editar usuario":"Ver usuario"}
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalUserOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <UsersCrud user={user} action={action}/>
        </Modal>
    </>
    )
} 

export default UsersPage