import dotenv from "dotenv";
dotenv.config();
const env = process.env;

export default {
  port: env.PORT,
  jwt_secret: env.JWT_SECRET,
  jwt_expires:
    env.NODE_ENV == "development" ? env.DEV_JWT_EXPIRES : env.PROD_JWT_EXPIRES,
  refresh_jwt_expires: env.REFRESH_JWT_EXPIRES,
  database_uri:
    env.NODE_ENV == "development" ? env.LOCAL_DATABASE : env.REMOVE_DATABASE,
  database: env.DATABASE,
};
