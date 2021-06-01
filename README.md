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

## Author

jpnathan
