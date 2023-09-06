import { get } from "@/lib/fetch"
import { MonsterDetail, MonsterDetailSprite } from "@/types/pokemon"
import { use } from "react"
import { Metadata } from 'next'
import Link from "next/link"

const fetchDetail = async (name: string) => {
  const data = await Promise.all([
    get<MonsterDetail>(`https://pokeapi.co/api/v2/pokemon-species/${name}`, {}, {}, {next: {revalidate: 0}}).then(res => res),
    get<MonsterDetailSprite>(`https://pokeapi.co/api/v2/pokemon/${name}`, {}, {}, {next: {revalidate: 0}}).then(res => res),
  ])
  return {
    detail: data[0],
    sprites: data[1]
  }
}

const getName = (data: MonsterDetail, lang: string = 'ja-Hrkt') => {
  return data.names.find(n => {
    return n.language.name === lang
  })?.name
}

const Page = ({
  params: {name}
}: {
  params: {name: string}
}) => {

  const {detail, sprites} = use(fetchDetail(name))

  const monsterName = getName(detail)

  return <>
    <Link href={'/monsters'}>戻る</Link>
    <h1>{monsterName}</h1>
    <img src={sprites.sprites.front_default} alt="" />
    <img src={sprites.sprites.front_shiny} alt="" />
    </>
}

export default Page

export const generateMetadata = async (
  { params }: {
    params: {
      name: string
    }
  }
): Promise<Metadata> => {
  const data = await get<MonsterDetail>(`https://pokeapi.co/api/v2/pokemon-species/${params.name}`, {}, {}, {next: {revalidate: 0}}).then(res => res)
  return {
    title: getName(data)
  }
}