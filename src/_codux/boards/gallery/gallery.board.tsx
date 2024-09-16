import { createBoard } from '@wixc3/react-board';
import { Gallery } from '../../../components/gallery/gallery';
import { MemoryRouter } from 'react-router-dom';

export default createBoard({
    name: 'Gallery',
    Board: () => <MemoryRouter><Gallery /></MemoryRouter>,
    isSnippet: true,
    environmentProps: {
        windowWidth: 933,
        windowHeight: 640,
    },
});
