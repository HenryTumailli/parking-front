import { useEffect, useState } from "react";
import { Checkbox, Col, Form, Input, notification, Row, Select, type FormInstance, type FormProps } from "antd";
import type { User } from "../../auth/interfaces/Auth.interface"
import type { Action } from "../../shared/interfaces/Shared.interface"
import { getTenantId, openNotificationWithIcon } from "../../shared/services/Shared.service";
import type { Group } from "../interfaces/Administration.interface";
import { createUser, updateUser } from "../services/Users.service";


type UsersCrudProps = {
    user: User | undefined;
    groups: Group[] | undefined
    action: Action;
    userForm: FormInstance;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    onSaved: () => void;

};

function UsersCrud({ user, groups, action, userForm, onSaved}: UsersCrudProps) {
    const [tenantId] = useState<number>(getTenantId())
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (user) {
            console.log({ user });
            userForm.setFieldsValue(user);
        } else {
            userForm.resetFields();
        }
    }, [user, userForm]);

    const onFinish: FormProps<User>['onFinish'] = async (values: User) => {
        try {
            console.log({ values });
            if (action == 'create') {
                userForm.setFieldValue("tenant", tenantId);
                await createUser(userForm.getFieldsValue());
            }
            else
                await updateUser(user?.id!, values)
            onSaved()
            openNotificationWithIcon(api, 'success', 'Usuarios', 'Información guardada correctamente.');
        } catch (error: any) {
            openNotificationWithIcon(
                api,
                'error',
                'Usuarios',
                'No se pudo guardar la información.',
                error.details
            )
        }
    };

    return (
        <>
            {contextHolder}
            <Form
                form={userForm}
                name="userForm"
                layout="vertical"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 22 }}
                initialValues={{ is_active: true, tenant: tenantId }}
                onFinish={onFinish}
                autoComplete="off"
                disabled={action === 'show'}
            >
                <Form.Item<User> name="tenant" hidden>
                    <Input hidden />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item<User>
                            label="Usuario"
                            name="username"
                            rules={[{ required: true, message: 'El usuario es requerido' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<User>
                            label="Correo"
                            name="email"
                            rules={[{ required: true, message: 'El correo es requerido' }, { type: "email", message: 'Ingrese un correo válido' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<User>
                            label="Nombre"
                            name="first_name"
                            rules={[{ required: true, message: 'El nombre es requerido' }, { type: "string" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<User>
                            label="Apellido"
                            name="last_name"
                            rules={[{ required: true, message: 'El apellido es requerido' }, { type: "string" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<User>
                            label="Roles"
                            name="groups"
                            rules={[{ required: true, message: 'Debe elegir al menos un rol' }]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Seleccione rol"
                                options={groups?.map((group) => ({
                                    value: group.id,
                                    label: group.name
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<User>
                            label="Activo"
                            name="is_active"
                            valuePropName="checked"
                        >
                            <Checkbox disabled={action !== 'show' ? user ? false : true : true} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default UsersCrud
