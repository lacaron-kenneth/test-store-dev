import { createBoard } from '@wixc3/react-board';
import { HomePage } from '../../../components/home-page/home-page';

export default createBoard({
    name: 'HomePage',
    Board: () => <HomePage />,
    isSnippet: true,
    environmentProps: {
        windowWidth: 1024,
        windowHeight: 768,
    },
});
