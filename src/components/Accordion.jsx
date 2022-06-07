import '../App.css';
import logo from '../img/logo.svg';
import home from '../img/homeActive.svg';
import search from '../img/search.svg';
import media from '../img/media.svg';
import create from '../img/create.svg';
import favourite from '../img/favourite.svg'

const Navigation = () => {
   return (
      <nav className="navigation">
         <div className="navigation__wrapper">
            <img src={logo} alt="logo" className="navigation__logo" />

            <ul className="navigation__list">
               <li className="navigation__item">
                  <a href="#" className="navigation__link active">
                     <img className="navigation__icon" src={home} alt="icon" />
                     <span className="navigation__title">Главная</span>
                  </a>
               </li>
               <li className="navigation__item">
                  <a href="#" className="navigation__link">
                     <img className="navigation__icon" src={search} alt="search" />
                     <span className="navigation__title">Поиск</span>
                  </a>
               </li>
               <li className="navigation__item">
                  <a href="#" className="navigation__link">
                     <img className="navigation__icon" src={media} alt="media" />
                     <span className="navigation__title">Моя медиатека</span>
                  </a>
               </li>
            </ul>

            <ul className="navigation__music">
               <li className="navigation__item">
                  <a href="#" className="navigation__link">
                     <img className="navigation__icon" src={create} alt="create" />
                     <span className="navigation__title">Создать плейлист</span>
                  </a>
               </li>
               <li className="navigation__item">
                  <a href="#" className="navigation__link">
                     <img className="navigation__icon" src={favourite} alt="favourite" />
                     <span className="navigation__title">Любимые треки</span>
                  </a>
               </li>
            </ul>
         </div>

      </nav>
   )
}

export default Navigation;