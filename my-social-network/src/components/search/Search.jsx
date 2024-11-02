import SearchBtn from '../../images/svg/Button-search.svg';


import styles from './search.module.css';
import SearchList from './searchList';


function Search() {
    return(
        <div className='notific'>
            <h2>Search</h2>
            <div className={styles.search_inp}>
                <input type="text" placeholder='Search' />
                <button><img src={SearchBtn} alt="X" /></button>
            </div>
            <p className='p_16Bold'>Recent</p>
            <div className={styles.search_list}>
                <SearchList />
                <SearchList />
                <SearchList />
            </div>

        </div>
    )
}
export default Search;