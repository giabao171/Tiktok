import { HeaderOnly } from '../layouts';

//layouts
import config from '~/configs';

//pages
import Home from '../pages/Home';
import Following from '../pages/Following';
import Profile from '../pages/Profile';
import Upload from '../pages/Upload';
import Search from '../pages/Search';
import Live from '~/pages/Live';
import CommentVideo from '~/components/CommentVideo';

//public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search },
    { path: config.routes.live, component: Live },
    { path: config.routes.comment, component: CommentVideo },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
