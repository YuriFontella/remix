import { Form, Link, useActionData, useNavigation } from "@remix-run/react"
import { Button, Grid, Input, Text } from "@nextui-org/react"

export async function action ({ request }) {
  const data = await request.formData()
  const email = data.get('email')

  console.log({email})

  return {
    ok: true
  }
}

export default function Newsletter () {

  const data = useActionData()
  const navigation = useNavigation()
  const busy = navigation.state === 'submitting'
  const state = data?.ok ? true : false

  return (
    <main>
      <Form replace method="post" aria-hidden={state}>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          Subscribe
        </Text>
        <Grid.Container gap={1} justify="center">
          <Grid>
            <Input id="email" type="email" name="email" aria-label="email" placeholder="you@example.com" />
          </Grid>
          <Grid>
            <Button type="submit">
              {busy ? 'Waiting...' : 'Subscribe'}
            </Button>
          </Grid>
        </Grid.Container>
      </Form>

      <div aria-hidden={!state}>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $yellow600 -20%, $red600 100%",
          }}
          weight="bold"
        >
          Congratulations!
        </Text>
        
        <div align="center">
          <Link to=".">Start here</Link>
        </div>
      </div>
    </main>
  )
}