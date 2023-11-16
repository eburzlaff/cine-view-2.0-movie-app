import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import MovieCard from '../MovieCard';
import 'react-alice-carousel/lib/alice-carousel.css';
import {BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill} from 'react-icons/bs';
import "./style.scss";

function Carousel({data, mediaType, setId}) {

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        768: { items: 3 },
        1024: { items: 5 },
    };
    
    const items = data?.results?.map((movie, id) => (
        <MovieCard mediaType={mediaType} data={movie} key={id} setId={setId} />
    ));

    return (
        <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            renderPrevButton={() => {
                return <BsFillArrowLeftCircleFill className='cursor-pointer' color="white" size="30px"/>
              }}
              renderNextButton={() => {
                return <BsFillArrowRightCircleFill className='cursor-pointer' color="white" size="30px"/>
              }}
            keyboardNavigation
        />
    )
};

export default Carousel;