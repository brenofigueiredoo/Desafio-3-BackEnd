import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Contacts } from "./contact.entity";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column()
  name: string
  
  @Column()
  email: string
  
  @Column()
  password: string

  @Column()
  phone: string

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date

  @OneToMany(() => Contacts, (contacts) => contacts.client)
  contacts: Contacts[]

  constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}