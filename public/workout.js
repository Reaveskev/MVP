// const result = document.querySelector("#results");

// Find Workouts
const findWorkoutBTN = document.querySelector("#findWorkout");
const workoutIdInput = document.querySelector('[name= "getWorkout"]');

// have event listener on "input change" for Workoutid.
let workoutid = "";
workoutIdInput.addEventListener("change", () => {
  workoutid = workoutIdInput.value;
});

//FIND workout
findWorkoutBTN.addEventListener("click", () => {
  event.preventDefault();
  result.innerHTML = "";
  if (workoutid === "") {
    //Checks to see if input is empty. If empty returns all stored workouts
    fetch("/api/workouts")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          //Creates div for all info
          fetch(`/api/lifts/${element.name}`).then((response) => {
            if (response.status === 400) {
              console.log("Oh no!");
            } else {
              response.json().then((info) => {
                let muscle_group = "";
                let example = "";
                let tips = "";
                info.forEach((pls) => {
                  if (element.name === pls.name) {
                    muscle_group = pls.muscle_group;
                    example = pls.example;
                    tips = pls.tips;
                  }
                });
                const workoutdiv = document.createElement("div");
                workoutdiv.setAttribute("id", "workdiv");

                const header = document.createElement("h3");
                header.innerText = element.name;

                const weightSpan = document.createElement("span");
                const setsSpan = document.createElement("span");
                const repsSpan = document.createElement("span");
                const muscle_groupSpan = document.createElement("span");
                const exampleSpan = document.createElement("img");
                exampleSpan.setAttribute("id", "gif");
                const workout_idSpan = document.createElement("span");
                weightSpan.innerText = `Weight: ${element.weight} `;
                setsSpan.innerText = `Sets: ${element.sets} `;
                repsSpan.innerText = `Reps: ${element.reps} `;
                muscle_groupSpan.innerText = `Muscle Group: ${muscle_group} `;
                exampleSpan.innerText = "example:";
                exampleSpan.src = `${example} `;

                workout_idSpan.innerText = `Id: ${element.workout_id} `;
                result.append(workoutdiv);
                workoutdiv.append(header);
                workoutdiv.append(muscle_groupSpan);
                workoutdiv.append(weightSpan);
                workoutdiv.append(setsSpan);
                workoutdiv.append(repsSpan);
                workoutdiv.append(exampleSpan);
                if (tips !== "") {
                  const tipsSpan = document.createElement("span");
                  tipsSpan.innerText = `Tips: ${tips} `;
                  workoutdiv.append(tipsSpan);
                }
                workoutdiv.append(workout_idSpan);

                //////If no username inputted when displaying all workouts it distguinish if male or female
                const username = element.username;
                fetch(`/api/users/${username}`)
                  .then((response) => response.json())
                  .then((data) => {
                    data.forEach((element) => {
                      const em = document.createElement("em");
                      em.innerText = `Gender: ${element.sex}`;
                      workoutdiv.append(em);
                    });
                  });
              });
            }
          });
        });
      });
  } else {
    fetch(`/api/workouts/${workoutid}`)
      .then((response) => response.json())
      .then((data) => {
        //If error it creates an error response.
        if (data.length === 0) {
          const errorDiv = document.createElement("div");
          errorDiv.setAttribute("id", "errorDiv");
          const error = document.createElement("span");
          error.innerText = `Username does not exist! 
          Please input existing username.`;
          result.append(errorDiv);
          resetWorkout();
          workoutid = "";
          errorDiv.append(error);
        } else {
          data.forEach((element) => {
            fetch(`/api/lifts/${element.name}`).then((response) => {
              if (response.status === 400) {
                console.log("Oh no!");
              } else {
                response.json().then((info) => {
                  let muscle_group = "";
                  let example = "";
                  let tips = "";
                  info.forEach((pls) => {
                    if (element.name === pls.name) {
                      muscle_group = pls.muscle_group;
                      example = pls.example;
                      tips = pls.tips;
                    }
                  });
                  const workoutdiv = document.createElement("div");
                  workoutdiv.setAttribute("id", "workdiv");

                  const header = document.createElement("h3");
                  header.innerText = element.name;

                  const weightSpan = document.createElement("span");
                  const setsSpan = document.createElement("span");
                  const repsSpan = document.createElement("span");
                  const muscle_groupSpan = document.createElement("span");
                  const exampleSpan = document.createElement("img");
                  exampleSpan.setAttribute("id", "gif");
                  const workout_idSpan = document.createElement("span");
                  weightSpan.innerText = `Weight: ${element.weight} `;
                  setsSpan.innerText = `Sets: ${element.sets} `;
                  repsSpan.innerText = `Reps: ${element.reps} `;
                  muscle_groupSpan.innerText = `Muscle Group: ${muscle_group} `;
                  exampleSpan.src = `${example} `;

                  workout_idSpan.innerText = `Id: ${element.workout_id} `;
                  result.append(workoutdiv);
                  workoutdiv.append(header);
                  workoutdiv.append(muscle_groupSpan);
                  workoutdiv.append(weightSpan);
                  workoutdiv.append(setsSpan);
                  workoutdiv.append(repsSpan);
                  workoutdiv.append(exampleSpan);
                  if (tips !== "") {
                    const tipsSpan = document.createElement("span");
                    tipsSpan.innerText = `Tips: ${tips} `;
                    workoutdiv.append(tipsSpan);
                  }
                  workoutdiv.append(workout_idSpan);
                  //Creates divs for specific username.
                  resetWorkout();
                  workoutid = "";
                });
              }
            });
          });
        }
      });
  }
});

