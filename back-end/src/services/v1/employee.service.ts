import mongoose, { ObjectId } from 'mongoose';
import { BadRequestError, NotFoundError } from 'routing-controllers';

import CRUD from '@common/interfaces/crud.interface';
import Employees, { IEmployee, IEmployeeSchema } from '@models/employees.model';
import { EmployeeDto } from '@v1/employee/dto/employee.dto';

export class EmployeeService implements CRUD<IEmployeeSchema> {
  private readonly employeeModel = Employees;

  async findAll(limit = 10, page = 0) {
    const query = {};
    const totalDocs = await this.employeeModel.countDocuments(query);
    const docs = await this.employeeModel
      .find(query)
      .limit(limit)
      .skip(limit * page)
      .sort({ createdAt: -1 })
      .lean();

    return {
      docs: JSON.parse(JSON.stringify(docs)),
      meta: {
        totalDocs,
        totalPages: Math.ceil(totalDocs / limit) || 0,
        page,
      },
    };
  }

  async getById(id: ObjectId): Promise<IEmployeeSchema | null> {
    return await this.employeeModel.findById(id);
  }

  async getEmployeeById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError('Invalid Object id string');
    }

    const query = { _id: id };
    const employee = await this.employeeModel.find(query).exec();

    if (employee.length === 0) {
      throw new NotFoundError('Employee id not exist');
    }

    return employee[0];
  }

  async isPhoneNumberTaken(phoneNumber: string): Promise<boolean> {
    const employee = await this.employeeModel.findOne({ phoneNumber });

    return !!employee;
  }

  async getEmployeeByPhoneNumber(phoneNumber: string) {
    return await this.employeeModel.findOne({ phoneNumber });
  }

  async filterEmployeeByName(employeeName: string) {
    const query = {
      employeeName: employeeName,
    };
    const employees = await this.employeeModel.find(query).exec();

    if (employees.length === 0) {
      throw new NotFoundError('Employee name not exist');
    }

    return employees;
  }

  async createEmployee(employeeData: EmployeeDto) {
    const { phoneNumber } = employeeData;

    if (await this.isPhoneNumberTaken(phoneNumber)) {
      throw new BadRequestError('Phone number already taken');
    }

    const newEmployee = this.employeeModel.create({ ...employeeData });
    return newEmployee;
  }

  async updateEmployee(employeeData: EmployeeDto) {
    const { phoneNumber } = employeeData;
    const employee = await this.getEmployeeByPhoneNumber(phoneNumber);

    if (!employee) {
      throw new NotFoundError('Employee not exist');
    }

    Object.assign(employee, employeeData);
    await employee.save();

    return employee;
  }

  async deleteEmployee(id: string) {
    const employee = await this.getEmployeeById(id);
    await this.employeeModel.findByIdAndDelete(employee.id);
    return { message: 'Employee successfully deleted' };
  }
}
