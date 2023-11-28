import express from 'express'; //express 서버 구축
import mongoose from 'mongoose'; //mongodb 접근
import expressGraphQL from 'express-graphql';
import schema from './schema.js';

const app = express();
const port = 5110;
const uri = "mongodb+srv://kbk7525:k119720148@cluster0.zrxp9ap.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = global.Promise; //비동기 처리
mongoose.connect(uri);

app.use(`/graphql`, expressGraphQL.graphqlHTTP( {
    schema: schema,
    graphiql: true
}));
app.listen(port, () => {
    console.log(`server start`);
});