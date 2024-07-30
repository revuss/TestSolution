import React from "react";
import { Student } from "../../Services/StudentService";

interface DeleteModalProps {
  onClose: () => void;
  onDeleteConfirm: (emailId: string) => void;
  student: Student | null;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  onClose,
  onDeleteConfirm,
  student,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black text-black dark:text-white bg-opacity-90 dark:bg-opacity-90 dark:bg-gray-800">
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">Delete Confirmation</h2>
        <p>Are you sure you want to delete {student?.firstName}?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
          >
            No
          </button>
          <button
            onClick={() => student && onDeleteConfirm(student.emailId)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
