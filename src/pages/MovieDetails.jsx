import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import DetailsBanner from '../components/detailsBanner/DetailsBanner';
import Recommendations from '../components/Recommendations';
import Similar from '../components/Similar';
import Cast from '../components/Cast';
import Videos from '../components/Videos';
import ContentWrapper from '../components/ContentWrapper';
import VideoModal from '../components/VideoModal';
import { fetchDataFromApi } from '../api/tmdb';

function MovieDetails() {  

    const { mediaType, id } = useParams();
    const [movieId, setMovieId] = useState();
    const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
    const [videos, setVideos] = useState();
    const [videoKey, setVideoKey] = useState("");

    const getVideos = async () => {
        try {
            const data = await fetchDataFromApi(`/${mediaType}/${id}/videos`);
            setVideos(data);
            setVideoKey(data?.results?.[0]?.key);
            
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    useEffect(() => {
        if (movieId) {
            window.location.reload();  
        }   
    }, [id])

    useEffect(() => {
        getVideos();
        window.scrollTo(0, 0);
    }, [])
    
    
    return (
        <>
            <DetailsBanner setVideoKey={setVideoKey} videoKey={videoKey} setIsVideoModalVisible={setIsVideoModalVisible}/>
            <ContentWrapper>
                <Cast />
                <Videos videos={videos} setVideoKey={setVideoKey} videoKey={videoKey} setIsVideoModalVisible={setIsVideoModalVisible}/>
                <Similar setId={setMovieId} />
                <Recommendations setId={setMovieId}/>
            </ContentWrapper>
            {isVideoModalVisible && (<VideoModal visible={true} setIsVideoModalVisible={setIsVideoModalVisible} videoKey={videoKey} />)}
        </>
    );
}

export default MovieDetails;