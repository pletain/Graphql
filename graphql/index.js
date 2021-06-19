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
				updateProduct( id : ID! , input : ProductInput! ) : Product
				deleteProduct( id : ID! ) : String
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
	//input에서 넘어온 데이터를 데이터베이스에 추가함
	//id는 직접 추가해줄 줌
	addProduct : ({ input }) => {
			input.id = parseInt(products.length + 1);
			products.push(input);
			return root.getProduct({ id : input.id })
	},
	updateProduct : ({ id , input }) => { //여기의 id값이
			const index = products.findIndex(product => product.id === parseInt(id) ) //여기로 갔을 때, 일치하는 값을 조회
			products[index]	= { //덮어 씌우기한다.
					id : parseInt(id),
					...input //안에서 입력됐던 값들이 펼쳐짐
			}
			return products[index];
	},
	deleteProduct : ( { id } ) => {
					const index = products.findIndex(product => product.id === parseInt(id) )
					products.splice( index , 1)
					return "remove success!";	
			}
};





const app = express();
app.use( '/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.use( '/static' , express.static('static') )


app.listen(3000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
}); 