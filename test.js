const { Permit } = require("permitio");

const express = require("express");
const app = express();
const port = 4000;

// This line initializes the SDK and connects your Node.js app
// to the Permit.io PDP container you've set up in the previous step.
const permit = new Permit({
  // in production, you might need to change this url to fit your deployment
  pdp: "https://cloudpdp.api.permit.io",
  // your api key
  token: "permit_key_F8fVG14DtlNIKlv07bXgSsQw1QWT0vyIS7mVUF7UFvi3dNRhU3QZScYfUDwaBdLC8GZczNY7SfbVIPgDeTTUv5"
});

// You can open http://localhost:4000 to invoke this http
// endpoint, and see the outcome of the permission check.
app.get("/", async (req, res) => {
  // This user was defined by you in the previous step and
  // is already assigned with a role in the permission system.
  const user = {
    id: "jasurbek.fm@gmail.com",
    firstName: "Jasurbek",
    lastName: "Ergashev",
    email: "jasurbek.fm@gmail.com",
  } // in a real app, you would typically decode the user id from a JWT token

  // After we created this user in the previous step, we also synced the user's identifier
  // to permit.io servers with permit.write(permit.api.syncUser(user)). The user identifier
  // can be anything (email, db id, etc) but must be unique for each user. Now that the
  // user is synced, we can use its identifier to check permissions with `permit.check()`.
  const permitted = await permit.check(user.id, "update", "news");
  if (permitted) {
    res.status(200).send(`${user.firstName} ${user.lastName} is PERMITTED to update news!`);
  } else {
    res.status(403).send(`${user.firstName} ${user.lastName} is NOT PERMITTED to update news!`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});