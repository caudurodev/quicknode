

# Quicknode Take-Home by Rodrigo Cauduro

**! Answers to technical take-home questions at the bottom of this README !**

Note: I am applying for a frontend role, but this was a fullstack take-home.
<br>
<br>
## Goals
1) Connect to an Ethereum wallet (I chose Metamask)
2) Create an SSR app that connects to the [icy tools API](https://developers.icy.tools/) to grab the latest trending NFT collections after connecting to an Ethereum wallet
<br>
<br>
## Mainly built with:

- React with Typescript
- NextJS - SSR
- Apollo
- @thirdweb-dev - connect to metamask
- Codegen - automatic TS types for SSR and Client Apollo Queries
- Tailwind
<br>
<br>
## Running the code

Create .env file in root with API credentials

```
ICY_API_KEY=xxxxx
ICY_API_URL=https://graphql.icy.tools/graphql
```


Install and then run the development server:

```bash
npm ci
npm run dev
```
<br>
<br>
(optional) Update Query types from graphql endpoint automatically for Apollo queries and mutations by running:

```bash
npm run codegen
```

## Technical Questions
Going in to as much detail as you want, describe how you would build a system that meets the following requirements:
- Handles user authentication
- Would you need a database?
- Which one and what might the schema look like?
- Are their pros/cons to a specific choice? (SQL vs NoSQL)
- Serves data to the client via an API
- What kind of API would you use?
- Scales to handle thousands of requests per second
- This could involve a lot of different optimizations, but what would you try first or
what are the top three you might consider?
- Provides real-time updates to clients as new data is available
<br>
<br>
### My Answer

If I where to design a system for user authentication, I would first think about the business requirements - do we know for sure we will need scalability and high throughput right from the start or is this something we should worry about later? 
<br>
<br>
### If designing something for an MVP

If designing something for an MVP, I would consider pre-existing solutions to save time - there are many competent CMSs that have user built-in authentication and user tables that would be more than enough for typical use-cases. Some can even use dedicated oauth providers such as [Auth0](https://auth0.com/), [Firebase Auth](https://firebase.google.com/docs/auth), [Clerk](https://clerk.dev/), etc for added security.

I have personally used [Auth0](https://auth0.com/) in combination with a [Hasura](https://hasura.io) (graphql in front of Postgres) and believe that a single server with this setup could handle many thousands of users before the need to scale beyond one machine. 

So - on a smaller scale - I would build the system with a relational database such as Postgres or MySQL/MariaDB, and would, maybe consider using an external auth provider for security reasons as well as future proofing scalability.
<br>
<br>
### If designing a system for higher throughput

If designing a system for higher throughput I would consider a different approach but would still reach for an external oauth provider. Here are the main things I would think about:
- I might consider using a NoSQL database such as mongoDB for it's easier replication across machines but would also consider if not having ACID transactions would be too cumbersome for the dev experience. 
- If we could separate and cache the user session data (with, for example [Redis](https://redis.io/)) which will tend to be pinged for every user request. 
- If we could create a common library that could verify and decode auth JWT tokens without hitting the database. This code could be added to each microservice independently which would descentralize auth validation.
- If we had multiple databases - a primary database instance could be used for all writes and multiple read replica databases for just reading. Another approach with multiple databases - we could shard users across machines (ex: usernames A-M machine 1,usernames O-Z machine 2).

Im any case, I would probably be biased towards using JWT tokens for authentication in both scenarios because of my experience in building SPAs and interfaces decoupled from the backend - it ends up being the only really secure and practical way to achieve modern interfaces. 

From personal experience as a frontend developer, I would think that dev experience would benefit greatly from a GraphQL API as well as a REST API to connect to the system. REST is the industry standard, but, apart from the more cumbersome dev experience, it tends to hit the database more, as each request needs to be done synchornously for relational data whereas GraphQL -  with it's upfront queries - tends to result in the same data returning with less burden to the overall backend. So I would definitly try to have GraphQL as an API option.

Within the above scenario **- for realtime data -** one could use a solution with GraphQL subscriptions via webSockets which would respond to database events (INSERT, UPDATE, etc) and update the clients with new data **OR** one could use GraphQL live queries with WebSockets - updating user response in realtime every time the query results changed.


## My main priorities when designing the system 
- Security, security, security! (Password hashing for example)
- Speed of round-trip response from user input to actually logging in.
- Flexibility of infrastructure requirements 
- Developer experience/ergonomics (how hard is it to work with?)


