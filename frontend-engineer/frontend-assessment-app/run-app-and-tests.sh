#!/bin/bash

#Run npm start in the background
npm start &

#Capture the process ID of the npm start command
START_PID=$!

#Wait for the application to start up
echo "Waiting for the application to start..."
sleep 5 

#Run npm test
echo "Running tests..."
npm test

#Kill the npm start process after tests complete
kill $START_PID

echo "Tests completed, and applicatio n stopped."