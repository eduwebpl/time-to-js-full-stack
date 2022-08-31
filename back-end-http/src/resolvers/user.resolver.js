export const userResolver = {
  'POST:sing-in': (req) => {
    const { email, password } = req.body
    return { email, password }
  },
}
