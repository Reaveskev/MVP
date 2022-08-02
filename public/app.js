const findUserBTN = document.querySelector("#findUser");
const result = document.querySelector("#results");
const userIdInput = document.querySelector('[name= "getUser"]');

function resetUser() {
  const form = document.getElementById("user-form");
  form.reset();
}

function resetWorkout() {
  const form = document.getElementById("workout-form");
  form.reset();
}

// have event listener on "input change" for petid.
let userid = "";

userIdInput.addEventListener("change", () => {
  userid = userIdInput.value;
});

// FIND USER
findUserBTN.addEventListener("click", () => {
  event.preventDefault();
  result.innerHTML = "";
  console.log(userid);
  if (userid === "") {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          let data = element;
          createUserDiv(data);
          // const userDiv = document.createElement("div");
          // userDiv.setAttribute("id", "userDiv");

          // const header = document.createElement("h3");
          // header.innerText = element.username;

          // const nameSpan = document.createElement("span");
          // const weightSpan = document.createElement("span");
          // const sexSpan = document.createElement("span");
          // const ageSpan = document.createElement("span");

          // nameSpan.innerText = `Name: ${element.name} `;
          // weightSpan.innerText = `Weight: ${element.weight} `;
          // sexSpan.innerText = `Sex: ${element.sex} `;
          // ageSpan.innerText = `Age: ${element.age} `;

          // // workoutdiv.innerText = JSON.stringify(element);
          // result.append(userDiv);
          // userDiv.append(header);
          // userDiv.append(nameSpan);
          // userDiv.append(weightSpan);
          // userDiv.append(sexSpan);
          // userDiv.append(ageSpan);
        });
      });
  } else {
    fetch(`/api/users/${userid}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          const errorDiv = document.createElement("div");
          errorDiv.setAttribute("id", "errorDiv");
          const error = document.createElement("span");
          error.innerText = `Username does not exist! 
          Please input existing username`;
          result.append(errorDiv);
          errorDiv.append(error);
          resetUser();
          userid = "";
        } else {
          data.forEach((element) => {
            let data = element;
            createUserDiv(data);
            // const userDiv = document.createElement("div");
            // userDiv.setAttribute("id", "userDiv");

            // const header = document.createElement("h3");
            // header.innerText = element.username;

            // const nameSpan = document.createElement("span");
            // const weightSpan = document.createElement("span");
            // const sexSpan = document.createElement("span");
            // const ageSpan = document.createElement("span");

            // document.createElement("span");
            // weightSpan.innerText = `Weight: ${element.weight} `;
            // sexSpan.innerText = `Sex: ${element.sex} `;
            // ageSpan.innerText = `Age: ${element.age} `;

            // // workoutdiv.innerText = JSON.stringify(element);
            // result.append(userDiv);
            // userDiv.append(header);
            // userDiv.append(nameSpan);
            // userDiv.append(weightSpan);
            // userDiv.append(sexSpan);
            // userDiv.append(ageSpan);
            resetUser();
            userid = "";
          });
        }
      });
  }
});

//Delete User
const delUserInput = document.querySelector('[name= "deleteUser"]');
const delUserBTN = document.querySelector("#delUser");
// have event listener on "input change" for petid.
let delUser = "";

delUserInput.addEventListener("change", () => {
  delUser = delUserInput.value;
});

delUserBTN.addEventListener("click", () => {
  event.preventDefault();
  result.innerHTML = "";
  fetch(`/api/users/${delUser}`, { method: "DELETE" }).then((response) => {
    if (response.status === 404) {
      const errorDiv = document.createElement("div");
      errorDiv.setAttribute("id", "errorDiv");
      const error = document.createElement("span");
      error.innerText = `Username does not exist! 
      Please input existing username`;
      result.append(errorDiv);
      errorDiv.append(error);
      console.log("User does not exist");
      resetUser();
      delUser = "";
    } else {
      response.json().then((data) => {
        createUserDiv(data);
        // const userDiv = document.createElement("div");
        // userDiv.setAttribute("id", "userDiv");

        // const header = document.createElement("h3");
        // header.innerText = `Deleted: ${data.username}`;

        // const nameSpan = document.createElement("span");
        // const weightSpan = document.createElement("span");
        // const sexSpan = document.createElement("span");
        // const ageSpan = document.createElement("span");

        // nameSpan.innerText = `Name: ${data.name} `;
        // weightSpan.innerText = `Weight: ${data.weight} `;
        // sexSpan.innerText = `Sex: ${data.sex} `;
        // ageSpan.innerText = `Age: ${data.age} `;

        // result.append(userDiv);
        // userDiv.append(header);
        // userDiv.append(nameSpan);
        // userDiv.append(weightSpan);
        // userDiv.append(sexSpan);
        // userDiv.append(ageSpan);
        resetUser();
        delUser = "";
      });
    }
  });
});

// Create user

const usernameInput = document.querySelector('[name="createUsername"]');
const nameInput = document.querySelector('[name= "createName"]');
const weightInput = document.querySelector('[name= "createWeight"]');
const sexInput = document.querySelector('[name= "createSex"]');
const ageInput = document.querySelector('[name= "createAge"]');
const newUserBTN = document.querySelector("#newUser");
// have event listener on "input change" for petid.
let username = "";
let name = "";
let weight = "";
let sex = "";
let age = "";

usernameInput.addEventListener("change", () => {
  username = usernameInput.value;
});
nameInput.addEventListener("change", () => {
  name = nameInput.value;
});
weightInput.addEventListener("change", () => {
  weight = weightInput.value;
});
ageInput.addEventListener("change", () => {
  age = Number(ageInput.value);
});
sexInput.addEventListener("change", () => {
  sex = sexInput.value;
});

newUserBTN.addEventListener("click", () => {
  const requestUser = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      name: name,
      weight: weight,
      sex: sex,
      age: age,
    }),
  };
  event.preventDefault();
  result.innerHTML = "";
  fetch(`/api/users/`, requestUser).then((response) => {
    if (response.status === 400) {
      const errorDiv = document.createElement("div");
      errorDiv.setAttribute("id", "errorDiv");
      const error = document.createElement("span");
      error.innerText = `Please fill out each input correctly!
      Example Username: GetSwole  Name: John  Weight: 999lbs  Sex: Male  Age: 1`;
      result.append(errorDiv);
      errorDiv.append(error);
      resetUser();
      username = "";
      name = "";
      weight = "";
      sex = "";
      age = "";
      console.log("Please fill out each input!");
    } else {
      response.json().then((data) => {
        createUserDiv(data);
        // const userDiv = document.createElement("div");
        // userDiv.setAttribute("id", "userDiv");

        // const header = document.createElement("h3");
        // header.innerText = `New User: ${data.username}`;

        // const nameSpan = document.createElement("span");
        // const weightSpan = document.createElement("span");
        // const sexSpan = document.createElement("span");
        // const ageSpan = document.createElement("span");

        // nameSpan.innerText = `Name: ${data.name} `;
        // weightSpan.innerText = `Weight: ${data.weight} `;
        // sexSpan.innerText = `Sex: ${data.sex} `;
        // ageSpan.innerText = `Age: ${data.age} `;

        // result.append(userDiv);
        // userDiv.append(header);
        // userDiv.append(nameSpan);
        // userDiv.append(weightSpan);
        // userDiv.append(sexSpan);
        // userDiv.append(ageSpan);
        resetUser();
        username = "";
        name = "";
        weight = "";
        sex = "";
        age = "";
      });
    }
  });
});

///////Update user

const updateusername = document.querySelector('[name="updateUsername"]');
const updatename = document.querySelector('[name= "updateName"]');
const updateweight = document.querySelector('[name= "updateWeight"]');
const updatesex = document.querySelector('[name= "updateSex"]');
const updateage = document.querySelector('[name= "updateAge"]');
const updateUserBTN = document.querySelector("#updateUser");

// have event listener on "input change".
let updatedusername = "";
let updatedname = "";
let updatedweight = "";
let updatedsex = "";
let updatedage = "";

updateusername.addEventListener("change", () => {
  updatedusername = updateusername.value;
});
updatename.addEventListener("change", () => {
  updatedname = updatename.value;
});
updateweight.addEventListener("change", () => {
  updatedweight = updateweight.value;
});
updateage.addEventListener("change", () => {
  updatedage = Number(updateage.value);
});
updatesex.addEventListener("change", () => {
  updatedsex = updatesex.value;
});

updateUserBTN.addEventListener("click", () => {
  event.preventDefault();
  result.innerHTML = "";
  if (updatedusername === "") {
    const errorDiv = document.createElement("div");
    errorDiv.setAttribute("id", "errorDiv");
    const error = document.createElement("span");
    error.innerText = `Please fill out username and what input you would like updated!
    Example Username: GetSwole  Weight: 998lbs`;
    result.append(errorDiv);
    errorDiv.append(error);
    resetUser();
    updatedusername = "";
    updatedname = "";
    updatedweight = "";
    updatedsex = "";
    updatedage = "";
    console.log("Please fill out each input!");
  } else if (
    updatedname === "" ||
    updatedweight === "" ||
    updatedsex === "" ||
    updatedage === ""
  ) {
    fetch(`/api/users/${updatedusername}`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          if (updatedname === "") {
            updatedname = element.name;
          }

          if (updatedweight === "") {
            updatedweight = element.weight;
          }

          if (updatedsex === "") {
            updatedsex = element.sex;
          }

          if (updatedage === "") {
            updatedage = element.age;
          }
          const requestUser = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: updatedusername,
              name: updatedname,
              weight: updatedweight,
              sex: updatedsex,
              age: updatedage,
            }),
          };
          fetch(`/api/users/${updatedusername}`, requestUser)
            .then((response) => response.json())
            .then((data) => {
              createUserDiv(data);
              // const userDiv = document.createElement("div");
              // userDiv.setAttribute("id", "userDiv");

              // const header = document.createElement("h3");
              // header.innerText = `Updated User: ${data.username}`;

              // const nameSpan = document.createElement("span");
              // const weightSpan = document.createElement("span");
              // const sexSpan = document.createElement("span");
              // const ageSpan = document.createElement("span");

              // nameSpan.innerText = `Name: ${data.name} `;
              // weightSpan.innerText = `Weight: ${data.weight} `;
              // sexSpan.innerText = `Sex: ${data.sex} `;
              // ageSpan.innerText = `Age: ${data.age} `;

              // result.append(userDiv);
              // userDiv.append(header);
              // userDiv.append(nameSpan);
              // userDiv.append(weightSpan);
              // userDiv.append(sexSpan);
              // userDiv.append(ageSpan);
              resetUser();
              updatedusername = "";
              updatedname = "";
              updatedweight = "";
              updatedsex = "";
              updatedage = "";
            });
        });
      });
  }
});

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
    fetch("/api/workouts")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          const workoutdiv = document.createElement("div");
          workoutdiv.setAttribute("id", "workdiv");

          const header = document.createElement("h3");
          header.innerText = element.name;

          const weightSpan = document.createElement("span");
          const setsSpan = document.createElement("span");
          const repsSpan = document.createElement("span");
          weightSpan.innerText = `Weight: ${element.weight} `;
          setsSpan.innerText = `Sets: ${element.sets} `;
          repsSpan.innerText = `Reps: ${element.reps} `;

          result.append(workoutdiv);
          workoutdiv.append(header);
          workoutdiv.append(weightSpan);
          workoutdiv.append(setsSpan);
          workoutdiv.append(repsSpan);

          //////Change to male or female

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
      });
  } else {
    fetch(`/api/workouts/${workoutid}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          const errorDiv = document.createElement("div");
          errorDiv.setAttribute("id", "errorDiv");
          const error = document.createElement("span");
          error.innerText = `Username does not exist! 
          Please input existing username`;
          result.append(errorDiv);
          resetWorkout();
          workoutid = "";
          errorDiv.append(error);
        } else {
          data.forEach((element) => {
            let data = element;
            createWorkoutDiv(data);
            // const workoutdiv = document.createElement("div");
            // workoutdiv.setAttribute("id", "workdiv");

            // const header = document.createElement("h3");
            // header.innerText = element.name;

            // const weightSpan = document.createElement("span");
            // const setsSpan = document.createElement("span");
            // const repsSpan = document.createElement("span");
            // const workout_idSpan = document.createElement("span");
            // weightSpan.innerText = `Weight: ${element.weight} `;
            // setsSpan.innerText = `Sets: ${element.sets} `;
            // repsSpan.innerText = `Reps: ${element.reps} `;
            // workout_idSpan.innerText = `Id: ${element.workout_id} `;

            // result.append(workoutdiv);
            // workoutdiv.append(header);
            // workoutdiv.append(weightSpan);
            // workoutdiv.append(setsSpan);
            // workoutdiv.append(repsSpan);
            // workoutdiv.append(workout_idSpan);
            resetWorkout();
            workoutid = "";
          });
        }
      });
  }
});

