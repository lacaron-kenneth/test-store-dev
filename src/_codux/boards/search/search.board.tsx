import { createBoard } from '@wixc3/react-board';
import { Search } from '../../../components/search/search';
import { MemoryRouter } from 'react-router-dom';

export default createBoard({
    name: 'Search',
    Board: () => (
        <MemoryRouter>
            <Search />
        </MemoryRouter>
    ),
    isSnippet: true,
});
