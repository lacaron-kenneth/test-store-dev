import { createBoard } from '@wixc3/react-board';
import { SearchBar } from '../../../components/search-bar/search-bar';
import { MemoryRouter } from 'react-router-dom';

export default createBoard({
    name: 'SearchBar',
    Board: () => <MemoryRouter><SearchBar /></MemoryRouter> ,
    isSnippet: true,
});
