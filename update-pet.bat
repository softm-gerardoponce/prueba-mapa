rmdir /s /q src/itesm-dsl-api-client

openapi-generator generate -i https://petstore.swagger.io/v2/swagger.json -g typescript-angular -o src/pet-client --additional-properties=modelPropertyNaming=original --skip-validate-spec 
