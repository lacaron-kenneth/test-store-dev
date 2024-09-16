import { createBoard } from '@wixc3/react-board';
import { ProductPage } from '../../../components/product-page/product-page';
import { MemoryRouter } from 'react-router-dom';

export default createBoard({
    name: 'ProductPage',
    Board: () => (
        <MemoryRouter>
           <ProductPage />
        </MemoryRouter>
    ),
    isSnippet: true,
});
