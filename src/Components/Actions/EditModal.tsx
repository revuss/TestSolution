import React, { useState } from "react";
import { Student,editStudent } from "../../Services/StudentService";

interface EditModalProps {
  onClose: () => void;
  student: Student | null;
  onSave: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ onClose, student, onSave }) => {
  const [formData, setFormData] = useState(student);

  if (!student) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      await editStudent(formData);
      onSave();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 dark:text-black text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData?.firstName || ""}
              onChange={handleChange}
              className="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData?.lastName || ""}
              onChange={handleChange}
              className="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="text"
              name="image"
              value={formData?.image || ""}
              onChange={handleChange}
              className="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              name="id"
              value={formData?.id || ""}
              onChange={handleChange}
              className="mt-1 block p-1 w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="emailId"
              value={formData?.emailId || ""}
              onChange={handleChange}
              className="mt-1 block p-1 w-full border border-gray-300 rounded-md shadow-sm"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Attended</label>
            <input
              type="text"
              name="attended"
              value={formData?.attended ? "Yes" : "No"}
              onChange={handleChange}
              className="mt-1 block p-1 w-full border border-gray-300 rounded-md shadow-sm"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Attendance</label>
            <input
              type="text"
              name="attendance"
              value={formData?.attendance || ""}
              onChange={handleChange}
              className="mt-1 block p-1 w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData?.mobileNumber || ""}
              onChange={handleChange}
              className="mt-1 block p-1 w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
