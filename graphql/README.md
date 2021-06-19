### GraphQL 예제 소스

## 데이터 읽기
```
{
	getProduct( id : 1 ) {
	    id
        price
        name
	}
}
```

#### 작성하기
```
POST Content-Type application/json
```
```
{
    "query": "mutation addProduct($input: ProductInput) { addProduct(input: $input) { id } }",
    "variables": { "input" : { "name" : "세번째상품" , "price" : 3000 , "description" : "후후후" } }
}
```

#### 수정하기
```
POST Content-Type application/json
```
```
{
    "query": "mutation updateProduct( $id : ID! , $input: ProductInput! ) { updateProduct( id : $id  , input: $input) { id } }",
    "variables": { "id" : 1 ,"input" : { "name" : "수정상품" , "price" : 1000 , "description" : "후후후" } }
}
```

#### 삭제하기
```
POST Content-Type application/json
```
```
{
    "query": "mutation deleteProduct( $id : ID! ) { deleteProduct( id : $id  )  }",
    "variables": { "id" : 1  }
}
```