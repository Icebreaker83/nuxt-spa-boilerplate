export default function ({ context, $auth, store }) {
  // const accessToken = $auth.getToken($auth.strategy.name)
  // const refreshToken = `Bearer ${$auth.$storage.getCookie(`_refresh_token.${$auth.strategy.name}`)}`
  const date = new Date(0)
  const tokenExpDate = date.setUTCSeconds(store.getters['security/expirationDate'])
  if (Date.now() >= tokenExpDate) { console.log('access token expired!') }
}
