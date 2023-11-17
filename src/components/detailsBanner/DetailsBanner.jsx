import {useState, useEffect , useContext} from 'react';

import {BsCollectionPlay, BsPlayCircle} from 'react-icons/bs'
import PosterFallback from '../../assets/no-poster.png'
import CircleRatingDetails from '../../components/detailsBanner/CircleRatingDetails';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../api/tmdb';
import dayjs from 'dayjs';
import AppContext from '../../context/context';
import { useNavigate } from 'react-router-dom';
import VideoModal from '../VideoModal';

function DetailsBanner({setIsVideoModalVisible, videoKey, setVideoKey}) {

    const { mediaType, id } = useParams();
    const [details, setDetails] = useState();
    const [credits, setCredits] = useState();

    

    const navigate = useNavigate();
    const {apiConfig} = useContext(AppContext);

    const posterUrl = apiConfig?.poster && details?.poster_path ? apiConfig?.poster + details?.poster_path : PosterFallback;
    const backdropUrl = apiConfig?.backdrop && details?.backdrop_path ? apiConfig?.backdrop + details?.backdrop_path : PosterFallback;

    const directors = [];
    credits?.crew?.forEach((person) => {
    if (person.job === "Director") {
        directors.push(person.name);
    }
    });

    const writers = [];
    credits?.crew?.forEach((person) => {
    if (person.job === "Screenplay" || person.job === "Story" || person.job === "Writer") {
        writers.push(person.name);
    }
    });

    // const director = crew?.filter((f) => f.job === "Director");
    // const writer = crew?.filter(
    //     (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    // );

    const getDetails = async () => {
        try {
            const data = await fetchDataFromApi(`/${mediaType}/${id}`);
            setDetails(data);
            
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    

    const getCredits = async () => {
        try {
            const data = await fetchDataFromApi(`/${mediaType}/${id}/credits`);
            setCredits(data);
            
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    useEffect(() => {
        getDetails();
        getCredits();
      }, [])

    return (
        <>
            <div className='md:h-[700px] w-full relative mb-12'>
                <img src={backdropUrl} alt="Banner" className='bg-[#04152d] w-full h-full object-cover object-top absolute opacity-[.1]' />
                <div style={{background: `linear-gradient(180deg,rgba(4,21,45,0) 0%,#04152d 90%)`}} className='w-full h-[250px] absolute bottom-0 left-0'></div>
                <div className='max-w-[1200px] w-full h-full mx-auto px-5 flex flex-col md:flex-row items-center justify-center gap-8 pt-[140px] overflow-hidden'>
                    <div className='w-[50%] h-full'>
                        <img src={posterUrl} alt="Movie Image" className='rounded-lg w-full object-cover h-full relative'/>
                    </div>
                    <div className='flex flex: 1 flex-col w-full h-full overflow-y-auto relative'> 
                        <h2 className='text-white text-center md:text-left text-4xl font-bold mb-3 relative'>{details?.title || details?.original_title || details?.original_name }</h2>
                        <p className='text-gray-400 text-center md:text-left font-bold text-xl mb-3 relative'>{details?.tagline}</p>
                        <div className='flex flex-wrap justify-center md:justify-start gap-2 mb-3 relative'>
                            {details?.genres?.length > 0 && details?.genres.map((g, i) => (
                                <div key={i} className='text-white bg-rose-500 rounded-xl py-1 px-2 text-center text-xs'>{g.name}</div>
                            ))}
                        </div>
                        <div className='flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 mb-3'>
                            <div className='relative'>
                                {<CircleRatingDetails rating={details?.vote_average ? details.vote_average.toFixed(1) : "0.0"}/>}
                            </div>
                            {/* window.open(`https://www.youtube.com/watch?v=${videos?.results?.[0].key}`, '_blank') */}
                            <button onClick={() => {setIsVideoModalVisible(true); setVideoKey(videoKey); }} className='flex items-center cursor-pointer relative gap-5 text-white hover:text-rose-700'>
                                <BsPlayCircle className='w-[100px] h-[100px]' /> 
                                <span className='text-2xl'>Watch Trailer</span>
                            </button>
                        </div>
                        <div className='w-full md:pr-[100px] text-center md:text-left relative mb-8'>
                            <h3 className='text-white text-2xl mb-2'>Overview</h3>
                            <p className='text-white break-words'>{details?.overview ? details.overview : "Not Available"}</p>
                        </div>
                        
                        <div className='flex justify-center md:justify-start gap-4 relative pb-5 mb-2 border-b-[1px] border-solid border-gray-600'>
                            <p className='text-white font-bold'>Status: <span className='opacity-50 font-normal'>{details?.status ? details.status : "Not Available"}</span></p>
                            <p className='text-white font-bold'>Released Date: <span className='opacity-50 font-normal'>{details?.release_date || details?.first_air_date ? dayjs(details?.release_date || details?.first_air_date).format("MMM D, YYYY") : "Not Available"}</span></p>
                            <p className='text-white font-bold'>Runtime: <span className='opacity-50 font-normal'>{details?.runtime ? toHoursAndMinutes(details.runtime) : "Not Available"}</span></p>
                        </div>

                        <div className='flex justify-center md:justify-start gap-4 relative pb-5 mb-2 border-b-[1px] border-solid border-gray-600'>
                            <p className='text-white font-bold'>Director: <span className='opacity-50 font-normal'>{directors?.length > 0 ? directors.join(", ") : "Not Available"}</span></p>
                        </div>

                        <div className='flex justify-center md:justify-start gap-4 relative pb-5 border-b-[1px] border-solid border-gray-600'>
                            <p className='text-white font-bold'>Writer: <span className='opacity-50 font-normal'>{writers?.length > 0 ? writers.join(", ") : "Not Available"}</span></p>
                        </div>
                                
                    </div>
                    
                </div>
            </div>
            
        </>
    );
}

export default DetailsBanner;