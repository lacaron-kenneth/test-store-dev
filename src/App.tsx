import styles from './App.module.scss';
import { BrowsePage } from './components/browse-page/browse-page';
import { HomePage } from './components/home-page/home-page';
import { Routes, Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';

function App() {
    return (
        <div className={styles.App}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/browse" element={<BrowsePage />}></Route>
                </Routes>
                <HomePage />
            </MemoryRouter>
        </div>
    );
}

export default App;
