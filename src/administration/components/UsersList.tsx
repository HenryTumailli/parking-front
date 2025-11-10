import { Button, Space, Table, Tag, Tooltip } from "antd"
import type { User } from "../../auth/interfaces/Auth.interface";
import { FaBan, FaCheck, FaPenToSquare } from "react-icons/fa6";
import type { Action } from "../../shared/interfaces/Shared.interface";
import type { Group } from "../interfaces/Administration.interface";

const { Column } = Table;

type TableProps = {
    users: User[] | undefined
    groups: Group[] | undefined
    loading: boolean
    onAction: (user: User, action: Action) => void;
};


function UsersList({ users, loading, groups, onAction }: TableProps) {
    return (
        <>
            <Table<User> style={{ width: "100%" }} dataSource={users} loading={loading} rowKey="id">
                <Column title="Usuario" dataIndex="username" key="username" />
                <Column title="Correo" dataIndex="email" key="address" />
                <Column title="Nombre" dataIndex="first_name" key="first_name" />
                <Column title="Apellido" dataIndex="last_name" key="last_name" />
                <Column
                    title="Roles"
                    dataIndex="groups"
                    key="groups"
                    render={(groupIds: number[]) => (
                        <>
                            {groupIds?.length ? (
                                groupIds.map((id) => {
                                    const name = groups?.find((g) => g.id === id)?.name || `ID ${id}`;
                                    return (
                                        <Tag key={id} color="blue" style={{ marginRight: 4 }}>
                                            {name}
                                        </Tag>
                                    );
                                })
                            ) : (
                                <Tag color="default">Sin rol</Tag>
                            )}
                        </>
                    )}
                />
                <Column
                    title="Estado"
                    dataIndex="is_active"
                    key="is_active"
                    render={(isActive: boolean) => (
                        <Tag color={isActive ? "green" : "red"}>
                            {isActive ? "Activo" : "Inactivo"}
                        </Tag>
                    )}
                />
                <Column
                    title="Acciones"
                    key="action"
                    render={(_: any, record: User) => (
                        <Space size="middle">
                            <Tooltip title="Editar">
                                <Button
                                    type="text"
                                    icon={<FaPenToSquare />}
                                    style={{ color: "blue" }}
                                    onClick={() => onAction(record, "edit")}
                                />
                            </Tooltip>

                            <Tooltip title={record.is_active ? "Desactivar" : "Activar"}>
                                <Button
                                    type="text"
                                    icon={record.is_active ? <FaBan /> : <FaCheck />}
                                    style={{ color: record.is_active ? "red" : "green" }}
                                    onClick={() => onAction(record, "delete")}
                                />
                            </Tooltip>
                        </Space>
                    )}
                />
            </Table>
        </>
    )
}

export default UsersList
