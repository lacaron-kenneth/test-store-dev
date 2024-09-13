import styles from './App.module.scss';
import { BrowsePage } from './components/browse-page/browse-page';
import { HomePage } from './components/home-page/home-page';
import { Routes, Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { Search } from './components/search/search';

function App() {
    return (
        <div className={styles.App}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/browse" element={<BrowsePage />}></Route>
                    <Route path="/search" element={<Search />}></Route>
                </Routes>
                <HomePage />
            </MemoryRouter>
        </div>
    );
}

export default App;
