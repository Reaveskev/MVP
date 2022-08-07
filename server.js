import express from "express";
import pg from "pg";
import dotenv from "dotenv";

// Goes through .env files and sets port and database.
dotenv.config();
const app = express();

// Destructuring
const { DATABASE_URL, NODE_ENV, PORT } = process.env;

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

app.use(express.json());

//Setting default to public
app.use(express.static("public"));

//////////////////////////////
///////////USERS//////////////
//////////////////////////////

// Find all users
app.get("/api/users", (req, res) => {
  pool.query("SELECT * FROM users").then((data) => {
    res.send(data.rows);
  });
});

// Find users by username
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  pool.query("SELECT * FROM users WHERE username = $1", [id]).then((data) => {
    const user = data.rows;
    if (user) {
      res.send(user);
    } else {
      res.status(400).send("User does not exist");
    }
  });
});

//Add new user. Must have name, weight, age has to be a number.
app.post("/api/users", (req, res) => {
  const { username, name, weight, sex, age } = req.body;
  if (typeof age === "number" && weight && name && username && sex) {
    pool
      .query(
        "INSERT INTO users(username, name, weight, sex, age) VALUES($1, $2, $3, $4, $5) RETURNING *;",
        [username, name, weight, sex, age]
      )
      .then((data) => {
        res.status(200);
        res.send(data.rows[0]);
        console.log("New user added!");
      });
  } else {
    res.status(400);
    res.set("Content-Type", "text/plain");
    res.send("Bad Request");
    console.log("Bad Request");
  }
});

// Deletes user at by username.
app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    `DELETE FROM users WHERE username = $1 RETURNING *`,
    [id],
    (err, result) => {
      if (err) {
        res.status(500);
        res.send("Oh no!");
      } else if (result.rows.length === 0) {
        res.status(404);
        res.send("Username does not exist");
      } else {
        res.send(result.rows[0]);
      }
    }
  );
});

// Updates a user by username. Checks to see if username is valid and checks to ensure they are updating atleast one thing.
app.patch("/api/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  const { username, name, weight, sex, age } = req.body;

  if (name) {
    if (typeof name !== "string") {
      res.sendStatus(400);
      res.send("Bad Request");
    }
  }
  if (age) {
    if (typeof age !== "number") {
      res.sendStatus(400);
      res.send("Bad Request");
    }
  }
  if (weight) {
    if (typeof weight !== "string") {
      res.sendStatus(400);
      res.send("Bad Request");
    }
  }
  if (username) {
    if (typeof username !== "string") {
      res.sendStatus(400);
      res.send("Bad Request");
    }
  }
  if (sex) {
    if (typeof sex !== "string") {
      res.sendStatus(400);
      res.send("Bad Request");
    }
  }
  pool
    .query(
      `UPDATE users SET username = COALESCE($1, username), name = COALESCE($2, name), weight = COALESCE($3, weight), sex = COALESCE($4, sex), age = COALESCE($5, age) WHERE username = $6 RETURNING *`,
      [username, name, weight, sex, age, id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(result.rows[0]);
      }
    });
});

///////////////////////////////
///////////WORKOUTS////////////
///////////////////////////////

// Find all workouts
app.get("/api/workouts", (req, res) => {
  pool.query("SELECT * FROM workouts").then((data) => {
    res.send(data.rows);
  });
});

// Find workouts by username
app.get("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query("SELECT * FROM workouts WHERE username = $1", [id])
    .then((data) => {
      const workout = data.rows;
      if (workout) {
        res.send(workout);
      } else {
        res.status(400).send("Workout does not exist");
      }
    });
});

