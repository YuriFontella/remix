import { useLoaderData } from "@remix-run/react"

export const loader = ({ params }) => {
  console.log(params.id)

  return params
}

export const meta = ({ data }) => {
  return [
    { title: data.id }
  ]
}

export default function Group () {
  const param = useLoaderData()
  return param.id
}