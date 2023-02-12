const api = "http://127.0.0.1:8000";

export async function login(handle, password) {
  const res = await fetch(`${api}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ handle, password }),
  });

  if (!res.ok) return false;
  const token = await res.text();
  localStorage.setItem("token", token);
  return token;
}

function getToken() {
  return localStorage.getItem("token");
}

export async function verify() {
  const token = getToken();
  console.log(token);
  if (!token) return false;

  const res = await fetch(`${api}/users/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return false;

  const user = await res.json();
  return user;
}

export async function register(name, handle, profile, password) {
  const res = await fetch(`${api}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, handle, profile, password }),
  });

  if (!res.ok) return false;

  const user = await res.json();
  return user;
}

export async function updateUser(name, profile, password, id) {
  const token = getToken();

  const res = await fetch(`${api}/users/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      profile,
      password,
    }),
  });

  if (!res.ok) return false;

  const user = await res.json();

  return user;
}

export async function getTweets() {
  const res = await fetch(`${api}/tweets`);
  if (!res.ok) return false;
  const tweets = await res.json();
  return tweets;
}
