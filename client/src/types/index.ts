class Entity {
  id: string|number = ''
}

class EntityMeta<T> {
  endpoint: string = ''
  entity = Entity

  dump (item: T): any {
    return item
  }
}

class PaginationType<T extends Entity> {
  results: T[] = []
  count: number = 0
  page: number = 0
  next: boolean = false
  prev: boolean = false
  totalPages: number = 1
  perPage: number = 0

  constructor (data?: PaginationType<T>) {
    if (!data) return

    this.results = data.results
    this.count = data.count
    this.page = data.page
    this.next = data.next
    this.prev = data.prev
    this.totalPages = Math.ceil(data.count / data.perPage)
  }
}

export {
  Entity,
  EntityMeta,
  PaginationType
}
