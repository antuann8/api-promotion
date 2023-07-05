PROJECTNAME = superapp-server-api-fitness

docker-build:
	docker build -t $(PROJECTNAME) -f Dockerfile .

docker-run:
	docker run --name $(PROJECTNAME) -d --restart=always -p 8090:8090 $(PROJECTNAME)