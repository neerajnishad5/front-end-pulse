import { useSelector } from "react-redux";
import UnassignedUsers from "./UnassignedUsers";
import AssignedUsersList from "./AssignedUsersList";

export default function SuperAdminHome() {
  const data = useSelector((state) => state.login);

  console.log("data state from super admin: ", data);

  const token = sessionStorage.getItem("token");
  console.log("Token from super admin: ", token);

  return (
    <div>
      <div>
        <AssignedUsersList />
        {/* <UnassignedUsers /> */}
      </div>

      {/* <UnassignedUsers /> */}
    </div>
  );
}
