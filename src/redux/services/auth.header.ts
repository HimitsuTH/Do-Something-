


export default function authHeader() {
  
  const tokenStr = localStorage.getItem("token");
  // console.log(tokenStr)
  let token = null;
  if (tokenStr) token = JSON.parse(tokenStr);

  // console.log(token)

  if (token && token.access_token) {
    return { Authorization: "Bearer " + token.access_token };
  } else {
    return { Authorization: "" };
  }
}