//Delete workout
const delworkoutInput = document.querySelector('[name= "deleteWorkout"]');
const delWorkoutBTN = document.querySelector("#delWorkout");

// have event listener on "input change".
let delworkout = "";
delworkoutInput.addEventListener("change", () => {
  delworkout = delworkoutInput.value;
});

delWorkoutBTN.addEventListener("click", () => {
  event.preventDefault();
  result.innerHTML = "";
  fetch(`/api/workouts/${delworkout}`, { method: "DELETE" }).then(
    (response) => {
      //If error it creates an error response.
      if (response.status === 404) {
        const errorDiv = document.createElement("div");
        errorDiv.setAttribute("id", "errorDiv");
        const error = document.createElement("span");
        error.innerText = `Please input valid Workout id!
        You can find the Workout id by searching your username under workouts and finding the correlating workout id.`;
        result.append(errorDiv);
        errorDiv.append(error);
        resetWorkout();
        delworkout = "";
        console.log("Please input valid Workout_id!");
      } else {
        response.json().then((data) => {
          const workoutdiv = document.createElement("div");
          workoutdiv.setAttribute("id", "workdiv");

          const header = document.createElement("h3");
          header.innerText = data.name;

          const weightSpan = document.createElement("span");
          const setsSpan = document.createElement("span");
          const repsSpan = document.createElement("span");
          const workout_idSpan = document.createElement("span");
          weightSpan.innerText = `Weight: ${data.weight} `;
          setsSpan.innerText = `Sets: ${data.sets} `;
          repsSpan.innerText = `Reps: ${data.reps} `;
          workout_idSpan.innerText = `Id: ${data.workout_id} `;

          fetch(`/api/lifts/${data.name}`).then((response) => {
            //If error it creates an error response.
            if (response.status === 400) {
              console.log("Oh no!");
            } else {
              response.json().then((info) => {
                let muscle_group = "";
                let example = "";
                let tips = "";
                info.forEach((pls) => {
                  muscle_group = pls.muscle_group;
                  example = pls.example;
                  tips = pls.tips;
                });

                const muscle_groupSpan = document.createElement("span");
                const exampleSpan = document.createElement("img");
                exampleSpan.setAttribute("id", "gif");

                muscle_groupSpan.innerText = `Muscle Group: ${muscle_group} `;
                exampleSpan.src = `${example} `;

                result.append(workoutdiv);
                workoutdiv.append(header);
                workoutdiv.append(muscle_groupSpan);
                workoutdiv.append(weightSpan);
                workoutdiv.append(setsSpan);
                workoutdiv.append(repsSpan);
                workoutdiv.append(exampleSpan);
                if (tips !== "") {
                  const tipsSpan = document.createElement("span");
                  tipsSpan.innerText = `Tips: ${tips} `;
                  workoutdiv.append(tipsSpan);
                }
                workoutdiv.append(workout_idSpan);
                //Creates divs for specific username.
                resetWorkout();
                workoutid = "";
              });
            }

            //Creates div of workout.
            // createWorkoutDiv(data);
            // resetWorkout();
            // delworkout = "";
          });
        });
      }
    }
  );
});

