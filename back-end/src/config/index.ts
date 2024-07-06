import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const checkEnv = (envVar: string, defaultValue?: string) => {
  if (!process.env[envVar]) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Please define the Enviroment variable"${envVar}"`);
  } else {
    return process.env[envVar] as string;
  }
};

export const PORT: number = parseInt(checkEnv('PORT'), 10);
export const MONGO_URI: string = checkEnv('MONGO_URI');
export const DATABASE: string = checkEnv('DATABASE');
export const CORS_ORIGINS = JSON.parse(checkEnv('CORS_ORIGINS'));
export const CREDENTIALS = checkEnv('CREDENTIALS') === 'true';

export const isProduction = checkEnv('NODE_ENV') === 'production';
export const isTest = checkEnv('NODE_ENV') === 'test';

export const SENTRY_DSN = checkEnv('SENTRY_DSN');

export const jwt = {
  secret: checkEnv('JWT_SECRET'),
  accessExpireIn: checkEnv('JWT_ACCESS_EXPIRE_IN'),
  accessExpireFormat: checkEnv('JWT_ACCESS_EXPIRE_FORMAT'),
  refreshExpireIn: checkEnv('JWT_REFRESH_EXPIRE_IN'),
  refreshExpireFormat: checkEnv('JWT_REFRESH_EXPIRE_FORMAT'),
  resetPasswordExpireIn: checkEnv('JWT_RESET_PASSWORD_EXPIRE_IN'),
  resetPasswordExpireFormat: checkEnv('JWT_RESET_PASSWORD_EXPIRE_FORMAT'),
};

export const AWS_ACCESS_KEY_ID = checkEnv('AWS_ACCESS_KEY_ID');
export const AWS_SECRET_ACCESS_KEY = checkEnv('AWS_SECRET_ACCESS_KEY');
export const REGION = checkEnv('REGION');
export const BUCKET = checkEnv('BUCKET');

export const SUPER_ADMIN_EMAIL = checkEnv('SUPER_ADMIN_EMAIL');
export const SUPER_ADMIN_PASSWORD = checkEnv('SUPER_ADMIN_PASSWORD');
export const SUPER_ADMIN_FULL_NAME = checkEnv('SUPER_ADMIN_FULL_NAME');
export const SUPER_ADMIN_PHONE = checkEnv('SUPER_ADMIN_PHONE');
export const SUPER_ADMIN_GENDER = checkEnv('SUPER_ADMIN_GENDER');
export const SUPER_ADMIN_DOB = checkEnv('SUPER_ADMIN_DOB');

export * from './passport';
