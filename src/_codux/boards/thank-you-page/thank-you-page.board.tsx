import { createBoard } from '@wixc3/react-board';
import { ThankYouPage } from '../../../components/thank-you-page/thank-you-page';
import { MemoryRouter } from 'react-router-dom';

export default createBoard({
    name: 'ThankYouPage',
    Board: () => <MemoryRouter><ThankYouPage /></MemoryRouter>,
    isSnippet: true,
});
