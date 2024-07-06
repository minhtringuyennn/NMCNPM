import * as employee from "./employee.json";
import * as owner from "./owner.json";
import * as user from "./user.json";

export default {
  ...employee,
  ...owner,
  ...user
};
