import { useEffect } from "react";
import { Col, Form, Input, notification, Row, type FormInstance, type FormProps } from "antd";
import type { Action } from "../../shared/interfaces/Shared.interface"
import { openNotificationWithIcon } from "../../shared/services/Shared.service";
import type { Group } from "../interfaces/Administration.interface";
import { createGroup, updateGroup } from "../services/Groups.service";


type GroupsCrudProps = {
    group: Group | undefined;
    action: Action;
    groupForm: FormInstance;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    onSaved: () => void ;
};

function GroupsCrud({ group, action, groupForm,setLoading,onSaved }: GroupsCrudProps) {

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (group) {
            groupForm.setFieldsValue(group);
        } else {
            groupForm.resetFields();
        }
    }, [group, groupForm]);

    const onFinish: FormProps<Group>['onFinish'] = async (values: Group) => {
        try {
            setLoading(true);
            if (action == 'create')
                await createGroup(values);
            else
                await updateGroup(group!.id!, values)
            openNotificationWithIcon(api, 'success', 'Roles', 'Información guardada correctamente.');
            onSaved();
        } catch (error:any) {
            openNotificationWithIcon(
                api,
                'error',
                'Roles',
                'No se pudo guardar la información.',
                error.details
            )
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Form
                form={groupForm}
                name="groupForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 22 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                disabled={action === 'show'}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item<Group>
                            label="Nombre"
                            name="name"
                            rules={[{ required: true, message: 'El nombre es requerido' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default GroupsCrud
