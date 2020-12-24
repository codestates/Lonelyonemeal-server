require('dotenv').config();
const axios = require('axios');
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

module.exports = async (req, res) => {
  // req의 body로 authorization code가 들어옵니다. console.log를 통해 서버의 터미널창에서 확인해보세요!
  // console.log(req.body);

  // TODO : 이제 authorization code를 이용해 access token을 발급받기 위한 post 요청을 보냅니다. 다음 링크를 참고하세요.
  // https://docs.github.com/en/free-pro-team@latest/developers/apps/identifying-and-authorizing-users-for-github-apps#2-users-are-redirected-back-to-your-site-by-github
  let github = await axios.post("https://github.com/login/oauth/access_token", {
    client_id: clientID,
    client_secret: clientSecret,
    code: req.body.authorizationCode
  }, {
    headers: {"Accept": "application/json"}
  })
  console.log(github.data.access_token)
  res.send(200, {accessToken: github.data.access_token});
}
