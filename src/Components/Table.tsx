import { useEffect, useState } from "react";
import EditModal from "./Actions/EditModal";
import DeleteModal from "./Actions/DeleteModal";
import ViewModal from "./Actions/ViewModal";
import {
  deleteStudent,
  Student,
  fetchAllStudents,
} from "../Services/StudentService";

interface TableProps {
  students: Student[];
}

const Table: React.FC<TableProps> = ({ students }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [currentStudents, setCurrentStudents] = useState<Student[]>(students);

  useEffect(() => {
    setCurrentStudents(students);
  }, [students]);

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setEditModalOpen(true);
  };

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setDeleteModalOpen(true);
  };

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setViewModalOpen(true);
  };

  const handleDeleteConfirm = async (emailId: string) => {
    try {
      const result = await deleteStudent(emailId);
      if (result.message === "success") {
        setCurrentStudents((prevStudents) =>
          prevStudents.filter((s) => s.emailId !== emailId)
        );
      }
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Delete operation failed:", error);
    }
  };

  const handleEditSave = async () => {
    try {
      const updatedStudents = await fetchAllStudents();
      setCurrentStudents(updatedStudents);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Failed to fetch students after edit:", error);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto px-10 py-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                firstName
              </th>
              <th scope="col" className="px-6 py-3">
                lastName
              </th>
              <th scope="col" className="px-6 py-3">
                image
              </th>
              <th scope="col" className="px-6 py-3">
                emailId
              </th>
              <th scope="col" className="px-6 py-3">
                attended
              </th>
              <th scope="col" className="px-6 py-3">
                attendance
              </th>
              <th scope="col" className="px-6 py-3">
                mobileNumber
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={student.emailId}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {student.firstName}
                  </th>
                  <td className="px-6 py-4">{student.lastName}</td>
                  <td className="px-6 py-4">
                    <img
                      src={student.image}
                      alt={student.firstName}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4">{student.emailId}</td>
                  <td className="px-6 py-4">
                    {student.attended ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4">{student.attendance}</td>
                  <td className="px-6 py-4">{student.mobileNumber}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-gray-500 text-white rounded-lg px-3 py-1 hover:bg-gray-400 mx-1"
                      onClick={() => handleView(student)}
                    >
                      View
                    </button>
                    <button
                      className="bg-gray-500 text-white rounded-lg px-3 py-1 hover:bg-gray-400 mx-1"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-lg px-3 py-1 hover:bg-red-400"
                      onClick={() => handleDelete(student)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isEditModalOpen && (
          <EditModal
            onClose={() => setEditModalOpen(false)}
            student={selectedStudent}
            onSave={handleEditSave}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            onClose={() => setDeleteModalOpen(false)}
            onDeleteConfirm={handleDeleteConfirm}
            student={selectedStudent}
          />
        )}
        {isViewModalOpen && (
          <ViewModal
            onClose={() => setViewModalOpen(false)}
            student={selectedStudent}
          />
        )}
      </div>
    </>
  );
};

export default Table;
