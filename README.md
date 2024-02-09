## Descrição
App backend Api RESTful de gerenciamento de vendas de produtos. Foi desenvolvido com arquitetura em camadas MSC (Model, Service e Controller) e fiz operações CRUD no banco de dados MySQL com query. Também implementei testes.

## Testes
Para os testes de integração foram utilizados os frameworks Mocha, Chai, Sinon e Chai-http. Para executar os testes, você poderá executar o seguinte comando:
`npm run test:mocha`

## Endpoints
`GET /products` `GET /products/:id`

`GET /sales` `GET /sales/:id`

`POST /products`

`POST /sales`

`PUT /products/:id`

`DELETE /products/:id`

`DELETE /sales/:id`

`PUT /sales/:saleId/products/:productId/quantity`

`GET /products/search`

## Tecnologias Utilizadas
* Node
* Express
* MySQL
* Docker
* Mocha
* Chai
* Sinon
* Chai-http

 
## 🐋 Rodando o projeto com Docker
Para rodar o projeto utilizando docker, no diretório da aplicação execute o comando:

`docker-compose up -d`

Para acompanhar os logs do container:

`docker logs -n 10 -f store_manager`
