const express = require('express')
const app = express()

const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, `../.env`) })

const client_id = process.env.VUE_APP_REST_API_KEY
const redirect_uri = process.env.VUE_APP_REDIRECT_URI

const axios = require('axios');

app.get('/oauth/callback', async (req, res) => {
  const { code } = req.query

  const result = {};
  result.code = code

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', client_id);
  params.append('redirect_uri', redirect_uri);
  params.append('code', code);

  try {
    const { data } = await axios.post('https://kauth.kakao.com/oauth/token', params)
    result.token = data
  } catch(e) {
    console.error('get Token Error > ', e)
  }

  try {
    const { data } = await axios.request({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${result.token.access_token}`
      }
    })
    result.me = data
  } catch(e) {
    console.error('get User Error > ', e)
  }

  console.log('result > ', result)

  res.json({
    result: result
  })
})

app.listen(8080, () => {
  console.log('listening PORT 8080')
})