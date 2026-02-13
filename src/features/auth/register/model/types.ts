export type RegisterRequest = {
  userName: string
  email: string
  password: string
}

export type RegisterResponse = {
  userId: string
  emailConfirmationToken: string
}
