import server from 'react-mf-remote-fragment/server';
import path from 'path';
import Fragment from '../Fragment';

server({
    Fragment,
    port: 3001,
    link: '/assets/greatsite-header-style.css',
    publicFolder: path.resolve('./dist'),
});