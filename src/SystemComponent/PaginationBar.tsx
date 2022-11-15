import Pagination from 'react-bootstrap/Pagination';


function PaginationBar(props: any) {
    const {nPages, currentPage, setCurrentPage} = props;
    let pageNumbers: number[];
    // @ts-ignore
    pageNumbers = [...Array(nPages + 1).keys()].slice(1);
    const nextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }
    return (
        <Pagination className={'justify-content-center'}>
            <Pagination.Prev onClick={prevPage} href={'#'}/>
            {pageNumbers.map(pgNumber => (
                <Pagination.Item onClick={() => setCurrentPage(pgNumber)} key={pgNumber}
                                 active={pgNumber === currentPage}>{pgNumber}</Pagination.Item>
            ))}
            <Pagination.Next onClick={nextPage} href={'#'}/>
        </Pagination>
    );
}

export default PaginationBar;
