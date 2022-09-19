import { Credentials } from './credentials'

export interface User extends Omit<Credentials, 'password'> {
   id: number
   token: string
}
