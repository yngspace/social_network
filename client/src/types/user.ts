import { Entity, EntityMeta } from '.'

class User extends Entity {
  id: string = ''
  firstName: string = ''
  lastName: string = ''
  email: string = ''
  password: string = ''
}

class UserMeta extends EntityMeta<User> {
  endpoint: string = '/user/'
}

export {
  User,
  UserMeta
}
