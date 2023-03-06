# react-mf-remote-fragment

Essentially, just shared utility modules that are used for the following demo on a [habr](https://habr.com/ru/post/720572/)

- **Webpack plugin** - that created Fetch component that derives the fragment's html content on server and embeds it to the main html
- **Server** - just a naive server implementation for fragments to not copy and paste the same code again and again for many fragments
- **Client container** - just a fragment container on a frontend that wait the initialisation of the fragment and makes sure the markup is the same as from the server