// Create workout
const workoutInput = document.querySelector('[name="createWOName"]');
const WOweightInput = document.querySelector('[name= "createWOWeight"]');
const setdInput = document.querySelector('[name= "createSets"]');
const repsInput = document.querySelector('[name= "createReps"]');
const usernameWOInput = document.querySelector('[name= "usernameWO"]');
const newWorkoutBTN = document.querySelector("#newWorkout");
// have event listener on "input change".
let WOname = "";
let WOweight = "";
let sets = "";
let reps = "";
let WOusername = "";
workoutInput.addEventListener("change", () => {
  WOname = workoutInput.value;
});
WOweightInput.addEventListener("change", () => {
  WOweight = WOweightInput.value;
});
setdInput.addEventListener("change", () => {
  sets = Number(setdInput.value);
});
repsInput.addEventListener("change", () => {
  reps = Number(repsInput.value);
});
usernameWOInput.addEventListener("change", () => {
  WOusername = usernameWOInput.value;
});

newWorkoutBTN.addEventListener("click", () => {
  event.preventDefault();
  result.innerHTML = "";
  fetch(`/api/lifts/${WOname}`).then((response) => {
    if (response.status === 400) {
      const errorDiv = document.createElement("div");
      errorDiv.setAttribute("id", "errorDiv");
      const error = document.createElement("span");
      error.innerText = `Workout Name does not exist!
        Please enter a valid Name or create new workout`;
      result.append(errorDiv);
      errorDiv.append(error);
      resetWorkout();
      WOname = "";
      WOweight = "";
      sets = "";
      reps = "";
      WOusername = "";
      console.log("Workout Name does not exist!");
    } else {
      response.json().then((data) => {
        let muscle_group = "";
        let example = "";
        let tips = "";
        data.forEach((info) => {
          muscle_group = info.muscle_group;
          example = info.example;
          tips = info.tips;
        });
        //Specify POST
        const requestUser = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: WOname,
            muscle_group: muscle_group,
            weight: WOweight,
            sets: sets,
            reps: reps,
            username: WOusername,
            example: example,
            tips: tips,
          }),
        };
        fetch(`/api/workouts/`, requestUser).then((response) => {
          //If error it creates an error response.
          if (response.status === 400) {
            const errorDiv = document.createElement("div");
            errorDiv.setAttribute("id", "errorDiv");
            const error = document.createElement("span");
            error.innerText = `Please fill out each input correctly!
        Example Name: Bench  Weight: 300lbs  Sets: 5  Reps: 1 Username: GetSwole.`;
            result.append(errorDiv);
            errorDiv.append(error);
            resetWorkout();
            WOname = "";
            WOweight = "";
            sets = "";
            reps = "";
            WOusername = "";
            console.log("Please fill out each input!");
          } else {
            response.json().then((data) => {
              //Creates div for new workout.
              const workoutdiv = document.createElement("div");
              workoutdiv.setAttribute("id", "workdiv");

              const header = document.createElement("h3");
              header.innerText = data.name;

              const weightSpan = document.createElement("span");
              const setsSpan = document.createElement("span");
              const repsSpan = document.createElement("span");
              const muscle_groupSpan = document.createElement("span");
              const exampleSpan = document.createElement("img");
              exampleSpan.setAttribute("id", "gif");
              const workout_idSpan = document.createElement("span");
              weightSpan.innerText = `Weight: ${data.weight} `;
              setsSpan.innerText = `Sets: ${data.sets} `;
              repsSpan.innerText = `Reps: ${data.reps} `;
              muscle_groupSpan.innerText = `Muscle Group: ${muscle_group} `;
              exampleSpan.src = `${example}`;
              workout_idSpan.innerText = `Id: ${data.workout_id} `;
              result.append(workoutdiv);
              workoutdiv.append(header);
              workoutdiv.append(muscle_groupSpan);
              workoutdiv.append(weightSpan);
              workoutdiv.append(setsSpan);
              workoutdiv.append(repsSpan);
              workoutdiv.append(exampleSpan);
              if (data !== "") {
                const tipsSpan = document.createElement("span");
                tipsSpan.innerText = `Tips: ${tips} `;
                workoutdiv.append(tipsSpan);
              }
              workoutdiv.append(workout_idSpan);
              resetWorkout();
              WOname = "";
              WOweight = "";
              sets = "";
              reps = "";
              WOusername = "";
            });
          }
        });
      });
    }
  });
});

