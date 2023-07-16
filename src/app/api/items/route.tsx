import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  // const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  // const data = await res.json()
  // console.log('--------------------------------')
  // console.log()
  // const {searchParams} = new URL(request.url)
  // return NextResponse.json({
  //   id: searchParams.get('id')
  // })
  await sleep(2000)
  return NextResponse.json({
    name: 'marcwoozie'
  }, {status: 200})
}


const sleep = (waitTime: number) => new Promise( resolve => setTimeout(resolve, waitTime) );

