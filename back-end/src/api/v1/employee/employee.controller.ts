import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Body, Delete, Get, HttpCode, NotFoundError, Param, Post, Put, QueryParam, Res, UseBefore } from 'routing-controllers';
import auth from '@middlewares/auth.middleware';
import { JsonController } from 'routing-controllers';
import { EmployeeService } from '@services/v1';
import { IEmployee } from '@models/employees.model';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { PhoneNumberDto } from './dto/phonenumber.dto';
import { EmployeeNameDto } from './dto/employeename.dto';
import { EmployeeDto } from './dto/employee.dto';

@JsonController('/v1/employees', { transformResponse: false })
export class EmployeeController {
  private readonly employeeService = new EmployeeService();

  @Get('/all')
  @OpenAPI({ summary: 'Get all employee' })
  @ResponseSchema(IEmployee, { isArray: true })
  async findAllEmployee(@QueryParam('sort') sort: string) {
    const employees = await this.employeeService.findAll();
    if (sort === 'true') {
      employees.docs = employees.docs.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
    }
    return employees;
  }

  @Get('/phone/:phoneNumber')
  @OpenAPI({ summary: 'find employee by phone number' })
  @UseBefore(validationMiddleware(PhoneNumberDto, 'params'))
  @ResponseSchema(IEmployee)
  async findEmployeeByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    const employee = await this.employeeService.getEmployeeByPhoneNumber(phoneNumber);

    if (!employee) {
      throw new NotFoundError('Employee not exist');
    }

    return employee;
  }

  @Get('/name')
  @OpenAPI({ summary: 'find employee by name' })
  @UseBefore(validationMiddleware(EmployeeNameDto, 'body'))
  @ResponseSchema(IEmployee, { isArray: true })
  async findEmployeeByName(@Body() employeeName: EmployeeNameDto) {
    const employee = await this.employeeService.filterEmployeeByName(employeeName.employeeName);
    return employee;
  }

  @Get('/id/:id')
  @OpenAPI({ summary: 'find an employee by id' })
  @ResponseSchema(IEmployee)
  async findEmployeeById(@Param('id') id: string) {
    const employee = await this.employeeService.getEmployeeById(id);
    return employee;
  }

  @Post('/')
  @HttpCode(201)
  @OpenAPI({ summary: 'create new employee' })
  @UseBefore(auth())
  @UseBefore(validationMiddleware(EmployeeDto, 'body'))
  @ResponseSchema(IEmployee)
  async createEmployee(@Body() employeeData: EmployeeDto) {
    const employee = await this.employeeService.createEmployee(employeeData);
    return employee;
  }

  @Put('/')
  @OpenAPI({ summary: 'update an employee' })
  @UseBefore(auth())
  @UseBefore(validationMiddleware(EmployeeDto, 'body'))
  @ResponseSchema(IEmployee)
  async updateEmployee(@Body() employeeData: EmployeeDto) {
    const employee = await this.employeeService.updateEmployee(employeeData);
    return employee;
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'delete an employee' })
  @UseBefore(auth())
  async deleteEmployee(@Param('id') id: string) {
    const message = await this.employeeService.deleteEmployee(id);
    return message;
  }
}
