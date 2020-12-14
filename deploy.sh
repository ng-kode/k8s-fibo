docker build -t richardngcccc/docker-fibo_client:latest -t richardngcccc/docker-fibo_client:$SHA -f ./client/Dockerfile ./client
docker build -t richardngcccc/docker-fibo_api:latest -t richardngcccc/docker-fibo_api:$SHA -f ./api/Dockerfile ./api
docker build -t richardngcccc/docker-fibo_worker:latest -t richardngcccc/docker-fibo_worker:$SHA -f ./worker/Dockerfile ./worker

docker push richardngcccc/docker-fibo_client:latest
docker push richardngcccc/docker-fibo_api:latest
docker push richardngcccc/docker-fibo_worker:latest

docker push richardngcccc/docker-fibo_client:$SHA
docker push richardngcccc/docker-fibo_api:$SHA
docker push richardngcccc/docker-fibo_worker:$SHA

kubectl apply -f k8s
