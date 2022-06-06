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

const getAlbums = async () => {
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


const getTracks = async (id) => {
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

const setAlbums = async () => {

   let data = await getAlbums();
   let playlists = document.querySelector('.content__new > .content__playlists');

   for (i = 0; i < data.albums.items.length; i++) {
      playlists.insertAdjacentHTML('beforeend', `
         <div class="content__item">
            <img src='${data.albums.items[i].images[1].url}' class="playlist-image">
         <h3 class="playlist-title" data-id='${data.albums.items[i].id}'>${data.albums.items[i].name}</h3>
      </div>`
      )
   }
}

document.querySelector('.content__playlists').addEventListener('click', async (event) => {
   if (event.target.className === 'playlist-title') {
      document.querySelectorAll('.tracks__item').forEach(e => e.remove())
      let id = event.target.dataset.id
      let tracks = await getTracks(id)
      for (i = 0; i < tracks.length; i++) {
         document.querySelector('.tracks__list').insertAdjacentHTML('beforeend', `<li class='tracks__item'>${tracks[i].name}</li>`)
      }
   }
})

setAlbums() 