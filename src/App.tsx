import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Components/Nav";
import Table from "./Components/Table";
import SearchBar from "./Components/Actions/SearchBar";
import Pagination from "./Components/Pagination";
import AddStudent from "./Components/Actions/AddStudent";
import { fetchAllStudents, Student } from "./Services/StudentService";

function App() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 3;

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  useEffect(() => {
    async function fetchData() {
      const students = await fetchAllStudents();
      setStudents(students);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.emailId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleAddStudent = (newStudent: Student) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  return (
    <>
      <main className="main-page">
        <Nav />

        <div className="main-second">
          <div className="col-span-1">
            <h1 className="text-2xl font-semibold">
              Student Management System
            </h1>
          </div>
          <div className="col-span-1">
            <button className="main-button" onClick={handleAdd}>
              Add Student
            </button>
          </div>
          {isAddModalOpen && (
            <AddStudent
              onClose={() => setAddModalOpen(false)}
              onAddStudent={handleAddStudent}
            />
          )}
          <div className="col-span-1">
            <SearchBar onSearch={setSearchTerm} />
          </div>
        </div>
        <div>
          <Table students={currentStudents} />
        </div>
        <div className="py-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </>
  );
}

export default App;
