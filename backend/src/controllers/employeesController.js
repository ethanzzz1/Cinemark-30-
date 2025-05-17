const employeesController = {};

import EmployeesModel from "../models/Employees.js";

// Registrar nuevo empleado
employeesController.register = async (req, res) => {
    const { name, email, password, telephone, address, role, hireDate, salary, status, isVerified } = req.body;

    try {
        const newEmployee = new EmployeesModel({
            name,
            email,
            password,
            telephone,
            address,
            role,
            hireDate,
            salary,
            status,
            isVerified,
        });

        await newEmployee.save();

        res.status(201).json({ message: "Employee registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering employee", error });
    }
};

// Obtener empleados
employeesController.getEmployees = async (req, res) => {
    const employees = await EmployeesModel.find();
    res.json(employees);
};

// Eliminar empleado
employeesController.deleteEmployees = async (req, res) => {
    await EmployeesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
};

// Actualizar empleado
employeesController.putEmployees = async (req, res) => {
    const { name, email, password, telephone, address, role, hireDate, salary, status, isVerified } = req.body;

    await EmployeesModel.findByIdAndUpdate(
        req.params.id,
        { name, email, password, telephone, address, role, hireDate, salary, status, isVerified },
        { new: true }
    );

    res.json({ message: "Employee updated successfully" });
};

export default employeesController;
