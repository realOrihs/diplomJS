import { useEffect, useState } from 'react';
import { getAlbums, getTracks } from '../api/api';
import '../App.css';

const Main = () => {
   let [albums, setAlbums] = useState([]);
   let [tracklist, setTracklist] = useState([]);
   let [id, setId] = useState(0)

   useEffect(async () => {
      let isCancelled = false;
      let result = await getAlbums();
      if (isCancelled) {
         return;
      }
      let data = result.albums.items;
      setAlbums(data);
      return () => {
         isCancelled = true;
      };
   }, []);


   useEffect(async () => {
      if (id != 0) {
         let isCancelled = false;
         let tracks = await getTracks(id);
         if (isCancelled) {
            return;
         }
         setTracklist(tracks);
         return () => {
            isCancelled = true;
         };
      }
   }, [id]);



   return (
      <main className="content">
         <div className="content__new">
            <h2 className="content__title">Альбомы</h2>
            <div className="content__description">Нажмите на название альбома, чтобы посмотреть треклист</div>
            <div className="content__playlists">
               {albums.map(item => (
                  <div className="content__item" key={item.id}>
                     <img
                        src={item.images[1].url}
                        className="playlist-image" />
                     <h3 className="playlist-title" onClick={() => { setId(item.id) }}>{item.name}</h3>
                  </div>
               ))}
            </div>
         </div>

         <div className="content__tracks">
            <h2 className="content__title">Треки</h2>
            <ul className="tracks">
               {tracklist.map(item => (
                  <li key={item.id} className='tracks__item'>{item.name}</li>
               ))}
            </ul>
         </div>
      </main>
   )
}

export default Main;