//Delete workout
const delworkoutInput = document.querySelector('[name= "deleteWorkout"]');
const delWorkoutBTN = document.querySelector("#delWorkout");
// have event listener on "input change" for petid.
let delworkout = "";

delworkoutInput.addEventListener("change", () => {
  delworkout = delworkoutInput.value;
});

delWorkoutBTN.addEventListener("click", () => {
  event.preventDefault();
  result.innerHTML = "";
  fetch(`/api/workouts/${delworkout}`, { method: "DELETE" }).then(
    (response) => {
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
          createWorkoutDiv(data);
          // const workoutdiv = document.createElement("div");
          // workoutdiv.setAttribute("id", "workdiv");

          // const header = document.createElement("h3");
          // header.innerText = data.name;

          // const weightSpan = document.createElement("span");
          // const setsSpan = document.createElement("span");
          // const repsSpan = document.createElement("span");
          // const workout_idSpan = document.createElement("span");
          // weightSpan.innerText = `Weight: ${data.weight} `;
          // setsSpan.innerText = `Sets: ${data.sets} `;
          // repsSpan.innerText = `Reps: ${data.reps} `;
          // workout_idSpan.innerText = `Id: ${data.workout_id} `;

          // result.append(workoutdiv);
          // workoutdiv.append(header);
          // workoutdiv.append(weightSpan);
          // workoutdiv.append(setsSpan);
          // workoutdiv.append(repsSpan);
          // workoutdiv.append(workout_idSpan);
          resetWorkout();
          delworkout = "";
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
// have event listener on "input change" for petid.
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
  const requestUser = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: WOname,
      weight: WOweight,
      sets: sets,
      reps: reps,
      username: WOusername,
    }),
  };
  event.preventDefault();
  result.innerHTML = "";
  fetch(`/api/workouts/`, requestUser).then((response) => {
    if (response.status === 400) {
      const errorDiv = document.createElement("div");
      errorDiv.setAttribute("id", "errorDiv");
      const error = document.createElement("span");
      error.innerText = `Please fill out each input correctly!
        Example Name: Bench  Weight: 300lbs  Sets: 5  Reps: 1 Username: GetSwole`;
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
        // const workoutdiv = document.createElement("div");
        // workoutdiv.setAttribute("id", "workdiv");

        // const header = document.createElement("h3");
        // header.innerText = data.name;

        // const weightSpan = document.createElement("span");
        // const setsSpan = document.createElement("span");
        // const repsSpan = document.createElement("span");
        // const workout_idSpan = document.createElement("span");
        // weightSpan.innerText = `Weight: ${data.weight} `;
        // setsSpan.innerText = `Sets: ${data.sets} `;
        // repsSpan.innerText = `Reps: ${data.reps} `;
        // workout_idSpan.innerText = `Id: ${data.workout_id} `;

        // result.append(workoutdiv);
        // workoutdiv.append(header);
        // workoutdiv.append(weightSpan);
        // workoutdiv.append(setsSpan);
        // workoutdiv.append(repsSpan);
        // workoutdiv.append(workout_idSpan);
        createWorkoutDiv(data);
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

function createUserDiv(data) {
  const userDiv = document.createElement("div");
  userDiv.setAttribute("id", "userDiv");

  const header = document.createElement("h3");
  header.innerText = `User: ${data.username}`;

  const nameSpan = document.createElement("span");
  const weightSpan = document.createElement("span");
  const sexSpan = document.createElement("span");
  const ageSpan = document.createElement("span");

  nameSpan.innerText = `Name: ${data.name} `;
  weightSpan.innerText = `Weight: ${data.weight} `;
  sexSpan.innerText = `Sex: ${data.sex} `;
  ageSpan.innerText = `Age: ${data.age} `;

  result.append(userDiv);
  userDiv.append(header);
  userDiv.append(nameSpan);
  userDiv.append(weightSpan);
  userDiv.append(sexSpan);
  userDiv.append(ageSpan);
}

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
///////Update workout

// const updateWOname = document.querySelector('[name="updateWOName"]');
// const updateWOweight = document.querySelector('[name= "updateWOWeight"]');
// const updatesets = document.querySelector('[name= "updateSets"]');
// const updatereps = document.querySelector('[name= "updateReps"]');
// const updateWOusername = document.querySelector('[name= "UpdateUsernameWO"]');
// const updateWOid = document.querySelector('[name= "WOid"]');
// const updateWorkoutBTN = document.querySelector("#updateWorkout");

// // have event listener on "input change".
// let updatedWOname = "";
// let updatedWOweight = "";
// let updatedsets = "";
// let updatedreps = "";
// let WOid = "";
// let UWOusername = "";

// updateWOname.addEventListener("change", () => {
//   updatedWOname = updateWOname.value;
// });
// updateWOweight.addEventListener("change", () => {
//   updatedWOweight = updateWOweight.value;
// });
// updatesets.addEventListener("change", () => {
//   updatedsets = Number(updatesets.value);
// });
// updatereps.addEventListener("change", () => {
//   updatedreps = Number(updatereps.value);
// });
// updateWOid.addEventListener("change", () => {
//   WOid = Number(updateWOid.value);
// });
// updateWOusername.addEventListener("change", () => {
//   UWOusername = updateWOusername.value;
// });

// updateWorkoutBTN.addEventListener("click", () => {
//   event.preventDefault();
//   result.innerHTML = "";

//   if (
//     updatedWOname === "" ||
//     updatedWOweight === "" ||
//     updatedsets === "" ||
//     updatedreps === ""
//   ) {
//     fetch(`/api/workouts/${UWOusername}`)
//       .then((response) => response.json())
//       .then((data) => {
//         // data.forEach((element) => {
//         console.log(data);
//         if (updatedWOname === "") {
//           updatedWOname = data[i].name;
//           console.log(updatedWOname);
//         }

//         if (updatedWOweight === "") {
//           updatedWOweight = data[i].weight;
//         }

//         if (updatedsets === "") {
//           updatedsets = data[i].sets;
//         }

//         if (updatedreps === "") {
//           updatedreps = data[i].reps;
//         }

//         // if (WOid === element.workout_id) {

//         // if (updatedWOname === "") {
//         //   updatedWOname = element.name;
//         //   console.log(element.name);
//         // }

//         // if (updatedWOweight === "") {
//         //   updatedWOweight = element.weight;
//         // }

//         // if (updatedsets === "") {
//         //   updatedsets = element.sets;
//         // }

//         // if (updatedreps === "") {
//         //   updatedreps = element.reps;

//         const requestUser = {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: updatedWOname,
//             weight: updatedWOweight,
//             set: updatedsets,
//             reps: updatedreps,
//           }),
//         };

//         console.log("hello3");
//         fetch(`/api/workouts/${UWOusername}`, requestUser)
//           .then((response) => response.json())
//           .then((data) => {
//             const workoutdiv = document.createElement("div");
//             workoutdiv.setAttribute("id", "workdiv");

//             const header = document.createElement("h3");
//             header.innerText = `Updated ${data.name}`;

//             const weightSpan = document.createElement("span");
//             const setsSpan = document.createElement("span");
//             const repsSpan = document.createElement("span");
//             const workout_idSpan = document.createElement("span");
//             weightSpan.innerText = `Weight: ${data.weight} `;
//             setsSpan.innerText = `Sets: ${data.sets} `;
//             repsSpan.innerText = `Reps: ${data.reps} `;
//             workout_idSpan.innerText = `Id: ${WOid} `;

//             result.append(workoutdiv);
//             workoutdiv.append(header);
//             workoutdiv.append(weightSpan);
//             workoutdiv.append(setsSpan);
//             workoutdiv.append(repsSpan);
//             workoutdiv.append(workout_idSpan);
//           });
//       });
//   }
// });

// Have the user input show when User clicked
function userFunction() {
  var btn = document.getElementById("UserBTN");
  var x = document.getElementById("userFormDiv");

  if (x.style.display === "none") {
    x.style.display = "block";
    btn.style.backgroundColor = "#0c1b39";
  } else {
    x.style.display = "none";
    btn.style.backgroundColor = "white";
  }
}

//Have the workout input show when workout clicked
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
