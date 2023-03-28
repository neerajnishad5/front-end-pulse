import Table from "react-bootstrap/Table";

export default function SpecialUser() {
  return (
    <div>
      <div>
        <h1>All projects</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Project Name</th>
              <th>Client Name</th>
              <th>Client Account Manager</th>
              <th>Project Status</th>
              <th>Project Start Date</th>
              <th>Project End Date</th>
              <th>Project Domain</th>
              <th>Project Manager ID</th>
              <th>GDO ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

//      "projectId": 5,
//     "projectName": "xyz project",
//     "clientName": "west agile labs",
//     "clientAccountManager": "sarthak",
//     "projectStatus": "running",
//     "projectStartDate": "2023-03-14",
//     "projectEndDate": "2023-04-22",
//     "projectFitnessIndicator": "G",
//     "projectDomain": "devops",
//     "projectType": "backend",
//     "gdoId": 3,
//     "projectManager": 1
