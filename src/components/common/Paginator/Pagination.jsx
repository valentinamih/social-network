import style from "../../Users/Users.module.css";
import React, {useState} from "react";

export const Paginator = ({currentPage, totalItemsCount, pageSize, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionsCount = pagesCount / portionSize
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize
    return <div className={style.paginator}>
       {portionNumber > 1 &&  <button onClick={ () => setPortionNumber(portionNumber - 1)} >Prev</button>}
        {pages
            .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map(page => {
            return <span className={currentPage === page ? style.selectedPage : undefined}
                         key={page}
                         onClick={(e) => onPageChanged(page)}>{page}</span>
        })
        }
        {portionNumber < portionsCount &&  <button onClick={ () => setPortionNumber(portionNumber + 1)} >Next</button>}
    </div>
}