import "./ProjectDetails.css";
import amber from "../images/amber.svg";
import red from "../images/red.svg";
import green from "../images/green.svg";

export default function Indicator({
  projects,
  projectConcerns,
  projectTeamComposition,
  projectUpdates,
}) {
  return (
    <div>
      <div className="row mb-3">
        <div className="col col-sm-12 col-md-6 col-lg-4">
          <div className="card color-this shadow p-3 mb-5 rounded">
            <div className="card-body">
              <h5 className="card-title">Project Fitness Indicator</h5>
              <p className="card-text">
                Fitness indicator shows the status of a project
              </p>

              {projectUpdates.at(-1)?.projectFitnessIndicator === "g" ? (
                <div>
                  <img width="50px" src={green} alt="" />{" "}
                </div>
              ) : (
                <>
                  {projectUpdates.at(-1)?.projectFitnessIndicator === "a" ? (
                    <div>
                      <img width="50px" src={amber} alt="" />
                    </div>
                  ) : (
                    <>
                      {projectUpdates.at(-1)?.projectFitnessIndicator ===
                      "r" ? (
                        <div>
                          <img width="50px" src={red} alt="" />
                        </div>
                      ) : (
                        <h2>Null</h2>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col col-sm-12 col-md-6 col-lg-4">
          <div className="card color-this shadow p-3 mb-5 rounded">
            <div className="card-body">
              <h5 className="card-title">Concerns Indicator</h5>
              <p className="card-text">
                Concerns indicator the number of concerns for a project
              </p>
              <h2>
                {projectConcerns?.length > 0 ? projectConcerns?.length : 0}
              </h2>
            </div>
          </div>
        </div>
        <div className="col col-sm-12 col-md-6 col-lg-4">
          <div className="card shadow p-3 mb-5 color-this rounded">
            <div className="card-body">
              <h5 className="card-title">Team Members</h5>
              <p className="card-text">
                Team members shows the count of billed members for a project
              </p>
              <h2>
                {projectTeamComposition?.length > 0
                  ? projectTeamComposition?.length
                  : 0}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
