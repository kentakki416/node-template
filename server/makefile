# ビルドするDockerイメージの名前
IMAGE_NAME = runtime

# Dockerコンテナの名前
CONTAINER_NAME = my-app


.PHONY: start
start:
	DOCKER_BUILDKIT=1 docker build -t ${IMAGE_NAME} . --target dev
	docker run --memory 625m --name $(CONTAINER_NAME) -it -p 8080:8080 ${IMAGE_NAME}

.PHONY: build
build:
	DOCKER_BUILDKIT=1 docker build -t $(IMAGE_NAME) .

.PHONY: run
run:
	docker run --memory 625m --name $(CONTAINER_NAME) -it -p 8080:8080 $(IMAGE_NAME)

.PHONY: run-d
run-d:
	docker run --name $(CONTAINER_NAME) -it -d -p 8080:8080 $(IMAGE_NAME)

.PHONY: exec
exec:
	docker exec -it $(CONTAINER_NAME) sh

.PHONY: stop
stop:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

.PHONY: clean
clean:
	docker rmi $(IMAGE_NAME)

.PHONY: removeAll
removeAll:
	docker image prune -a

.PHONY: history
history:
	docker history ${IMAGE_NAME}

.PHONY: inspect
ls:
	docker inspect ${CONTAINER_NAME}
