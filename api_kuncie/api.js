const httpLib = require("supertest");
const apKuncie = httpLib("https://api.kunciebootcampqa.com/api/bootcamp");

function getUserList() {
  return apKuncie
    .get("/users")
    .set("Authorization", "Bearer 123456")
    .set("Content-Type", "application/json");
}

function getUserDetail() {
  return apKuncie
    .get("/users")
    .set("Authorization", "Bearer 123456")
    .set("Content-Type", "application/json");
}

function deleteUser(userId) {
  return apKuncie.delete("/users/" + userId);
}

function createUser(nama, phone, address) {
  return apKuncie.post("/users").send({
    name: nama,
    phone_number: phone,
    address: address,
    point: 500,
    is_registered: true,
    vehicles: [
      {
        name: "Astrea - Automasi",
        type: "Honda - Automasi",
      },
      {
        name: "Vespa - Automasi",
        type: "Piagio - Automasi",
      },
    ],
  });
}
module.exports = {
  getUserList,
  getUserDetail,
  createUser,
  deleteUser,
};
