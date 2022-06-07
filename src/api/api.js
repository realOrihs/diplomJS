const client_id = '7427d979d242493584f43d110e86f5e2';
const client_secret = 'd1c91048603245239090e9f9dda60662';

const errorTemplate = (result) => {
   if (result.status === 404) {
      alert("There's no data. Try to reload page.")
   } else
      if (result.status === 401) {
         alert("Bad or expired token. This can happen if the user revoked a token or the access token has expired. You should re-authenticate the user.")
      } else
         if (result.status === 403) {
            alert("Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won't help here.")
         } else alert("Something went wrong")
}

const getToken = async () => {
   const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      body: 'grant_type=client_credentials'
   });
   if (result.ok) {
      const data = await result.json();
      return data.access_token;
   } else {
      errorTemplate(result)
   }
}

export const getAlbums = async () => {
   let token = await getToken();

   const result = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=18`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
      }
   })

   if (result.ok) {
      const data = await result.json();
      return data
   } else {
      errorTemplate(result)
   }
}


export const getTracks = async (id) => {
   let token = await getToken();

   const result = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
      }
   })
   if (result.ok) {
      const data = await result.json();
      return data.items
   } else {
      errorTemplate(result)
   }
}