# taskrun
To Do Taks API with RabbitMQ

## Dependencies

- Node 14
- Docker
- Docker Compose

## Run

Execute the following command:
```bash
docker-compose up
```

## Test

Create the following user:
```bash
POST /users
{
    "name": "Test",
    "email": "test@email.com",
    "password": "superpass",
    "role": "manager"
}
```

then:
```bash
npm test
```

## Points to improve
- Add unit tests
- Add retry mechanism to conect to DB and RabbitMQ
- Better error handling
- Separete RabbitMQ in another service

## Author

jpnathan
