import server from 'react-mf-remote-fragment/server';
import path from 'path';
import Fragment from '../Fragment';

server({
    Fragment,
    port: 3002,
    link: '/assets/greatsite-footer-style.css',
    publicFolder: path.resolve('./dist'),
});