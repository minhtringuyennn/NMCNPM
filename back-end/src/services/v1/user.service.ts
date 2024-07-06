import bcrypt from 'bcrypt';
import { ObjectId } from 'mongoose';
import { BadRequestError } from 'routing-controllers';

import CRUD from '@common/interfaces/crud.interface';
import Users, { IUser, IUserSchema } from '@models/users.model';
import RegisterDto from '@v1/auth/dtos/register.dto';

export class UserService implements CRUD<IUserSchema> {
  private readonly userModel = Users;

  async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });

    return !!user;
  }

  async createOwnerAccount(
    SUPER_ADMIN_EMAIL: string,
    SUPER_ADMIN_PASSWORD: string,
    SUPER_ADMIN_FULL_NAME: string,
    SUPER_ADMIN_PHONE: string,
    SUPER_ADMIN_GENDER: string,
    SUPER_ADMIN_DOB: string,
  ) {
    const owner = await this.userModel.findOne({ email: SUPER_ADMIN_EMAIL });
    if (!owner) {
      await this.userModel.create({
        email: SUPER_ADMIN_EMAIL,
        password: SUPER_ADMIN_PASSWORD,
        role: 'owner',
        fullName: SUPER_ADMIN_FULL_NAME,
        phoneNumber: SUPER_ADMIN_PHONE,
        gender: SUPER_ADMIN_GENDER,
        dob: SUPER_ADMIN_DOB,
      });
    }
  }

  async createUser(userData: RegisterDto) {
    const { email } = userData;
    if (await this.isEmailTaken(email)) {
      throw new BadRequestError('Email already Taken');
    }

    const user = await this.userModel.create({ ...userData });
    return user;
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async comparePassword(inputPass: string, userPass: string) {
    return await bcrypt.compare(inputPass, userPass);
  }

  async getById(id: ObjectId): Promise<IUserSchema | null> {
    return await this.userModel.findById(id);
  }

  async updateById(id: ObjectId, updateBody: Partial<IUser>): Promise<IUserSchema | null> {
    // prevent user change his email
    if (updateBody.email) {
      delete updateBody.email;
    }

    const user = await this.getById(id);
    if (!user) {
      throw new BadRequestError('User not found');
    }

    Object.assign(user, updateBody);
    await user.save();
    return user;
  }

  async findAll(limit = 10, page = 0) {
    const query = {};
    const totalDocs = await this.userModel.countDocuments(query);
    const docs = await this.userModel
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

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestError('User not found');
    }
    return user;
  }
}
