const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { users, events, locations, participants } = require('./data');

const typeDefs = gql`
    type Event {
        id:ID!
        title:String
        desc:String
        date:String
        from:String
        to:String
        location_id:ID!
        location: Location
        user_id:ID!
        user: User
        participants: [Participant]
    }

    type Location {
        id:ID!
        name:String
        desc:String
        lat:Float
        lng:Float
    }
    
    type User {
        id:ID!
        username:String!
        email:String!
    }

    type Participant {
        id:ID!
        user_id:ID!
        user: User
        event: Event
        event_id:ID!
    }

    type Query {
        users:[User!]
        user(id:ID!):User!
        events:[Event!]
        event(id:ID!):Event
        locations:[Location!]
        location(id:ID!):Location!
        participants:[Participant!]
        participant(id:ID!):Participant!
    }
`;
const resolvers = {
    Query: {
        users: () => users,
        user: (parent, args) => users.find((user) => user.id == args.id),

        events: () => events,
        event: (parent, args) => events.find((event) => event.id == args.id),

        locations: () => locations,
        location: (parent, args) => locations.find((location) => location.id == args.id),

        participants: () => participants,
        participant: (parent, args) => participants.find((participant) => participant.id == args.id)
    },
    Event: {
        user: (parent) => users.find((user) => user.id == parent.user_id),
        location: (parent) => locations.find((location) => location.id == parent.location_id),
        participants: (parent) => participants.filter((participant) => participant.event_id == parent.id)
    },
    Participant: {
        user: (parent) => users.find((user) => user.id == parent.user_id),
        event: (parent) => events.find((event) => event.id == parent.event_id)
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({})
    ]
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});