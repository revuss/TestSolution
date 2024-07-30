import React from "react";
import { Student } from "../../Services/StudentService";

interface ViewModalProps {
  onClose: () => void;
  student: Student | null;
}

const ViewModal: React.FC<ViewModalProps> = ({ onClose, student }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90">
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-96 max-h-screen overflow-y-auto">
        <h2 className="text-2xl mb-4">View Student Details</h2>
        <div className="mb-4">
          <strong>First Name:</strong> {student.firstName}
        </div>
        <div className="mb-4">
          <strong>Last Name:</strong> {student.lastName}
        </div>
        <div className="mb-4">
          <strong>Email ID:</strong> {student.emailId}
        </div>
        <div className="mb-4">
          <strong>Attended:</strong> {student.attended ? "Yes" : "No"}
        </div>
        <div className="mb-4">
          <strong>Attendance:</strong> {student.attendance}
        </div>
        <div className="mb-4">
          <strong>Mobile Number:</strong> {student.mobileNumber}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
