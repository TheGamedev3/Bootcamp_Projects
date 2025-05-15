

in powershell:

npm init -y
npm install express ejs axios
npm install --save-dev nodemon jest supertest



in package.json, manually add:

"type": "commonjs",
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "jest"
}


to run with nodemon:

npm run dev