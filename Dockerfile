# build environment
FROM node:14-slim as react-build
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=react-build /app/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

# # Use the official lightweight Node.js 14 image.
# # https://hub.docker.com/_/node
# FROM node:14-slim

# # Create and change to the app directory.
# WORKDIR /app

# # Copy application dependency manifests to the container image.
# # A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# # Copying this first prevents re-running npm install on every code change.
# COPY package*.json ./

# # Install production dependencies.
# # If you add a package-lock.json, speed your build by switching to 'npm ci'.
# # RUN npm ci --only=production
# RUN npm install --only=production

# # Copy local code to the container image.
# COPY . ./

# # Run the web service on container startup.
# CMD [ "npm", "start" ]