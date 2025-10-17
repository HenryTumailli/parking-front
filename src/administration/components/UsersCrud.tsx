import { useState } from "react";
import { Col, Form,  Input,  notification,  Row,  type FormProps} from "antd";
import type { User } from "../../auth/interfaces/Auth.interface"
import type { Action } from "../../shared/interfaces/Shared.interface"
import { openNotificationWithIcon } from "../../shared/services/Shared.service";


type UsersCrudProps = {
    user: User | undefined;              // Tipo de tu usuario
    action: Action; // Tipo de la acción
};

function UsersCrud({ user, action }: UsersCrudProps) {
    const [userForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    // const [currentUser, setUser] = useState<User>();
    // const [currentAction, setAction] = useState<Action>();

    // setUser(user)
    // setAction(action)
    userForm.setFieldsValue(user)

    const onFinish: FormProps<User>['onFinish'] = async (values: User) => {
        try {
            setLoading(true);
            // const authResponse: AuthResponse = await login(values);
        } catch (error) {
            openNotificationWithIcon(
                api,
                'error',
                'Usuarios',
                'No se pudo guardar la información.'
            )
        } finally {
            setLoading(false);
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
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                disabled = {action === 'show'}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item<User>
                        label="username"
                        name="username"
                        rules={[{ required: true, message: 'El usuario es requerido' }]}
                        >
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<User>
                        label="username"
                        name="username"
                        rules={[{ required: true, message: 'El usuario es requerido' }]}
                        >
                        <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default UsersCrud
