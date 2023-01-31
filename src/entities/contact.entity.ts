import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Client } from "./client.entity";

@Entity("contacts")
export class Contacts {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column()
  name: string
  
  @Column()
  email: string

  @Column()
  phone: string

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Client, (client) => client.id)
  client: Client

  constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}