deploy:
	rm -rf ./dist
	sh ./scripts/deploy.sh

build:
	npm run build

lint:
	npm run lint

dev:
	npm run dev
