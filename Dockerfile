# Serves the portfolio website itself as a container:
#   docker build -t portfolio .  &&  docker run -p 8080:80 portfolio   -> http://localhost:8080
FROM nginx:1.27-alpine
COPY . /usr/share/nginx/html
EXPOSE 80
