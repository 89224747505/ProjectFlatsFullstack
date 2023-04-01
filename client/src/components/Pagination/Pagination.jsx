import React from 'react';
import classes from "./Pagination.module.css";

const Pagination = ({totalFlats, flatsPerPage, setCurrentPage, currentPage}) => {
    let pages = [];

    for (let i=1; i<= Math.ceil(totalFlats/flatsPerPage); i++) {
        pages.push(i)
    }

    const currentPageFunction = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className={classes.containerPagination}>
            {pages.map((page, index) => {
                return <button className={page === currentPage ? classes.active : classes.disable} key={index} onClick={()=>currentPageFunction(page)}>{page}</button>
            })
            }
        </div>
    );
};

export default Pagination;