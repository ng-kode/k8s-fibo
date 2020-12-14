# docker build -t richardngcccc/docker-fibo_client:latest -t richardngcccc/docker-fibo_client:$SHA -f ./client/Dockerfile ./client
# docker build -t richardngcccc/docker-fibo_api:latest -t richardngcccc/docker-fibo_api:$SHA -f ./api/Dockerfile ./api
# docker build -t richardngcccc/docker-fibo_worker:latest -t richardngcccc/docker-fibo_worker:$SHA -f ./worker/Dockerfile ./worker

docker build -t richardngcccc/docker-fibo_client -f ./client/Dockerfile ./client
docker build -t richardngcccc/docker-fibo_api -f ./api/Dockerfile ./api
docker build -t richardngcccc/docker-fibo_worker -f ./worker/Dockerfile ./worker

docker push richardngcccc/docker-fibo_client
docker push richardngcccc/docker-fibo_api
docker push richardngcccc/docker-fibo_worker

# docker push richardngcccc/docker-fibo_client:$SHA
# docker push richardngcccc/docker-fibo_api:$SHA
# docker push richardngcccc/docker-fibo_worker:$SHA

kubectl apply -f k8s
kubectl rollout restart deployment/client-deployment
kubectl rollout restart deployment/api-deployment
kubectl rollout restart deployment/worker-deployment
