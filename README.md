# NetFlow Frontend, Please install the npm package first.

## Modify nginx.conf 
```
proxy_pass <domain_or_ip:port>; # Only Domain or IP
```
ex
```
proxy_pass http://myserver:8000
```

# ----- Development -----

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and hot-reloads for development in localhost
```
npm run dev
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# ----- Production -----

### Compiles and minifies for production 

```
npm run build
```

### Build Docker Image

```
docker build . -t netflow
```
or
```
make build image
```

### Run Docker Image
```
docker run -d --name NetFlow-Frontend -p 80:80 netflow
```