//Add new workout. Must have name, weight, sets, reps, and username. Age has to be a number.
app.post("/api/workouts", (req, res) => {
  const { name, weight, sets, reps, username } = req.body;
  if (
    typeof sets === "number" &&
    weight &&
    name &&
    username &&
    typeof reps === "number"
  ) {
    pool
      .query(
        "INSERT INTO workouts(name, weight, sets, reps, username) VALUES($1, $2, $3, $4, $5) RETURNING *;",
        [name, weight, sets, reps, username]
      )
      .then((data) => {
        res.status(200);
        res.send(data.rows[0]);
        console.log("New workout added!");
      });
  } else {
    res.status(400);
    res.set("Content-Type", "text/plain");
    res.send("Bad Request");
    console.log("Bad Request");
  }
});

// Deletes workout at by id.
app.delete("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query(`DELETE FROM workouts WHERE workout_id = $1 RETURNING *`, [id])
    .then((data) => {
      if (data.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(data.rows[0]);
      }
    });
});

// Adds console log to show that the port is running.
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// Updates a workout by id. Checks to see if id is valid and checks to ensure they are updating atleast one thing.
app.patch("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  const { name, weight, sets, reps, username, workout_id } = req.body;
  // if (Number.isNaN(id)) {
  //   res.status(400).send(`Invalid id given :"${req.params.id}"`);
  // }
  if (name) {
    if (typeof name !== "string") {
      res.sendStatus(400);
      res.send("Bad Request");
    }
  }
  if (weight) {
    if (typeof weight !== "string") {
      res.sendStatus(400);
      res.send("Bad Request");
    }
  }
  if (sets) {
    if (typeof sets !== "number") {
      res.sendStatus(400);
      res.send("Bad Request");
    }
  }
  if (reps) {
    if (typeof reps !== "number") {
      res.sendStatus(400);
      res.send("Bad Request");
    }
  }
  if (username === "") {
    res.sendStatus(400);
    res.send("Bad Request");
  }
  if (workout_id === "") {
    res.sendStatus(400);
    res.send("Bad Request");
  }
  pool
    .query(
      `UPDATE workouts SET name = COALESCE($1, name), weight = COALESCE($2, weight), sets = COALESCE($3, sets), reps = COALESCE($4, reps) WHERE workout_id = $5 RETURNING *`,
      [name, weight, sets, reps, id]
    )
    .then((result) => {
      console.log(result);
      if (result.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(result.rows[0]);
        console.log("Workout updated!");
      }
    });
});

///////////////////
//////LIFTS////////
///////////////////

app.get("/api/lifts/", (req, res) => {
  pool.query("SELECT * FROM lifts").then((data) => {
    const workout = data.rows;
    if (workout) {
      res.send(workout);
    } else {
      res.status(400).send("Lift does not exist");
    }
  });
});

// Find lift by name
// app.get("/api/lifts/:id", (req, res) => {
//   const id = req.params.id;
//   pool.query("SELECT * FROM lifts WHERE name = $1", [id]).then((data) => {
//     const workout = data.rows;
//     if (workout) {
//       res.send(workout);
//     } else {
//       res.status(400).send("Lift does not exist");
//     }
//   });
// });

app.get("/api/lifts/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query("SELECT * FROM lifts WHERE name LIKE $1", ["%" + id + "%"])
    .then((data) => {
      // const info = data.rows;
      let workout = data.rows;
      // info.forEach((element) => {
      //   if (info.name === id) {
      //     workout = info.rows;
      //   }
      // });
      if (workout) {
        res.send(workout);
      } else {
        res.status(400).send("Lift does not exist");
      }
    });
});

//Add new lift.
app.post("/api/lifts", (req, res) => {
  const { name, muscle_group, example, tips } = req.body;
  if (name && muscle_group) {
    pool
      .query(
        "INSERT INTO lifts(name, muscle_group, example, tips) VALUES($1, $2, $3, $4) RETURNING *;",
        [name, muscle_group, example, tips]
      )
      .then((data) => {
        res.status(200);
        res.send(data.rows[0]);
        console.log("New lift added!");
      });
  } else {
    res.status(400);
    res.set("Content-Type", "text/plain");
    res.send("Bad Request");
    console.log("Bad Request");
  }
});
