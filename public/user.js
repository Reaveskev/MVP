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
