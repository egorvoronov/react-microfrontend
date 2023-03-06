# react-microfrontend 🚀
Just an example of how you could use module federation to build a scalable site that could be developed by multiple different teams **independently**.

Find the article describes it in the details on a [habr](https://habr.com/ru/post/720572/).

☝🏻 Remember, that this is just a POC and not a production ready code, it just proves that independent development of fragments + server side rendering is possible with the standard instruments we already have.

Ok, let's see how deep is the rabbit hole 🐇

Open the 3 terminal windows

## 1. FRAGMENT HEADER

Team A could be fully responsible for header component and to build and run the server they use the following commands:

1. `cd greatsite/fragmentHeader`, in reality, fragmentHeader is another repo, it is not required be in the same folder
2. `npm install`
3. Build and run a server: `npm run build-dev-server && npm run build-client && npm run start-server`

## 2. FRAGMENT FOOTER

Team B is responsible for the footer component and team builds their stuff via:

1. `cd greatsite/fragmentFooter`, could be another repo again 
2. `npm install`
3. Build and run a server: `npm run build-dev-server && npm run build-client && npm run start-server`

## 3. APP RENDERER

1. `cd greatsite/appRenderer`, here where the magic and all fragments are being glued together, this repo is a site that users see
2. `npm install`
3. Build and run a server: `npm run build && npm run start-server`

and you're done!

---

## And see the magic
1. Open the greatsite via http://localhost:3000 - All fragments are server side rendered and rehydrated on client
2. Make a change in fragment header component and restart **ONLY** the header by running the header bootstrap command from point #1
3. Just reload the page - **MAGIC** new version of header without the whole site to be redeployed/restarted - that's a magic!!

---
## Contact me
Let me know if something is not clear, I could give you a consultation: egorvoronov@gmail.com