import { Row, Col, Card, Select, notification, Checkbox, Table, Button, Modal, Form } from "antd"
import { useEffect, useState } from "react";
import { openNotificationWithIcon } from "../../shared/services/Shared.service";
import { getAllGroups, updateGroup } from "../services/Groups.service";
import type { Group, Permission } from "../interfaces/Administration.interface";
import { getAllPermissions } from "../services/Permissions.service";
import type { Action } from "../../shared/interfaces/Shared.interface";
import GroupsList from "../components/GroupsList";
import { FaPenToSquare } from "react-icons/fa6";
import GroupsCrud from "../components/GroupsCrud";

const PermissionsPage = () => {
    const [groups, setGroups] = useState<Group[]>();
    const [selectedGroupId, setSelectedGroupId] = useState<number>();
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const [action, setAction] = useState<Action>('show');
    const [groupToChange, setGroupToChange] = useState<Group>();
    const [isModalGroupOpen, setIsModalGroupOpen] = useState(false);
    const [isModalGroupCRUDOpen, setIsModalGroupCRUDOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [groupForm] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([getGroups(), getPermissions()]);
            } finally {
            }
        };
        fetchData();
    }, []);

    const showModalGroup = () => {
        setIsModalGroupOpen(true);
    };

    const handleGroupOk = () => {
        setIsModalGroupOpen(false);
    };

    const handleGroupCancel = () => {
        setIsModalGroupOpen(false);
    };

    const showModalGroupCrud = () => {
        setIsModalGroupCRUDOpen(true);
    };

    const handleGroupCrudOk = () => {
        groupForm.submit();
    };

    const handleSaveGroup = () => {
        setIsModalGroupCRUDOpen(false);
        getGroups();
        setSelectedGroupId(undefined);
        setSelectedPermissions([]);
    };

    const handleGroupCrudCancel = () => {
        setIsModalGroupCRUDOpen(false);
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

    const getPermissions = async () => {
        try {
            const permissions = await getAllPermissions();
            setPermissions(permissions);
        } catch {
            openNotificationWithIcon(
                api,
                'error',
                'Permisos',
                'No se pudo obtener la lista de permisos.'
            )
        }
    };

    const handleChangeGroup = (groupId: number) => {
        setSelectedGroupId(groupId);

        // Encontrar el grupo seleccionado
        const selectedGroup = groups?.find(g => g.id === groupId);

        // Actualizar los permisos seleccionados (ya son IDs)
        if (selectedGroup && selectedGroup.permissions) {
            setSelectedPermissions(selectedGroup.permissions);
        } else {
            setSelectedPermissions([]);
        }
    };

    const handlePermissionChange = (permissionId: number, checked: boolean) => {
        if (checked) {
            setSelectedPermissions([...selectedPermissions, permissionId]);
        } else {
            setSelectedPermissions(selectedPermissions.filter(id => id !== permissionId));
        }
    };

    const groupPermissionsByModel = (permissions: Permission[]) => {
        const grouped: Record<string, Record<string, Permission[]>> = {};
        const modules = ["users", "groups"]

        permissions.forEach(permission => {
            const { app_label, model } = permission.content_type;

            if (!modules.includes(app_label)) {
                return;
            }

            if (!grouped[app_label]) {
                grouped[app_label] = {};
            }

            if (!grouped[app_label][model]) {
                grouped[app_label][model] = [];
            }

            grouped[app_label][model].push(permission);
        });

        return grouped;
    };

    const groupedPermissions = groupPermissionsByModel(permissions);

    const savePermissions = async () => {
        try {
            if (selectedGroupId)
                await updateGroup(selectedGroupId, { permissions: selectedPermissions } as Group);
            openNotificationWithIcon(
                api,
                'success',
                'Permisos',
                'La información se ha guardado correctamente.'
            )
        } catch {
            openNotificationWithIcon(
                api,
                'error',
                'Roles',
                'No se pudo guardar la información.'
            )
        }

    }

    const handleAction = (group: Group | undefined, action: Action) => {
        setAction(action)
        setGroupToChange(group)

        if (action !== 'delete') {
            showModalGroupCrud()
        } else {

        }
    };


    return (
        <>
            {contextHolder}
            <Row>
                <Col><h1>Roles y Permisos</h1></Col>
            </Row>
            <Row>
                <Card style={{ width: "100%" }}>
                    <Row style={{ marginBottom: 16 }}>
                        <Col span={24}>
                            <Row>
                                <Col span={"auto"}>
                                    <h3>Roles</h3>
                                </Col>
                                <Col>
                                    <Button type="text" icon={<FaPenToSquare />} style={{ color: "blue" }} onClick={() => showModalGroup()} />
                                </Col>
                            </Row> 
                            <Select
                                placeholder="Seleccione un rol"
                                style={{ width: 300 }}
                                value={selectedGroupId} 
                                onChange={handleChangeGroup}
                                options={groups?.map((group) => ({
                                    value: group.id,
                                    label: group.name
                                }))}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table
                                dataSource={Object.entries(groupedPermissions).flatMap(([appLabel, models]) =>
                                    Object.entries(models).map(([modelName, perms]) => ({
                                        key: `${appLabel}-${modelName}`,
                                        module: `${appLabel}`,
                                        viewPerm: perms.find(p => p.codename.startsWith('view_')),
                                        addPerm: perms.find(p => p.codename.startsWith('add_')),
                                        changePerm: perms.find(p => p.codename.startsWith('change_')),
                                        deletePerm: perms.find(p => p.codename.startsWith('delete_'))
                                    }))
                                )}
                                columns={[
                                    {
                                        title: 'Módulo',
                                        dataIndex: 'module',
                                        key: 'module',
                                        width: '40%'
                                    },
                                    {
                                        title: 'Ver',
                                        key: 'view',
                                        align: 'center',
                                        render: (_, record) => (
                                            record.viewPerm && (
                                                <Checkbox
                                                    checked={selectedPermissions.includes(record.viewPerm.id)}
                                                    onChange={(e) => handlePermissionChange(record.viewPerm!.id, e.target.checked)}
                                                />
                                            )
                                        )
                                    },
                                    {
                                        title: 'Crear',
                                        key: 'add',
                                        align: 'center',
                                        render: (_, record) => (
                                            record.addPerm && (
                                                <Checkbox
                                                    checked={selectedPermissions.includes(record.addPerm.id)}
                                                    onChange={(e) => handlePermissionChange(record.addPerm!.id, e.target.checked)}
                                                />
                                            )
                                        )
                                    },
                                    {
                                        title: 'Editar',
                                        key: 'change',
                                        align: 'center',
                                        render: (_, record) => (
                                            record.changePerm && (
                                                <Checkbox
                                                    checked={selectedPermissions.includes(record.changePerm.id)}
                                                    onChange={(e) => handlePermissionChange(record.changePerm!.id, e.target.checked)}
                                                />
                                            )
                                        )
                                    },
                                    {
                                        title: 'Eliminar',
                                        key: 'delete',
                                        align: 'center',
                                        render: (_, record) => (
                                            record.deletePerm && (
                                                <Checkbox
                                                    checked={selectedPermissions.includes(record.deletePerm.id)}
                                                    onChange={(e) => handlePermissionChange(record.deletePerm!.id, e.target.checked)}
                                                />
                                            )
                                        )
                                    }
                                ]}
                                pagination={false}
                                bordered
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }} justify="end">
                        <Col span={"auto"}>
                            <Button type="primary" disabled={selectedGroupId ? false : true} onClick={() => savePermissions()}>Guardar</Button>
                        </Col>
                    </Row>
                </Card>
            </Row>
            <Modal
                title={"Lista de roles"}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalGroupOpen}
                onOk={handleGroupOk}
                onCancel={handleGroupCancel}
            >
                <GroupsList groups={groups} onAction={handleAction}></GroupsList>
            </Modal>
            <Modal
                title={action === 'edit' ? "Editar rol" : "Crear rol"}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalGroupCRUDOpen}
                onOk={handleGroupCrudOk}
                onCancel={handleGroupCrudCancel}
                footer={[
                    <Button key="back" onClick={handleGroupCrudCancel}>
                        Cancelar
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleGroupCrudOk}>
                        Guardar
                    </Button>
                ]}
            >
                <GroupsCrud action={action} group={groupToChange} setLoading={setLoading} groupForm={groupForm} onSaved={handleSaveGroup}></GroupsCrud>
            </Modal>
        </>
    )
}

export default PermissionsPage