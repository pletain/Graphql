const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language


const schema = buildSchema(`

	input ProductInput{ 
			name : String
			price : Int
			description : String
	}

	type Product {
		id : ID! 
		name : String
		price : Int
		description : String
	}
    type Query {
        getProduct( id : ID! ) : Product
    }

	type Mutation {
				addProduct( input : ProductInput ) : Product
	}

`);


const products = [{
	id : 1,
	name : '첫번째 제품',
	price : 2000,
	description : 'graph'
},{
	id : 2,
	name : '두번째 제품',
	price : 4000,
	description : 'apple'
}]

const root = { 
	getProduct : ({ id }) => products.find( product => product.id == parseInt(id) ),
	
	addProduct : ({ input }) => {
			input.id = parseInt(products.length + 1);
			products.push(input);
			return root.getProduct({ id : input.id })
	}
};

const app = express();
app.use( '/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(3000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
}); 