import { Tabs } from "antd";
import AllEmployeesView from "./AllEmployeesView";
import AdminView from "./AdminView";
import IsSupportView from "./IsSupportView";
import GeneralEmployeeView from "./GeneralEmployeeView";

const UsersTab = () => {

    const tabItems = [
        {
            key: "1",
            label: "Administrators",
            children: <AdminView />,
        },
        {
            key: "2",
            label: "Is Support",
            children: <IsSupportView />,
        },
        {
            key: "3",
            label: "General Employees",
            children: <GeneralEmployeeView />,
        },
        {
            key: "4",
            label: "All Employees",
            children: <AllEmployeesView />
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey="1" items={tabItems} style={{ color: '#39b54a' }} />
        </>
    );
}
console.clear();
export default UsersTab;