#!/bin/bash

# Build Docker image
docker build -t ms-devops .

# Run Docker container in detached mode and map port 5000
docker run -d -p 5000:5000 ms-devops

# Check if container is running
container_id=$(docker ps -qf "ancestor=ms-devops")

if [ -n "$container_id" ]; then
    echo "Container is running with ID: ${container_id}"

    # Attempt to open in Google Chrome
    {
        open -a "Google Chrome" http://localhost:5000
    } || {
    # If unable to open Chrome then default open container in Safari
        echo "Unable to open with Google Chrome. Opening in Safari..."
        open -a Safari http://127.0.0.1:5000
    }
else
# Respond to user with a message if both fail. 
    echo "Failed to start container."
fi