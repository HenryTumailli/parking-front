import { Button, Col, Row, Space, Table, Tooltip } from "antd"
import type { User } from "../../auth/interfaces/Auth.interface";
import { FaPenToSquare, FaPlus, FaTrash } from "react-icons/fa6";
import type { Action } from "../../shared/interfaces/Shared.interface";
import type { Group } from "../interfaces/Administration.interface";

const { Column } = Table;

type TableProps = {
  onAction: (group: Group|undefined, action: Action) => void;
  groups: Group[] | undefined
};

function GroupsList({groups,onAction}:TableProps) {
    return (
        <>
        <Row justify="end">
            <Col span={"auto"}>
                <Button type="primary" icon={<FaPlus/>} onClick={() => onAction(undefined,'create')}>Agregar</Button>
            </Col>
        </Row>
        <Table<Group> style={{ width: "100%" }} dataSource={groups} rowKey="id">
            <Column title="Descripcion" dataIndex="name" key="name" />
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
                    </Space>
                )}
            />
        </Table>
        </>
    )
}

export default GroupsList
