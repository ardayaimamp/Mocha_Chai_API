const expect = require("chai").expect;
const assert = require("chai").assert;
const { it } = require("mocha");
const api = require("../api_kuncie/api.js");

describe("USER TESTS", async () => {

  before(async () => {
    const createUser = await api.createUser(
      "Ardaya Pratama",
      "089524205124",
      "Jawa Barat"
    );
    expect(createUser.status).to.equal(200);
    newUser = createUser.body;
  });

  // TUGAS 1  
  describe("API GET USERS LIST", async () => {
    it("test apakah fungsi API list user berjalan ?", async () => {
      getUsers = await api.getUserList();
      expect(getUsers.status).to.equal(200);
      expect(getUsers.body.data.map((i) => i["id"])).to.include(newUser.id);
    }).timeout(10000);

    it("test untuk memastikan data user dikembalikan dengan benar", async () => {
      assert.equal(newUser.name, "Ardaya Pratama");
      assert.equal(newUser.phone_number, "089524205124");
      assert.equal(newUser.address, "Jawa Barat");
    });

    it("test apakah fungsi API list user berjalan dengan benar tanpa memunculkan user yang salah", async () => {
      failedUser = await api.createUser(123123, 123123, "Jawa Barat");
      getUsers = await api.getUserList();
      expect(failedUser.status).to.equal(400);
      expect(getUsers.status).to.equal(200);
      expect(getUsers.body.data.map((i) => i["id"])).not.to.include(
        failedUser.body.id
      );
    }).timeout(10000);

    it("test untuk memastikan data user yang salah input dan akan mengembalikan error dengan pesan error yang benar", async () => {
      failedUser = await api.createUser(321312, 321312, "Jawa Barat");
      expect(failedUser.status).to.equal(400);
      assert.equal(
        failedUser.body.message,
        "proto: (line 1:9): invalid value for string type: 321312"
      );
    });
  });

  // TUGAS 2 
  describe("API DELETE USERS LIST", async () => {
    before(async () => {
      deleteUser = await api.deleteUser(newUser.id);
    }).timeout(10000);

    it("test apakah fungsi API delete user berjalan dengan benar", async () => {
      expect(deleteUser.status).to.equal(200);
    }).timeout(10000);

    it("test untuk memastikan user yang sudah dihapus tidak muncul di user list", async () => {
      getUsers = await api.getUserList();
      expect(getUsers.body.data.map((i) => i["id"])).not.to.include(newUser.id); 
    }).timeout(10000);

    it('assertion success', async () => {
      const result = await api.getUserList();
      expect(result).to.equal('promise resolved'); 
    }).timeout(10000);

  });
});
