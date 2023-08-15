import { fetch, json } from "@remix-run/node"
import { useLoaderData, Link, useCatch } from "@remix-run/react"

export const loader = async () => {
  const data = await fetch('http://localhost:3000')

  if (!data || data.length === 0) {
    throw json({ message: 'no one groups' }, {
      status: 404,
      statusText: 'not found'
    })
  }
  
  return data
}

export function CatchBoundary () {
  const data = useCatch()
  return (
    <main>
      <p>{data?.message}</p>
    </main>
  )
}

export default function Groups () {

  const data = useLoaderData()

  return (
    <>
      <Link to="/">Back</Link>
      <Link to="/group/new">Create new</Link>
      {data.map((x, i) =>
        <p key={i}>{x.name}</p>
      )}
    </>
  )
}
