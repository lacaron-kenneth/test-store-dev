import { createBoard } from '@wixc3/react-board';
import { Login } from '../../../components/login/login';
import { MemoryRouter } from 'react-router-dom';

export default createBoard({
    name: 'Login',
    Board: () => (
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    ),
    isSnippet: true,
});
