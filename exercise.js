// Find lifts
//change   const findWorkoutBTN = document.querySelector("#findWorkout");
const workoutInput = document.querySelector('[name="createWOName"]');

// have event listener on "input change" for Workoutid.
let WOname = "";
workoutInput.addEventListener("change", () => {
  WOname = workoutInput.value;
});

//FIND workout

newWorkoutBTN.addEventListener("click", () => {
  fetch(`/api/lifts/${WOname}`).then((response) => {
    if (response.status === 400) {
      const errorDiv = document.createElement("div");
      errorDiv.setAttribute("id", "errorDiv");
      const error = document.createElement("span");
      error.innerText = `Workout Name does not exist!
          Please enter a valid NAme or create new workout`;
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
        let muscle_group = data.muscle_group;
        let example = data.example;
        let tips = data.tips;

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
              const workoutdiv = document.createElement("div");
              workoutdiv.setAttribute("id", "workdiv");

              const header = document.createElement("h3");
              header.innerText = data.name;

              const weightSpan = document.createElement("span");
              const setsSpan = document.createElement("span");
              const repsSpan = document.createElement("span");
              const muscle_groupSpan = document.createElement("span");
              const exampleSpan = document.createElement("span");
              const workout_idSpan = document.createElement("span");
              weightSpan.innerText = `Weight: ${data.weight} `;
              setsSpan.innerText = `Sets: ${data.sets} `;
              repsSpan.innerText = `Reps: ${data.reps} `;
              muscle_groupSpan.innerText = `Muscle Group: ${data.weight} `;
              exampleSpan.innerText = `Example: ${data.sets} `;

              workout_idSpan.innerText = `Id: ${data.workout_id} `;
              result.append(workoutdiv);
              workoutdiv.append(header);
              workoutdiv.append(weightSpan);
              workoutdiv.append(setsSpan);
              workoutdiv.append(repsSpan);
              workoutdiv.append(muscle_groupSpan);
              workoutdiv.append(exampleSpan);
              if (data.tips.length !== 0) {
                const tipsSpan = document.createElement("span");
                tipsSpan.innerText = `Tips: ${data.reps} `;
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

// Create lift
// const workoutInput = document.querySelector('[name="createWOName"]');
// const WOweightInput = document.querySelector('[name= "createWOWeight"]');
// const setdInput = document.querySelector('[name= "createSets"]');
// const repsInput = document.querySelector('[name= "createReps"]');
// const usernameWOInput = document.querySelector('[name= "usernameWO"]');
// const newWorkoutBTN = document.querySelector("#newWorkout");
// // have event listener on "input change".
// let WOname = "";
// let WOweight = "";
// let sets = "";
// let reps = "";
// let WOusername = "";
// workoutInput.addEventListener("change", () => {
//   WOname = workoutInput.value;
// });
// WOweightInput.addEventListener("change", () => {
//   WOweight = WOweightInput.value;
// });
// setdInput.addEventListener("change", () => {
//   sets = Number(setdInput.value);
// });
// repsInput.addEventListener("change", () => {
//   reps = Number(repsInput.value);
// });
// usernameWOInput.addEventListener("change", () => {
//   WOusername = usernameWOInput.value;
// });

// newWorkoutBTN.addEventListener("click", () => {
//   //Specify POST
//   const requestUser = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: WOname,
//       weight: WOweight,
//       sets: sets,
//       reps: reps,
//       username: WOusername,
//     }),
//   };
//   event.preventDefault();
//   result.innerHTML = "";
//   fetch(`/api/workouts/`, requestUser).then((response) => {
//     //If error it creates an error response.
//     if (response.status === 400) {
//       const errorDiv = document.createElement("div");
//       errorDiv.setAttribute("id", "errorDiv");
//       const error = document.createElement("span");
//       error.innerText = `Please fill out each input correctly!
//         Example Name: Bench  Weight: 300lbs  Sets: 5  Reps: 1 Username: GetSwole.`;
//       result.append(errorDiv);
//       errorDiv.append(error);
//       resetWorkout();
//       WOname = "";
//       WOweight = "";
//       sets = "";
//       reps = "";
//       WOusername = "";
//       console.log("Please fill out each input!");
//     } else {
//       response.json().then((data) => {
//         //Creates div for new lift.
//         createWorkoutDiv(data);
//         resetWorkout();
//         WOname = "";
//         WOweight = "";
//         sets = "";
//         reps = "";
//         WOusername = "";
//       });
//     }
//   });
// });
