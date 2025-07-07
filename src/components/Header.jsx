import Logo from '../assets/logo.svg';

const Header = () => {
    return (   
        <header className="text-white p-2">
         <div className='container'>
            <img className="logo" src={Logo} alt='CLO Virtual Faishon'/>
        </div>   
        
            
        </header>
    );
}
export default Header;