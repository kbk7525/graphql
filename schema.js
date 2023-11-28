import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInputObjectType} from 'graphql';
import { resolvers } from './resolvers.js';

//raw 객체를 사용해서 정의
const ExchangeInfo = new GraphQLObjectType({
    name: 'ExchangeInfo',
    fields: {
        src: { type: GraphQLString },
        tgt: { type: GraphQLString },
        rate: { type: GraphQLFloat },
        date: { type: GraphQLString },
    },
});

const InputUpdateExchangeInfo = new GraphQLInputObjectType({
    name: 'InputUpdateExchangeInfo',
    fields: {
        src: { type: GraphQLString },
        tgt: { type: GraphQLString },
        rate: { type: GraphQLFloat },
        date: { type: GraphQLString },
    },
});

const InputDeleteExchangeInfo = new GraphQLInputObjectType({
    name: 'InputDeleteExchangeInfo',
    fields: {
        src: { type: GraphQLString },
        tgt: { type: GraphQLString },
        date: { type: GraphQLString },
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getExchangeRate: {
            type: ExchangeInfo,
            args: { 
                src: {type: GraphQLString}, 
                tgt: {type: GraphQLString} 
            },
            resolve: resolvers.Query.getExchangeRate,
          },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        postExchangeRate: {
            type: ExchangeInfo,
            args: {
                info: {type: InputUpdateExchangeInfo},
            },
            resolve: resolvers.Mutation.postExchangeRate,
        },
        deleteExchangeRate: {
            type: ExchangeInfo,
            args: { 
                info: {type: InputDeleteExchangeInfo} 
            },
            resolve: resolvers.Mutation.deleteExchangeRate,
          },
    },
});

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default schema;