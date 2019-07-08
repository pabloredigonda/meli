curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
apt-get install -y nodejs
apt-get install -y git
git clone https://github.com/pabloredigonda/meli.git
cd meli
npm i
npm install -g typescript
cp src/server/.env.example src/server/.env

tsc && cp ./src/server/.env ./dist/.env

npm install -g pm2
