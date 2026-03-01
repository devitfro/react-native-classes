interface IUser {
  id: string,
  token: string,
  name: string,
  email: string,
  birthdate: Date,
  phone?: string,
}

export default IUser;