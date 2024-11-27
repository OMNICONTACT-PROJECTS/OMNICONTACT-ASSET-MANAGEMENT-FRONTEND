import { Space, Table, Input, Button, Popconfirm, Tooltip, message } from 'antd';
import { useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import departmentService from "../../../services/department.service";
import authService from "../../../services/auth.service";
import { useLoaderData, useNavigate } from "react-router-dom";
import AddDepartment from './AddDepartment';
import EditDepartment from './EditDepartment';
import { refreshPage } from "../../../common";

export async function AllDepartmentsViewLoader() {
  try {
    const departmentResponse = await departmentService.getAllByOrganisationId(
      authService.getUserOrganisationId()
    );

    if (departmentResponse.status !== 200) {
      console.log("No departments found.");
    }

    return {
      departmentData: departmentResponse?.data,
    };
  } catch (e) {
    console.log(e);
    return { departmentData: [] };
  }
}

const AllDepartmentsView = () => {
  const navigate = useNavigate();
  const { departmentData } = useLoaderData();
  const [searchText, setSearchText] = useState("");
  const [addDepartmentModal, setAddDepartmentModal] = useState(false);
  const [editDepartmentModal, setEditDepartmentModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "department_id",
      sorter: (a, b) => a.id - b.id, // Sorting numerically by ID
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
      sorter: (a, b) => a.name.localeCompare(b.name), // Sorting alphabetically by Name
    },
    {
      title: "Organisation",
      dataIndex: ["organisation", "organisation_name"],
      key: "organisation_name",
    },
    {
      title: "Date Created",
      dataIndex: "date_created",
      key: "date_created",
      render: (date) =>
        new Date(date).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      sorter: (a, b) => new Date(a.date_created) - new Date(b.date_created), // Sorting by date
    },
    {
      title: "Last Updated",
      dataIndex: "last_updated",
      key: "last_updated",
      render: (date) =>
        new Date(date).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="small">
          <Tooltip title="Edit Department">
            <Button
              className="p-1 border-0 text-light"
              icon={<Edit3 size={18} />}
              onClick={() => editDepartment(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Department">
            <Popconfirm
              title="Delete Department"
              description="Are you sure you want to delete this Department?"
              onConfirm={() => deleteDepartment(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" icon={<Trash2 size={18} color="red" />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const editDepartment = (department) => {
    setSelectedDepartment(department);
    setEditDepartmentModal(true);
  };

  const closeEditDepartmentModal = () => {
    setEditDepartmentModal(false);
    setSelectedDepartment(null);
  };

  const deleteDepartment = async (department) => {
    try {
      const response = await departmentService.delete(department.id);
      if (response.status === 204) {
        message.success("Department deleted successfully");
        refreshPage();
      }
    } catch (e) {
      message.error("Failed to delete department");
      console.error(e);
    }
  };

  const handleSearch = () => {
    return departmentData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleAddDepartment = async (values) => {
    try {
      const response = await departmentService.create(values);
      if (response.status === 201) {
        message.success("Department added successfully");
        refreshPage();
      }
    } catch (e) {
      message.error("Failed to add department");
      console.error(e);
    }
  };

  const handleSaveDepartmentChanges = async (values) => {
    try {
      const response = await departmentService.update(selectedDepartment.id, values);
      if (response.status === 200) {
        message.success("Department updated successfully");
        refreshPage();
      }
    } catch (e) {
      message.error("Failed to update department");
      console.error(e);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <Input
          placeholder="Search by department name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200, marginRight: 8 }}
        />
        <Button onClick={handleSearch} type="primary" style={{ marginRight: 8 }}>
          Search
        </Button>
        <div style={{ marginLeft: 'auto' }}>
          <Button
            type="primary"
            style={{ marginRight: '25px', marginBottom: '15px' }}
            onClick={() => setAddDepartmentModal(true)}
          >
            Add Department
          </Button>
        </div>
      </div>

      <Table
        className="table-responsive"
        columns={columns}
        dataSource={handleSearch()}
      />

      <AddDepartment
        open={addDepartmentModal}
        close={() => setAddDepartmentModal(false)}
        onAdd={handleAddDepartment}
      />

      <EditDepartment
        open={editDepartmentModal}
        close={closeEditDepartmentModal}
        selectedDepartment={selectedDepartment}
        onSave={handleSaveDepartmentChanges}
      />
    </>
  );
};

export default AllDepartmentsView;
