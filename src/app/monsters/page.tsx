import { get } from "@/lib/fetch"
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody } from "@/components/chakra"
import { use } from "react"
import { MonsterIndexRes, PokeApiCommonRes } from "@/types/pokemon"

const fetch = () => {
  return get<PokeApiCommonRes<MonsterIndexRes[]>>('https://pokeapi.co/api/v2/pokemon', {limit: 100}, {}, {next: {revalidate: 0}}).then(res => res.results)
}

const Page = () => {
  const monsters = use(fetch())
  return <>
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>pocket monsters from <a target="_blank" href="https://pokeapi.co/">Poke API</a></TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {monsters.map(monster => {
            return <>
              <Tr>
                <Th><a href={`/monsters/${monster.name}`}>{monster.name}</a></Th>
              </Tr>
            </>
          })}

        </Tbody>
      </Table>
    </TableContainer>
  </>
}

export default Page