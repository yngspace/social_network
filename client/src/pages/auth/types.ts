interface ILoginForm {
  email: string
  password: string
}

class LoginForm implements ILoginForm {
  email: string = ''
  password: string = ''
}

export {
  LoginForm
}