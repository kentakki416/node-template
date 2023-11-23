# ビルドするDockerイメージの名前
IMAGE_NAME = runtime

# Dockerコンテナの名前
CONTAINER_NAME = my-app

.PHONY: build
build:
	DOCKER_BUILDKIT=1 docker build -t $(IMAGE_NAME) .

.PHONY: run
run:
	bash -c "docker run --name $(CONTAINER_NAME) -it -p 8080:8080 $(IMAGE_NAME)"

.PHONY: stop
stop:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

.PHONY: clean
clean:
	docker rmi $(IMAGE_NAME)

.PHONY: test
test:
	docker build -t $(IMAGE_NAME) .
	docker run --name $(IMAGE_NAME) -p 8080:8080 -d $(IMAGE_NAME)
