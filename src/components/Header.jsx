import {useState} from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FiMenu } from 'react-icons/fi';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import HamburguerModal from './HamburguerModal';

function Header(props) {

    const [showSearch, setShowSearch] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();

    const openSearch = () => {
        setShowSearch(true);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && searchTerm.length > 0) {
            navigate(`/search/${searchTerm}`);
        }
    }

    return (
        <> 
            <header className='fixed bg-[#00000040] backdrop-blur w-full h-[60px] px-5 z-20'>
                <div className='max-w-[1200px] mx-auto h-[60px] flex gap-x-2 items-center'>
                    <Link to="/"><img className='h-[35px]' src={logo} alt="logo" /></Link>
                    <ul className='hidden lg:flex items-center ml-auto mr-4 gap-x-9 text-white text-xl'>
                        <li className='hover:text-orange-600'><Link to="/">Home</Link></li>
                        <li className='hover:text-orange-600'><Link to="/explore/movie">Movies</Link></li>
                        <li className='hover:text-orange-600'><Link to="/explore/tv">TV Shows</Link></li>
                        <li className='hover:text-orange-600'>
                            <button onClick={()=> showSearch ? setShowSearch(false) : setShowSearch(true)}>
                                <FaMagnifyingGlass size="18px"/>
                            </button>
                        </li>                
                    </ul>

                    <ul className='lg:hidden flex items-center ml-auto mr-4 gap-x-5 lg:gap-x-9 text-white text-xl'>
                        <li>
                            <button onClick={() => showSearch ? setShowSearch(false) : setShowSearch(true)}>
                                <FaMagnifyingGlass size="22px"/>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => {isVisible ? setIsVisible(false) : setIsVisible(true)}}>
                                <FiMenu size="2rem" className='text-white hover:text-orange-500'/>
                            </button>
                        </li>
                    </ul>    
                </div>
            </header>

            {showSearch && (
                <div className='fixed flex flex-wrap w-screen px-0 h-[60px] top-[60px] overflow-hidden z-20' >
                    <input type="text" placeholder='Search for a movie or a tv show...' onKeyDown={handleKeyDown} onChange={(e) => setSearchTerm(e.target.value)} className='bg-white text-center w-[70%] placeholder-gray-700 text-sm sm:text-base md:text-xl overflow-hidden' />
                    <div className=' flex align-center bg-white w-[30%] gap-6 md:gap-10'>
                        <button onClick={() => searchTerm.length > 0 && navigate(`/search/${searchTerm}`)}> 
                            <FaMagnifyingGlass className='text-gray-700' size="30px"/>
                        </button>
                        <button onClick={() => {setSearchTerm(""); setShowSearch(false)}} className='text-4xl text-gray-700'>
                            X
                        </button>
                    </div>
                </div>
            )}

            {isVisible && <HamburguerModal visible={isVisible} setIsVisible={setIsVisible} />}                       
    </>
    );
}

export default Header;