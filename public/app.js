const findUserBTN = document.querySelector("#findUser");
const result = document.querySelector("#results");
const userIdInput = document.querySelector('[name= "getUser"]');

// Function used to reset the the user-form.
function resetUser() {
  const form = document.getElementById("user-form");
  form.reset();
}

// Function used to reset the the workout-form.
function resetWorkout() {
  const form = document.getElementById("workout-form");
  form.reset();
}

// Have an event listener that updates the "input" for userid.
let userid = "";
userIdInput.addEventListener("change", () => {
  userid = userIdInput.value;
});

// FIND USER
findUserBTN.addEventListener("click", () => {
  event.preventDefault();
  result.innerHTML = "";
  // If userid is empty it returns all users.
  if (userid === "") {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          let data = element;
          //Function created to create divs with the information pulled.
          createUserDiv(data);
        });
      });
  } else {
    fetch(`/api/users/${userid}`)
      .then((response) => response.json())
      .then((data) => {
        //If username doesnt exist it creates an error response
        if (data.length === 0) {
          const errorDiv = document.createElement("div");
          errorDiv.setAttribute("id", "errorDiv");
          const error = document.createElement("span");
          error.innerText = `Username does not exist! 
          Please input existing username.`;
          result.append(errorDiv);
          errorDiv.append(error);
          resetUser();
          userid = "";
        } else {
          //If username does exist it creates a div with their information.
          data.forEach((element) => {
            let data = element;
            createUserDiv(data);

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

// Have an event listener that updates the "input" for username.
let delUser = "";
delUserInput.addEventListener("change", () => {
  delUser = delUserInput.value;
});

delUserBTN.addEventListener("click", () => {
  event.preventDefault();
  result.innerHTML = "";
  fetch(`/api/users/${delUser}`, { method: "DELETE" }).then((response) => {
    //If username doesnt exist it creates an error response
    if (response.status === 404) {
      const errorDiv = document.createElement("div");
      errorDiv.setAttribute("id", "errorDiv");
      const error = document.createElement("span");
      error.innerText = `Username does not exist! 
      Please input existing username.`;
      result.append(errorDiv);
      errorDiv.append(error);
      console.log("User does not exist");
      resetUser();
      delUser = "";
    } else {
      //If username does exist it creates div with their information.
      response.json().then((data) => {
        createUserDiv(data);
        resetUser();
        delUser = "";
      });
    }
  });
});

// Create user
//Gather all the inputs
const usernameInput = document.querySelector('[name="createUsername"]');
const nameInput = document.querySelector('[name= "createName"]');
const weightInput = document.querySelector('[name= "createWeight"]');
const sexInput = document.querySelector('[name= "createSex"]');
const ageInput = document.querySelector('[name= "createAge"]');
const newUserBTN = document.querySelector("#newUser");

let username = "";
let name = "";
let weight = "";
let sex = "";
let age = "";

// Have an event listener that updates the "input".
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
  //Specify POST request and headers.
  const requestUser = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Takes our inputs and passes it into the body.
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
    //If error it creates an error response
    if (response.status === 400) {
      const errorDiv = document.createElement("div");
      errorDiv.setAttribute("id", "errorDiv");
      const error = document.createElement("span");
      error.innerText = `Please fill out each input correctly!
      Example Username: GetSwole  Name: John  Weight: 999lbs  Sex: Male  Age: 1.`;
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
        //Creates div with their information.
        createUserDiv(data);
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
//Gathers all the input
const updateusername = document.querySelector('[name="updateUsername"]');
const updatename = document.querySelector('[name= "updateName"]');
const updateweight = document.querySelector('[name= "updateWeight"]');
const updatesex = document.querySelector('[name= "updateSex"]');
const updateage = document.querySelector('[name= "updateAge"]');
const updateUserBTN = document.querySelector("#updateUser");

let updatedusername = "";
let updatedname = "";
let updatedweight = "";
let updatedsex = "";
let updatedage = "";

// Have event listener to update "input change".
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
  //If error it creates an error response.
  if (updatedusername === "") {
    const errorDiv = document.createElement("div");
    errorDiv.setAttribute("id", "errorDiv");
    const error = document.createElement("span");
    error.innerText = `Please fill out username and what input you would like updated!
    Example Username: GetSwole  Weight: 998lbs.`;
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
    // Checks to see if any of the information is left blank.
    updatedname === "" ||
    updatedweight === "" ||
    updatedsex === "" ||
    updatedage === ""
  ) {
    fetch(`/api/users/${updatedusername}`)
      // If left blank pulls old info and reuses it.
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
          //Specifies PATCH request and header
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
              //If username does exist it updates div with their information.
              createUserDiv(data);
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
    //Checks to see if input is empty. If empty returns all stored workouts
    fetch("/api/workouts")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          //Creates div for all info
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
            //Creates divs for specific username.
            let data = element;
            createWorkoutDiv(data);
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
          //Creates div of workout.
          createWorkoutDiv(data);
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
  //Specify POST
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

//Function to create User div inorder to somewhat shorten code.
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

// Have the user input show when User clicked.(Toggle)
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

// WORKING OR TRASHED
///////Update workout
//*Keeps updating all workouts that belong to that user instead of one since in a forEach loop.

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
          const old = {
            name: updatedWOname,
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
              if (old.name === "") {
                old.name = element.name;
              }

              if (old.weight === "") {
                old.weight = element.weight;
              }

              if (old.sets === "") {
                old.sets = element.sets;
              }

              if (old.reps === "") {
                old.reps = element.reps;
              }

              if (old.name === "") {
                old.name = element.name;
              }
            }
          }
          console.log(old);
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
              console.log(data);
              createWorkoutDiv(data);
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
  }
});