///////Update workout

const updateWOname = document.querySelector('[name="updateWOName"]');
const updateWOweight = document.querySelector('[name= "updateWOWeight"]');
const updatesets = document.querySelector('[name= "updateSets"]');
const updatereps = document.querySelector('[name= "updateReps"]');
const updateWOusername = document.querySelector('[name= "UpdateUsernameWO"]');
const updateWOid = document.querySelector('[name= "WOid"]');
const updateWorkoutBTN = document.querySelector("#updateWorkout");

// have event listener on "input change".
let updatedWOname = "";
let updatedWOweight = "";
let updatedsets = "";
let updatedreps = "";
let WOid = "";
let UWOusername = "";

updateWOname.addEventListener("change", () => {
  updatedWOname = updateWOname.value;
});
updateWOweight.addEventListener("change", () => {
  updatedWOweight = updateWOweight.value;
});
updatesets.addEventListener("change", () => {
  updatedsets = Number(updatesets.value);
});
updatereps.addEventListener("change", () => {
  updatedreps = Number(updatereps.value);
});
updateWOid.addEventListener("change", () => {
  WOid = Number(updateWOid.value);
});
updateWOusername.addEventListener("change", () => {
  UWOusername = updateWOusername.value;
});

updateWorkoutBTN.addEventListener("click", () => {
  event.preventDefault();
  result.innerHTML = "";
  //Make sure they put in a username and workout_id.
  if (UWOusername === "" || WOid === "") {
    const errorDiv = document.createElement("div");
    errorDiv.setAttribute("id", "errorDiv");
    const error = document.createElement("span");
    error.innerText = `Please input valid username and workout Id!`;
    result.append(errorDiv);
    errorDiv.append(error);
    resetWorkout();
    updatedWOname = "";
    updatedWOweight = "";
    updatedsets = "";
    updatedreps = "";
    WOid = "";
    UWOusername = "";
  }
  // If anything is left blank do a get request to populate with old information.
  if (
    updatedWOname === "" ||
    updatedWOweight === "" ||
    updatedsets === "" ||
    updatedreps === ""
  ) {
    fetch(`/api/workouts/${UWOusername}`).then((response) => {
      if (response.status === 400) {
        const errorDiv = document.createElement("div");
        errorDiv.setAttribute("id", "errorDiv");
        const error = document.createElement("span");
        error.innerText = `Error 2`;
        result.append(errorDiv);
        errorDiv.append(error);
        resetWorkout();
        updatedWOname = "";
        updatedWOweight = "";
        updatedsets = "";
        updatedreps = "";
        WOid = "";
        UWOusername = "";
      } else {
        response.json().then((data) => {
          let old1 = {
            name: updatedWOname,
          };
          let old2 = {
            weight: updatedWOweight,
            sets: updatedsets,
            reps: updatedreps,
            username: UWOusername,
            workout_id: WOid,
          };

          for (const element of data) {
            if (WOid !== element.workout_id) {
              continue;
            }
            {
              if (old1.name === "") {
                old1.name = element.name;
              }

              if (old2.weight === "") {
                old2.weight = element.weight;
              }

              if (old2.sets === "") {
                old2.sets = element.sets;
              }

              if (old2.reps === "") {
                old2.reps = element.reps;
              }

              if (old2.name === "") {
                old2.name = element.name;
              }
            }
          }
          fetch(`/api/lifts/${updatedWOname}`).then((response) => {
            if (response.status === 400) {
              const errorDiv = document.createElement("div");
              errorDiv.setAttribute("id", "errorDiv");
              const error = document.createElement("span");
              error.innerText = `Workout Name does not exist!
                Please enter a valid Name or create new workout`;
              result.append(errorDiv);
              errorDiv.append(error);
              resetWorkout();
              // updatedWOname = "";
              // updatedWOweight = "";
              // updatedsets = "";
              // updatedreps = "";
              // WOid = "";
              // UWOusername = "";
              console.log("Workout Name does not exist!");
            } else {
              response.json().then((data) => {
                let muscle_group = "";
                let example = "";
                let tips = "";
                data.forEach((info) => {
                  muscle_group = info.muscle_group;
                  example = info.example;
                  tips = info.tips;
                });

                let old = {
                  ...old1,
                  muscle_group: muscle_group,
                  ...old2,
                  example: example,
                  tips: tips,
                };

                const requestUser = {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(old),
                };
                fetch(`/api/workouts/${WOid}`, requestUser)
                  .then((response) => response.json())
                  .then((data) => {
                    const workoutdiv = document.createElement("div");
                    workoutdiv.setAttribute("id", "workdiv");

                    const header = document.createElement("h3");
                    header.innerText = data.name;

                    const weightSpan = document.createElement("span");
                    const setsSpan = document.createElement("span");
                    const repsSpan = document.createElement("span");
                    const muscle_groupSpan = document.createElement("span");
                    const exampleSpan = document.createElement("img");
                    exampleSpan.setAttribute("id", "gif");
                    const workout_idSpan = document.createElement("span");
                    weightSpan.innerText = `Weight: ${data.weight} `;
                    setsSpan.innerText = `Sets: ${data.sets} `;
                    repsSpan.innerText = `Reps: ${data.reps} `;
                    muscle_groupSpan.innerText = `Muscle Group: ${muscle_group} `;
                    exampleSpan.src = `${example}`;
                    workout_idSpan.innerText = `Id: ${data.workout_id} `;
                    result.append(workoutdiv);
                    workoutdiv.append(header);
                    workoutdiv.append(muscle_groupSpan);
                    workoutdiv.append(weightSpan);
                    workoutdiv.append(setsSpan);
                    workoutdiv.append(repsSpan);
                    workoutdiv.append(exampleSpan);
                    if (data !== "") {
                      const tipsSpan = document.createElement("span");
                      tipsSpan.innerText = `Tips: ${tips} `;
                      workoutdiv.append(tipsSpan);
                    }
                    workoutdiv.append(workout_idSpan);
                    resetWorkout();
                    updatedWOname = "";
                    updatedWOweight = "";
                    updatedsets = "";
                    updatedreps = "";
                    WOid = "";
                    UWOusername = "";
                  });
              });
            }
          });
        });
      }
    });
  }
});

