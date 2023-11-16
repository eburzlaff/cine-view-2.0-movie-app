import React from 'react';
import { BsFillDatabaseFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

function HamburguerModal({ visible = false, setIsVisible}) {

    return (
        <div id="modal" visible={visible} className='px-5 text-xl fixed top-0 left-0 right-0 z-20 ' onClick={() => setIsVisible(false)}>
            <div className='max-w-lg mx-auto py-4 flex flex-col items-center bg-blue-950 border border-slate-900'>
                <div className='flex justify-between px-8 w-full'>
                    <Link to="/"><img className='h-[35px]' src={logo} alt="logo" /></Link>
                    <button className='p-3 font-bold text-white' onClick={() => setIsVisible(false)}>X</button>
                </div>
                <ul className='text-white font-semibold text-center flex flex-col mt-5 gap-5 w-full px-9 cursor-pointer'>
                    <li className='bg-orange-500 hover:bg-orange-700 p-5 w-full'><Link to="/">Home</Link></li>
                    <li className='bg-orange-500 hover:bg-orange-700 p-5 w-full'><Link to="/explore/movie">Movies</Link></li>
                    <li className='bg-orange-500 hover:bg-orange-700 p-5 w-full'><Link to="/explore/tv">TV Shows</Link></li>
                </ul>
            </div>
            
        </div>
    );
}

export default HamburguerModal;