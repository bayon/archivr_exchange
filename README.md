


# Archivr Code Exercise
//=================== 

Directions: 


Create a simple web application for performing currency conversions.  Your app should allow the user to select two 
currencies, enter an amount in one of the currencies, and see what the value would be in the other currency.  
For example, I should be able to choose USD and GBP, enter 100 for USD, and see a conversion value like 114.21 GBP
As a bonus, it would be nice if the user could see a historical view of the chosen exchange rate.  That could be in 
the form of a chart, or a table, or whatever you prefer.
You can use one of the many publicly available APIs to look up the exchange rates.  (https://exchangeratesapi.io 
and https://fixer.io are both good options.)
Please use React to build the UI.  Other than that, feel free to use any libraries & tools that you like.

//====================== 

app and api in docker container: 
reference: https://github.com/mrcoles/node-react-docker-compose


//======================
To calculate how much of a foreign currency you’ll get with a particular exchange rate, 
divide the amount of money you’re starting with by the exchange rate. 


//======================
Rates are quoted against the Euro by default. 
Quote against a different currency by setting the base parameter in your request.
GET https://api.exchangeratesapi.io/latest?base=USD HTTP/1.1 



// UPDATE NPM PACKAGES: 
run npm install on the app container after running docker-compose up 
 

### I used the following repo as a starting point.

# Node + Create React App + Docker Compose

A project that runs a Node server and a create-react-app app via two separate containers, using Docker Compose.





## Development

```
docker-compose up
```

For development, the `server/` and `client/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The client server is spun up at `localhost:3000` and it proxies internally to the server using the linked name as `server:8080`.

The local directories are mounted into the containers, so changes will reflect immediately. However, changes to package.json will likely need to a rebuild: `docker-compose down && docker-compose build && docker-compose up`.

### Notes

#### Adding new scss files

In a previous version of this, you needed to restart the client for new scss files to be recognized by the watch command. This may have changed (TODO: test if this still matters with react-scripts updates):

```
docker-compose restart client
```

#### Installing npm dependencies

All changes to `node_modules` should happen _inside_ the containers. Install any new dependencies by inside the container. You can do this via `docker-compose run`, but it’s easier to just upadte a running container and avoid having to rebuild everything:

```
docker-compose exec client
```

Then inside:

```
npm install --save <new_dependency>
```

## Production

```
docker-compose -f docker-compose.prod.yml up
```

For production, this uses the Dockerfile at the root of the repo. It creates a static build of the client React app and runs Express inside server, which handles both the API and serving of React files.

As a result, different code is executing to serve the React files, but all of the API calls should remain the same. The difference between development and production isn’t ideal, but it does offer the simplicity of having the entire app run in one server on one machine.

This is one of multiple ways a Node + React app could be setup, as suggested [here](https://daveceddia.com/create-react-app-express-production/):

- **Keep them together** - have Express serve both the API and React files
- **Split them apart** - have Express API on one machine and the React files on another (e.g., on S3 and use CORS to access the API)
- **Put the API behind a proxy** - use something like NGINX to proxy the Express API server and React static files separately

This project uses the “keep them together” approach. For better performance, you can set up a proxy (like Cloudflare) in between your server and the Internet to cache the static files. Or with some extra work you can fashion it to do either of the other two options.

## Notes

### Using docker compose

I have `comp` aliased to `docker-compose` on my computer.

Start via:

```
comp up

# or detached
comp up -d
```

Run a container of the server image via:

```
comp run server /bin/bash
```

Check status:

```
comp ps
```

Stop:

```
comp down
```

Run the production image:

```
comp -f docker-compose.prod.yml up
```

NOTE: if any dependencies change in package.json files, you probably will need to rebuild the container for the changes to appear, e.g.,

```
comp down
comp build
comp up
```

### Setup references

References for setting up a Node project with Docker and docker-compose:

- https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
- https://blog.codeship.com/using-docker-compose-for-nodejs-development/
- http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html

Express + React:

- https://daveceddia.com/create-react-app-express-production/
- http://ericsowell.com/blog/2017/5/16/create-react-app-and-express
- https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
- https://medium.freecodecamp.org/how-to-host-a-website-on-s3-without-getting-lost-in-the-sea-e2b82aa6cd38