///////Search through workouts
const lifts = document.querySelector('[name= "lifts"]');
const findLiftsBTN = document.querySelector("#findLifts");
// have event listener on "input change".
let lift = "";

lifts.addEventListener("input", () => {
  lift = lifts.value;
  result.innerHTML = "";
  fetch(`/api/lifts/${lift}`)
    .then((response) => response.json())
    .then((data) => {
      //If username doesnt exist it creates an error response

      //If username does exist it creates a div with their information.
      data.forEach((element) => {
        const workoutdiv = document.createElement("div");
        workoutdiv.setAttribute("id", "workdiv");
        const header = document.createElement("h3");
        header.innerText = element.name;
        result.append(workoutdiv);
        workoutdiv.append(header);
      });
    });
});
// lifts.addEventListener("change", () => {
//   lift = "";
//   resetLift();
// });
// lifts.addEventListener("submit", () => {
//   lift = "";
//   resetLift();
//   result.innerHTML = "";
// });

findLiftsBTN.addEventListener("click", () => {
  event.preventDefault();
  result.innerHTML = "";
  // if (lifts === "") {
  //   fetch("/api/lifts")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       data.forEach((element) => {
  //         const workoutdiv = document.createElement("div");
  //         workoutdiv.setAttribute("id", "workdiv");

  //         const header = document.createElement("h3");
  //         header.innerText = element.name;

  //         const muscle_groupSpan = document.createElement("span");
  //         const exampleSpan = document.createElement("img");
  //         exampleSpan.setAttribute("id", "gif");
  //         muscle_groupSpan.innerText = `Muscle Group: ${element.muscle_group} `;
  //         exampleSpan.src = `${element.example} `;

  //         result.append(workoutdiv);
  //         workoutdiv.append(header);
  //         workoutdiv.append(muscle_groupSpan);
  //         workoutdiv.append(exampleSpan);
  //         if (element.tips.length !== 0) {
  //           const tipsSpan = document.createElement("span");
  //           tipsSpan.innerText = `Tips: ${element.tips} `;
  //           workoutdiv.append(tipsSpan);
  //         }
  //         workoutdiv.append(workout_idSpan);
  //         resetLift();
  //         lift = "";
  //         //Function created to create divs with the information pulled.
  //       });
  //     });
  // } else {
  fetch(`/api/lifts/${lift}`)
    .then((response) => response.json())
    .then((data) => {
      //If username doesnt exist it creates an error response
      if (data.length === 0) {
        const errorDiv = document.createElement("div");
        errorDiv.setAttribute("id", "errorDiv");
        const error = document.createElement("span");
        error.innerText = `Workout does not exist! 
        Please input existing workout or add workout.`;
        result.append(errorDiv);
        errorDiv.append(error);
        resetLift();
        userid = "";
      } else {
        //If username does exist it creates a div with their information.
        data.forEach((element) => {
          if (element.name === lift) {
            const workoutdiv = document.createElement("div");
            workoutdiv.setAttribute("id", "workdiv");

            const header = document.createElement("h3");
            header.innerText = element.name;

            const muscle_groupSpan = document.createElement("span");
            const exampleSpan = document.createElement("img");
            exampleSpan.setAttribute("id", "gif");
            muscle_groupSpan.innerText = `Muscle Group: ${element.muscle_group} `;
            exampleSpan.src = `${element.example} `;

            result.append(workoutdiv);
            workoutdiv.append(header);
            workoutdiv.append(muscle_groupSpan);
            workoutdiv.append(exampleSpan);
            if (element.tips !== "") {
              const tipsSpan = document.createElement("span");
              tipsSpan.innerText = `Tips: ${element.tips} `;
              workoutdiv.append(tipsSpan);
            }
            resetLift();
            lift = "";
          } else {
            const workoutdiv = document.createElement("div");
            workoutdiv.setAttribute("id", "workdiv");

            const header = document.createElement("h3");
            header.innerText = element.name;

            const muscle_groupSpan = document.createElement("span");
            const exampleSpan = document.createElement("img");
            exampleSpan.setAttribute("id", "gif");
            muscle_groupSpan.innerText = `Muscle Group: ${element.muscle_group} `;
            exampleSpan.src = `${element.example} `;

            result.append(workoutdiv);
            workoutdiv.append(header);
            workoutdiv.append(muscle_groupSpan);
            workoutdiv.append(exampleSpan);
            if (element.tips !== "") {
              const tipsSpan = document.createElement("span");
              tipsSpan.innerText = `Tips: ${element.tips} `;
              workoutdiv.append(tipsSpan);
            }
            resetLift();
            lift = "";
          }
        });
      }
    });
  // }
});

