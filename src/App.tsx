import styles from './App.module.scss';
import { HomePage } from './components/home-page/home-page';
import { Header } from './components/header/header';

function App() {
    return (
        <div className={styles.App}>
            <HomePage />
        </div>
    );
}

export default App;
