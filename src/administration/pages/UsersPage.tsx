import { Row, Col, Card, Modal, Button, Form, notification } from "antd"
import UsersList from "../components/UsersList";
import { useEffect, useState } from "react";
import type { User } from "../../auth/interfaces/Auth.interface";
import type { Action } from '../../shared/interfaces/Shared.interface'
import UsersCrud from "../components/UsersCrud";
import { FaPlus } from "react-icons/fa6";
import { getAllUsers, updateUser } from "../services/Users.service";
import { openNotificationWithIcon } from "../../shared/services/Shared.service";
import { getAllGroups } from "../services/Groups.service";
import type { Group } from "../interfaces/Administration.interface";

const UsersPage = () => {
    const [user, setUser] = useState<User>();
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [action, setAction] = useState<Action>('show');
    const [userForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isModalUserOpen, setIsModalUserOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchData = async () => {await Promise.all([getGroups(), getUsers()]);};
        fetchData();
    }, []);

    const showModalCrud = () => {
        setIsModalUserOpen(true);
    };

    const handleOk = () => {
        userForm.submit();
    };

    const handleCancel = () => {
        userForm.resetFields()
        setIsModalUserOpen(false);
    };

    const handleSaveUser = () => {
        setIsModalUserOpen(false);
        getUsers();
    };

    const getUsers = async () => {
        try {
            setLoading(true)
            const users = await getAllUsers();
            setAllUsers(users);
        }catch {
            openNotificationWithIcon(
                api,
                'error',
                'Usuarios',
                'No se pudo obtener la lista de usuarios.'
            )
        } finally {
            setLoading(false);
        }
    };

    const getGroups = async () => {
        try {
            const groups = await getAllGroups();
            setGroups(groups);
        } catch {
            openNotificationWithIcon(
                api,
                'error',
                'Roles',
                'No se pudo obtener la lista de roles.'
            )
        }
    };

    const changeUserState = async (user:User) => {
        try {
            user.is_active = !user.is_active
            await updateUser(user.id,user);
            openNotificationWithIcon(
                api,
                'success',
                'Usuarios',
                'Información actualizada correctamente.'
            )
            getUsers();
        } catch {
            openNotificationWithIcon(
                api,
                'error',
                'Usuarios',
                'No se pudo actualizar el estado del usuario.'
            )
        }
    };

    const manageAction = (user: User | undefined, action: Action) => {
        console.log("Usuario:", user);
        console.log("Acción:", action);
        setUser(user)
        setAction(action)
        if (action !== 'delete') {
            showModalCrud()
        } else {
            changeUserState(user!)
        }
    };

    return (
        <>
        {contextHolder}
            <Row>
                <Col><h1>Usuarios</h1></Col>
            </Row>
            <Row>
                <Card style={{ width: "100%" }}>
                    <Row justify={"end"}>
                        <Col>
                            <Button type="primary" icon={<FaPlus />} onClick={() => manageAction(undefined,'create')} >Agregar   </Button>
                        </Col>
                    </Row>
                    <Row>
                        <UsersList users={allUsers} groups={groups} loading={loading} onAction={manageAction} />
                    </Row>
                </Card>
            </Row>
            <Modal
                title={action === 'edit' ? "Editar usuario" : action === 'show' ? "Ver usuario" : "Crear usuario"}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalUserOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancelar
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Guardar
                    </Button>
                ]}
            >
                <UsersCrud 
                    user={user}
                    groups={groups}
                    action={action} 
                    setLoading={setLoading} 
                    userForm={userForm} 
                    onSaved={handleSaveUser}
                />
            </Modal>
        </>
    )
}

export default UsersPage