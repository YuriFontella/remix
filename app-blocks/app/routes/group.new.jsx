import { Form, Link, useNavigation } from "@remix-run/react"
import { useEffect, useRef } from "react"
import { redirect, useActionData } from "react-router"

export const action = async ({ request }) => {
  const form = await request.formData()
  const body = Object.fromEntries(form)

  console.log(body)

  if (body.name.trim().length < 5) {
    return {
      message: 'must be at least 5 characters'
    }
  }

  await fetch('http://localhost:3000', { method: 'post', body: JSON.stringify(body) })

  return redirect('/group/new')
}

export default function New () {

  const navigation = useNavigation()

  const loading = Boolean(navigation.state === 'submitting')

  const error = useActionData()

  const formRef = useRef()

  useEffect(() => {
    if (!loading) {
      formRef.current?.reset()
    }
  }, [loading])

  return (
    <main>
      <Link to="/">Back</Link>
      {error?.message && <p>{error.message}</p>}
      <h6>New group</h6>
      <Form method="post" ref={formRef}>
        <input type="text" name="name" />
        <button type="submit" disabled={loading}>{ loading ? 'Sending' : 'Send' }</button>
      </Form>
    </main>
  )
}