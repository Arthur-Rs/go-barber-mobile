export interface contextInterface {
  name: string
  signIn(object: signInData): void
  signOut(): void
  user: userInterface
}

export interface userInterface {
  avatarPath: null
  email: string
  id: string
  name: string
  [key: string]: unknown
}

export interface signInResponse {
  token: string
  user: userInterface
}

export interface signInRequest {
  email: string
  password: string
}
