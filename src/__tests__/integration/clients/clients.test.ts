import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { createClient, createClientAlreadyExists, createClientPhoneInvalid, loginClient, loginClientNoPassword, updateClient, updateClientError } from "../../mocks";


describe("Test clients", () => {
    let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Não deve ser capaz de criar um client com phone tendo menos ou mais de 11 digitos", async () => {
    const response = await request(app).post("/clients").send(createClientPhoneInvalid)
    
    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty("message")
  })

  test("Não deve ser capaz de criar um cliente já existente", async () => {
    await request(app).post("/clients").send(createClientAlreadyExists)
    const response = await request(app).post("/clients").send(createClientAlreadyExists)
    
    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty("message")
  })

  test("Deve ser capaz de criar um cliente", async () => {
    const response = await request(app).post("/clients").send(createClient)
 
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("phone")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")
  })

  test("Não deve ser capaz de listar o client sem token de autorização", async () => {
    const response = await request(app).get("/clients/me")
    
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })

  test("Deve ser capaz de listar o client", async () => {
    const responseLogin = await request(app).post("/login").send(loginClient);

    const response = await request(app).get("/clients/me").set("Authorization", `Bearer ${responseLogin.body.token}`);

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("phone")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")
  })
  
  test("Não deve de atualizar o client sem token de autorização", async () => {
    await request(app).post("/clients").send(createClient)

    const response = await request(app).patch("/clients/me").send(updateClientError)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })

  test("Não deve de atualizar o client para outro já existente", async () => {
    const responseLogin = await request(app).post("/login").send(loginClient);

    const response = await request(app).patch("/clients/me").set("Authorization", `Bearer ${responseLogin.body.token}`).send(updateClientError)
    
    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty("message")
  })

  test("Deve atualizar o client", async () => {
    const responseLogin = await request(app).post("/login").send(loginClient);

    const response = await request(app).patch("/clients/me").set("Authorization", `Bearer ${responseLogin.body.token}`).send(updateClient)
    
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("phone")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")
  })

  test("Não deve de deletar o client sem token de autorização", async () => {
    const response = await request(app).delete("/clients/me")
    
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })

  test("Deve deletar o client", async () => {
    await request(app).post("/clients").send(createClient)
    const responseLogin = await request(app).post("/login").send(loginClient);

    const response = await request(app).delete("/clients/me").set("Authorization", `Bearer ${responseLogin.body.token}`)
    
    expect(response.status).toBe(204)
  })

  test("Não deve fazer o login sem password ou email", async () => {
    await request(app).post("/clients").send(createClient)
    const response = await request(app).post("/login").send(loginClientNoPassword);
    
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message")
  })

  test("Deve fazer o login ", async () => {
    await request(app).post("/clients").send(createClient)
    const response = await request(app).post("/login").send(loginClient);
    
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("token")
    expect(response.body).toHaveProperty("id")
  })

})