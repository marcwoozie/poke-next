export type PokeApiCommonRes<T = any> = {
  count: number
  next: string | null
  previous: string | null
  results: T
}

export type MonsterIndexRes = {
  name: string
}

type MonsterDetailSprite = {
  sprites: {
    front_default: string
    front_shiny: string  
  }
}

export type MonsterDetail = {
  // sprites: MonsterDetailSprite[]
  names: {
    language: {
      name: string,
      url: string
    },
    name: string
  }[]
}