import { useEffect, useState } from 'react';
import ContentWrapper from './ContentWrapper';
import { fetchDataFromApi } from '../api/tmdb';
import Carousel from './carousel/Carousel';
import { useParams } from 'react-router-dom';
import VideoCard from './VideoCard';

function Videos({videos, setIsVideoModalVisible, videoKey, setVideoKey}) {

    return (
        <div className='mb-20'>
            <div className='flex justify-center md:justify-start mb-5'>
                <h2 className='text-white text-2xl font-medium'>Official Videos</h2>
            </div>
            <div className='flex gap-20 overflow-x-auto cursor-pointer'>
                {videos?.results?.map((video, id) => (<VideoCard key={id} name={video?.name} movieId={video?.key} setVideoKey={setVideoKey} setIsVideoModalVisible={setIsVideoModalVisible}/>))}
            </div>
            
            {/* <Carousel mediaType={mediaType === "movie" ? "movie" : "tv"} data={cast}/> */}
        </div>
    );
}

export default Videos;