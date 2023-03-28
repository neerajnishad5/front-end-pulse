import axios from "axios";

export default function SuperAdminHome() {
  const token = sessionStorage.getItem("token");
  console.log("Token from super admin: ", token);

  const getUsers = async () => {
    // get users list from users table
    const userList = await axios.get(
      "http://localhost:5000/super-admin/all-users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(userList.data.payload);
    return userList.data.payload;
  };

  return (
    <div>
      <table class="table table-striped border">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Assign role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Akash</td>
            <td>akash@westagilelab.com</td>
            <td>superAdmin</td>
            <button className="btn btn-primary">Assign</button>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
