import { useState, useEffect } from 'react';

import { fetchDataFromApi } from '../../api/tmdb';

import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import ReactPaginate from 'react-paginate';

import ContentWrapper from '../../components/ContentWrapper';
import MovieCard from "../../components/MovieCard"
// import Pagination from '../../components/Pagination';

import "./style.scss";

function Explore() {

    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();
    const [ data, setData ] = useState();
    const [screenSize, setScreenSize] = useState(getScreenSize()); // Initialize with the initial screen size

    // Pagination state vars
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    // React Paginate state vars
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(0); // Number of page links to display in the middle
    const [marginPagesDisplayed, setMarginPagesDisplayed] = useState(0); // Number of page links to display at the beginning and end

    // // itemsPerPage is the number of items you want to display per page
    // const itemsPerPage = 10;

    // // Calculate the range of items to display for the current page
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const displayedItems = data?.results?.slice(startIndex, endIndex);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1); // React Paginate uses 0-based index
    };

    // Function to get the screen size
    function getScreenSize() {
        if (window.innerWidth >= 1024) {
            return 'lg'; // Large screens
        } else if (window.innerWidth >= 768) {
            return 'md'; // Medium screens
        } else if (window.innerWidth >= 640) {
            return 'sm'; // Small screens 
        } else {
            return 'xs'; // Extra Small screens
        }
    }

    const getMoviesOrTvShows = async () => {
        try {
            const data = await fetchDataFromApi(`/discover/${mediaType}?page=${currentPage}`);
            setData(data); 
            setPageCount(data?.total_pages > 500 && 500);

        } catch (err) {
            console.log(err);
            return err;
        }
    } 
    
    const getNewMoviesOrTvShows = async () => {
        try {
            setCurrentPage(1);
            const data = await fetchDataFromApi(`/discover/${mediaType}`);
            setData(data); 
            setPageCount(data?.total_pages > 500 && 500);

        } catch (err) {
            console.log(err);
            return err;
        }
    } 

    useEffect(() => {
        // Adjust pageRangeDisplayed and marginPagesDisplayed based on screen size
        const handleResize = () => {
            setScreenSize(getScreenSize());
            if (window.innerWidth <= 390) {
                setPageRangeDisplayed(0);
                setMarginPagesDisplayed(0);
            } else if (window.innerWidth > 390 && window.innerWidth <= 640) {
                setPageRangeDisplayed(2);
                setMarginPagesDisplayed(1);
            } else {
                setPageRangeDisplayed(5);
                setMarginPagesDisplayed(1);
            }
        };
    
        // Initial adjustment on mount
        handleResize();
    
        // Listen for window resize events
        window.addEventListener('resize', handleResize);
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    useEffect(() => {
        getNewMoviesOrTvShows();
        window.scrollTo(0, 0);
    }, [mediaType]);

    useEffect(() => {
        getMoviesOrTvShows();
    }, [currentPage]);


    return (
        <ContentWrapper>
            {data?.results?.length > 0 ? 
            (
                <>
                    <div className='flex justify-between mb-5 pt-[100px] mb-4'>
                        <h2 className='text-white text-2xl font-medium mb-10'>Explore {mediaType === "movie" ? ("Movies") : ("TV Shows")}</h2>
                    </div>

                    <div className='mb-[50px]'>
                        <ReactPaginate
                            previousLabel={"← Previous"}
                            nextLabel={"Next →"}
                            pageCount={pageCount}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            activeClassName={"pagination__link--active"}
                            forcePage={currentPage - 1}
                            pageRangeDisplayed={pageRangeDisplayed}
                            marginPagesDisplayed={marginPagesDisplayed}
                        />
                    </div>

                    <div className='flex flex-col items-center md:items-start md:flex-row flex-wrap'>
                        {data?.results?.map((movie, id) => (
                            <MovieCard 
                                data={movie} 
                                key={id} 
                                mediaType={mediaType} 
                                styles={{
                                    width: getScreenSize() === 'lg' ? 'calc(20% - 20px)' : getScreenSize() === 'md' ? 'calc(33% - 20px)' : getScreenSize() === 'sm' ? '50%' : '70%', 
                                    aspectRatio: `1/1.5`, 
                                    marginBottom: '30px'
                                }} 
                            />
                        ))}
                    </div>

                    <div className='mb-[50px]'>
                        <ReactPaginate
                            previousLabel={"← Previous"}
                            nextLabel={"Next →"}
                            pageCount={pageCount}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            activeClassName={"pagination__link--active"}
                            forcePage={currentPage - 1}
                            pageRangeDisplayed={pageRangeDisplayed}
                            marginPagesDisplayed={marginPagesDisplayed}
                        />
                    </div>
                    
                </>
            ) : (
                <div className='flex justify-between mb-5 pt-[80px]'>
                    <h2 className='text-white text-2xl font-medium'>Sorry, Results not found!</h2>
                </div>
            )}

            
        </ContentWrapper>
    );
}

export default Explore;