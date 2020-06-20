import React from 'react';
import style from './../../pages/MainPage.module.scss'

type PropsType = {
    currentPage: number
    totalCount: number
    onPageChanged: (newPage: number) => void
}

export const Paginator: React.FC<PropsType> = ({totalCount, currentPage, onPageChanged}) => {
    let pageCount = Math.ceil(totalCount / 10);
    pageCount = pageCount > 10 ? 10 : pageCount
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i); //Изначально пустой массив, пушим на каждой итерации по 1 пэйджу в массив
    }

    const pagesMap = pages.map((page, index) => {
        return <div key={index} onClick={() => onPageChanged(page)} style={{
            margin: 5,
            padding: 5,
            borderRadius: 10,
            background: page === currentPage ? 'rgb(253, 65, 65)' : "white"
        }}>{page}</div>
    })

    return (
        <div className={style.paginatorWrapper}>
            {pagesMap}
        </div>
    );
}
