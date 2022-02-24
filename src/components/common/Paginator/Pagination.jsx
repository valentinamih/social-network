import style from "../../common/Paginator/Paginator.module.css";
import React, {useState} from "react";
import classNames from "classnames";
import Button from "../Buttons/Button";

let cn = classNames.bind(style);

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
       {portionNumber > 1 && <Button onClickFunction={() => setPortionNumber(portionNumber - 1)}
                                     text={'Prev'}/>}
        {pages
            .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map(page => {
            return <span className={cn({[style.selectedPage]: currentPage === page}, style.pageNumber)}
                         key={page}
                         onClick={(e) => onPageChanged(page)}>{page}</span>
        })
        }
        {portionNumber < portionsCount && <Button onClickFunction={() => setPortionNumber(portionNumber + 1)}
                                                  text={'Next'}/>}
    </div>
}