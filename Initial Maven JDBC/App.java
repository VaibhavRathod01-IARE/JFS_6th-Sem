package com.skillnext;

import java.util.*;

public class App {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        StudentDAO dao = new StudentDAO();

        while (true) {
            System.out.println("\n----- STUDENT MANAGEMENT -----");
            System.out.println("1. Insert Student");
            System.out.println("2. Modify Student");
            System.out.println("3. View All Students");
            System.out.println("4. Delete Student");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");

            int ch = sc.nextInt();
            sc.nextLine();  // clear buffer

            try {
                switch (ch) {

                    case 1:
                        System.out.print("Enter Name: ");
                        String name = sc.nextLine();

                        System.out.print("Enter Sem: ");
                        int sem = sc.nextInt();
                        sc.nextLine();

                        System.out.print("Enter Dept: ");
                        String dept = sc.nextLine();

                        Student s = new Student(name, sem, dept);
                        dao.addStudent(s);
                        System.out.println("Student inserted successfully!");
                        break;

                    case 2:
                        System.out.print("Enter Student ID to Update: ");
                        int uid = sc.nextInt();
                        sc.nextLine();

                        System.out.print("New Name: ");
                        String uname = sc.nextLine();

                        System.out.print("New Sem: ");
                        int usem = sc.nextInt();
                        sc.nextLine();

                        System.out.print("New Dept: ");
                        String udept = sc.nextLine();

                        Student s2 = new Student(uid, uname, usem, udept);
                        dao.updateStudent(s2);
                        System.out.println("Student updated successfully!");
                        break;

                    case 3:
                        List<Student> list = dao.getAllStudents();
                        System.out.println("\n--- Student List ---");
                        for (Student st : list) {
                            System.out.println(
                                st.getId() + " | " + 
                                st.getName() + " | " + 
                                st.getSem() + " | " + 
                                st.getDept()
                            );
                        }
                        break;

                    case 4:
                        System.out.print("Enter Student ID to Delete: ");
                        int did = sc.nextInt();
                        dao.deleteStudent(did);
                        System.out.println("Student deleted successfully!");
                        break;

                    case 5:
                        System.out.println("Exiting...");
                        System.exit(0);

                    default:
                        System.out.println("Invalid choice. Try again!");
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
