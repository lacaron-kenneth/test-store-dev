import styles from './App.module.scss';
import { BrowsePage } from './components/browse-page/browse-page';
import { HomePage } from './components/home-page/home-page';
import { Routes, Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { Search } from './components/search/search';
import { ProductPage } from './components/product-page/product-page';
import { Layout } from './components/layout/layout';

function App() {
    return (
        <div className={styles.App}>
            <MemoryRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/browse" element={<BrowsePage />}></Route>
                        <Route path="/search" element={<Search />}></Route>
                        <Route path="/merch/:id" element={<ProductPage />}></Route>
                    </Routes>
                    <HomePage />
                </Layout>
            </MemoryRouter>
        </div>
    );
}

export default App;
