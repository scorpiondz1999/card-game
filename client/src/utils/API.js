// route to get logged in user's info (needs the token)
export const createUser = (userData) => {
  return fetch("http://localhost:3001/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json'
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json'
    },
    body: JSON.stringify(userData),
  });
};

export const startNewGame = async (token) => {
  return await fetch("http://localhost:3001/api/game/startgame", {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  }).then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
};
