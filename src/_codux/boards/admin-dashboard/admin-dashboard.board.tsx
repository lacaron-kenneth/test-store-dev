import { createBoard } from '@wixc3/react-board';
import { AdminDashboard } from '../../../components/admin-dashboard/admin-dashboard';
import { MemoryRouter } from 'react-router-dom';

export default createBoard({
    name: 'AdminDashboard',
    Board: () => (
        <MemoryRouter>
            <AdminDashboard />
        </MemoryRouter>
    ),
    isSnippet: true,
});
