VERSION_NUMBER ?= 0.0.2 #Remember to change number by each time
VERSION ?= v$(VERSION_NUMBER)


REPOPATH ?= netflow_dashboard


.PHONY: build_image
build_image:
	docker build -t registry.gitlab.com/ashspencil2014/$(REPOPATH):$(VERSION) .

.PHONY: push_image
push_image:
	docker push registry.gitlab.com/ashspencil2014/$(REPOPATH):$(VERSION)
