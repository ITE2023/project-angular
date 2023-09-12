FROM nginx:1.16.0-alpine
ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY ./dist/viettel /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
