export interface Student {
    id: string;
    image?: string;
    firstName: string;
    lastName: string;
    emailId: string;
    attended?: boolean;
    attendance?: number;
    mobileNumber?: string;
  }
  
  export async function fetchAllStudents(): Promise<Student[]> {
    try {
      const response = await fetch("https://studentmgmtapi.vercel.app/api/allStudents");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data);  // Log the fetched data
      if (data.message === "success" && Array.isArray(data.students)) {
        return data.students;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
      return [];
    }
  }
  
  
  export async function createStudent(student: {
    firstName: string;
    id: string;
    mobileNumber: string;
    emailId: string;
    lastName?: string;
    image?: string;
    attended?: boolean;
    attendence?: string;
  }): Promise<{ message: string }> {
    try {
      console.log("Sending data:", student); // Log the data being sent
      const response = await fetch("https://studentmgmtapi.vercel.app/api/createStudent", {
        method: "POST",
        body: JSON.stringify(student),
      });
  
      console.log("Response status:", response.status); 
  
      const serverData = await response.json();
      console.log("Response data:", serverData); 
  
      return serverData;
    } catch (error) {
      console.error("Failed to create student:", error);
      throw error;
    }
  }
  
  
  export async function editStudent(student: Student): Promise<{ message: string }> {
    try {
      const response = await fetch("https://studentmgmtapi.vercel.app/api/editStudent", {
        method: "POST",
        body: JSON.stringify(student),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const serverData = await response.json();
      return serverData;
    } catch (error) {
      console.error("Failed to edit student:", error);
      throw error;
    }
  }
  
  
  
  export async function deleteStudent(emailId: string): Promise<{ message: string }> {
    try {
      const response = await fetch("https://studentmgmtapi.vercel.app/api/deleteStudent", {
        method: "POST",
        body: JSON.stringify({ emailId }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const serverData = await response.json();
      return serverData;
    } catch (error) {
      console.error("Failed to fetch:", error);
      throw error;
    }
  }
  