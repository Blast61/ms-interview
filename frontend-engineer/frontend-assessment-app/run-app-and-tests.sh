#!/bin/bash

#Run npm start in the background
npm start &

#Wait for the application to start up
echo "Waiting for the application to start..."
sleep 5 

#Open the application in the default browser
open http://localhost:3000

#Run npm test
echo "Running tests..."
npm test
