import '../App.css';
import leftButton from '../img/leftButton.svg';
import rightButton from '../img/rightButton.svg';
import menu from '../img/menuButton.svg'

const Header = () => {
   return (
      <header className="header">
         <div className="header__buttons">
            <div className="header__back">
               <button className="button-back"><img src={leftButton} alt="button-back" /></button>
            </div>
            <div className="header__forward">
               <button className="button-forward"><img src={rightButton} alt="button-forward" /></button>
            </div>
         </div>

         <div className="header__menu">
            <div className="header__user">
               <span className="username">User</span>
               <img src={menu} alt="" />
            </div>
         </div>
      </header>
   )
}

export default Header;