////Create new lift
const liftNameInput = document.querySelector('[name= "liftName"]');
const muscleGroupInput = document.querySelector('[name= "muscleGroup"]');
const exampleInput = document.querySelector('[name= "Example"]');
const tipsInput = document.querySelector('[name= "Tips"]');
const createLiftBTN = document.querySelector("#createLift");
// have event listener on "input change".
let liftName = "";
let muscleGroup = "";
let example = "";
let tips = "";

liftNameInput.addEventListener("change", () => {
  liftName = liftNameInput.value;
});
muscleGroupInput.addEventListener("change", () => {
  muscleGroup = muscleGroupInput.value;
});
exampleInput.addEventListener("change", () => {
  example = exampleInput.value;
});
tipsInput.addEventListener("change", () => {
  tips = tipsInput.value;
});

createLiftBTN.addEventListener("click", () => {
  event.preventDefault();
  result.innerHTML = "";

  const requestUser = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: liftName,
      muscle_group: muscleGroup,
      example: example,
      tips: tips,
    }),
  };
  fetch(`/api/lifts/`, requestUser).then((response) => {
    //If error it creates an error response.
    if (response.status === 400) {
      const errorDiv = document.createElement("div");
      errorDiv.setAttribute("id", "errorDiv");
      const error = document.createElement("span");
      error.innerText = `Please fill out each input correctly!
Example Name: Bench  Muscle Group: Chest  Example: https://c.tenor.com/yYTpAU5BZGoAAAAC/bench-press.gif Tips: Just Do it!`;
      result.append(errorDiv);
      errorDiv.append(error);
      resetLift();
      liftName = "";
      muscleGroup = "";
      example = "";
      tips = "";
      console.log("Please fill out each input!");
    } else {
      response.json().then((data) => {
        const workoutdiv = document.createElement("div");
        workoutdiv.setAttribute("id", "workdiv");

        const header = document.createElement("h3");
        header.innerText = data.name;

        const muscle_groupSpan = document.createElement("span");
        const exampleSpan = document.createElement("img");
        exampleSpan.setAttribute("id", "gif");
        muscle_groupSpan.innerText = `Muscle Group: ${data.muscle_group} `;
        exampleSpan.src = `${data.example} `;

        result.append(workoutdiv);
        workoutdiv.append(header);
        workoutdiv.append(muscle_groupSpan);
        workoutdiv.append(exampleSpan);
        if (data.tips !== "") {
          const tipsSpan = document.createElement("span");
          tipsSpan.innerText = `Tips: ${data.tips} `;
          workoutdiv.append(tipsSpan);
        }
        resetLift();
        lift = "";
      });
    }
  });
});

