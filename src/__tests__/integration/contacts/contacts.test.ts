import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { createClient, createContact, createContact2, createContact3, createContact4, createContact5, createContactBodyIncorreto, loginClient, updateContact } from "../../mocks";

describe("Test contacts", () => {
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

  test("Não deve ser possível criar um contato sem token de autorização", async () => {
    const response = await request(app).post("/contacts")
    
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })

  test("Não deve ser possível criar um contato com body incorreto", async () => {
    await request(app).post("/clients").send(createClient)
    const responseLogin = await request(app).post("/login").send(loginClient)

    const response = await request(app).post("/contacts").set("Authorization", `Bearer ${responseLogin.body.token}`).send(createContactBodyIncorreto)
    
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message")
  })

  test("Deve ser possível criar um contato", async () => {
    await request(app).post("/clients").send(createClient)
    const responseLogin = await request(app).post("/login").send(loginClient)

    const response = await request(app).post("/contacts").set("Authorization", `Bearer ${responseLogin.body.token}`).send(createContact)
    
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("phone")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("client")
  })

  test("Não deve ser possível listar os contatos sem token de autorização", async () => {
    const response = await request(app).get("/contacts")
    
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })

  test("Deve ser possível listar os contatos sem token de autorização", async () => {
    await request(app).post("/clients").send(createClient)
    const responseLogin = await request(app).post("/login").send(loginClient)

    await request(app).post("/contacts").set("Authorization", `Bearer ${responseLogin.body.token}`).send(createContact)

    const response = await request(app).get("/contacts").set("Authorization", `Bearer ${responseLogin.body.token}`)
    
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  })

  test("Não deve ser possível atualizar o contato sem token de autorização", async () => {
    await request(app).post("/clients").send(createClient)
    const responseLogin = await request(app).post("/login").send(loginClient)

    const returnContact = await request(app).post("/contacts").set("Authorization", `Bearer ${responseLogin.body.token}`).send(createContact2)

    const response = await request(app).patch(`/contacts/${returnContact.body.id}`).send(updateContact)
    
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })

  test("Deve ser possível atualizar o contato", async () => {
    await request(app).post("/clients").send(createClient)
    const responseLogin = await request(app).post("/login").send(loginClient)

    const returnContact = await request(app).post("/contacts").set("Authorization", `Bearer ${responseLogin.body.token}`).send(createContact3)

    const response = await request(app).patch(`/contacts/${returnContact.body.id}`).set("Authorization", `Bearer ${responseLogin.body.token}`).send(updateContact)
    
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("phone")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")
  })

  test("Não deve ser possível deletar o contato sem token de autorização", async () => {
    await request(app).post("/clients").send(createClient)
    const responseLogin = await request(app).post("/login").send(loginClient)

    const returnContact = await request(app).post("/contacts").set("Authorization", `Bearer ${responseLogin.body.token}`).send(createContact4)

    const response = await request(app).delete(`/contacts/${returnContact.body.id}`)
    
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })

  test("Deve ser possível deletar o contato", async () => {
    await request(app).post("/clients").send(createClient)
    const responseLogin = await request(app).post("/login").send(loginClient)

    const returnContact = await request(app).post("/contacts").set("Authorization", `Bearer ${responseLogin.body.token}`).send(createContact5)

    const response = await request(app).delete(`/contacts/${returnContact.body.id}`).set("Authorization", `Bearer ${responseLogin.body.token}`)
    
    expect(response.status).toBe(204)
  })
})