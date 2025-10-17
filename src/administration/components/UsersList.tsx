import { useEffect, useState } from "react";
import { Button, notification, Space, Table, Tooltip } from "antd"
import type { User } from "../../auth/interfaces/Auth.interface";
import { getAllUsers } from "../services/Users.service";
import { openNotificationWithIcon } from "../../shared/services/Shared.service";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import type { Action } from "../../shared/interfaces/Shared.interface";

const { Column } = Table;

type TableProps = {
  onAction: (user: User, action: Action) => void;
};


function UsersList({onAction}:TableProps) {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loadingTable, setLoadingTable] = useState(false)
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        getUsers();
    }, []);
        

    const getUsers = async () => {
        try {
            setLoadingTable(true)
            const users = await getAllUsers();
            setAllUsers(users);
            // console.log({ users });
        }catch {
            openNotificationWithIcon(
                api,
                'error',
                'Usuarios',
                'No se pudo obtener la lista de usuarios.'
            )
        } finally {
            setLoadingTable(false);
        }
    };

    return (
        <>
        {contextHolder}
        <Table<User> style={{ width: "100%" }} dataSource={allUsers} loading={loadingTable} rowKey="id">
            <Column title="Usuario" dataIndex="username" key="username" />
            <Column title="Correo" dataIndex="email" key="address" />
            <Column title="Estado" dataIndex="is_active" key="state" />
            <Column
                title="Acciones"
                key="action"
                render={(_: any, record: User) => (
                    <Space size="middle">
                        <Tooltip title="Eliminar">
                            <Button type="text" danger icon={<FaTrash />} onClick={() => onAction(record,'delete')}/>
                        </Tooltip>
                        <Tooltip title="Editar">
                            <Button type="text" icon={<FaPenToSquare />} style={{color: "blue"}} onClick={() => onAction(record,'edit')}/>
                        </Tooltip>
                        <Tooltip title="Ver">
                            <Button type="text" icon={<FaPenToSquare />} style={{color: "blue"}} onClick={() => onAction(record,'show')}/>
                        </Tooltip>
                        {/* Borrar */} {record.id}
                    </Space>
                )}
            />
        </Table>
        </>
    )
}

export default UsersList