//Function to create User div inorder to somewhat shorten code.
function createWorkoutDiv(data) {
  const workoutdiv = document.createElement("div");
  workoutdiv.setAttribute("id", "workdiv");

  const header = document.createElement("h3");
  header.innerText = data.name;

  const weightSpan = document.createElement("span");
  const setsSpan = document.createElement("span");
  const repsSpan = document.createElement("span");
  const workout_idSpan = document.createElement("span");
  weightSpan.innerText = `Weight: ${data.weight} `;
  setsSpan.innerText = `Sets: ${data.sets} `;
  repsSpan.innerText = `Reps: ${data.reps} `;
  workout_idSpan.innerText = `Id: ${data.workout_id} `;

  result.append(workoutdiv);
  workoutdiv.append(header);
  workoutdiv.append(weightSpan);
  workoutdiv.append(setsSpan);
  workoutdiv.append(repsSpan);
  workoutdiv.append(workout_idSpan);
}

//Have the workout input show when workout clicked.(Toggle)
function workoutFunction() {
  var btn = document.getElementById("WorkoutBTN");
  var x = document.getElementById("workoutFormDiv");

  if (x.style.display === "none") {
    x.style.display = "block";
    btn.style.backgroundColor = "#0c1b39";
  } else {
    x.style.display = "none";
    btn.style.backgroundColor = "white";
  }
}
