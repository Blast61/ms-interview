## How to Start this Submission

## Summary
I have created a bash script to both build the Docker image, and run the Docker container. Once this has completed the command opens up the container in either a Google Chrome browser, or if Chrome is not found in your local machine then it will open the container in Safari. 

## Steps to Run Script
1. Open your terminal 
2. Run the following command ``` ./build_and_run.sh```





## DevOps Engineer Prompt Responses

1. Once having executed the script as specified earlier, the process includes the following steps
    * Building the image by compiling all necessary dependencies and configurations into a Docker image
    * A Docker container is then started based on the image and exposes the Flask application on port 5000 of your localhost.
    * As described in the build_and_run.sh file the excutable then runs the command to open the application in Google Chrome, if Chrome is not available I added an else clause to open the application in Safari at 127.0.0.1:5000. 
    * The output is the running application running on either localhost5000 in Chrome or 127.0.0.1:5000 in Safari. 

2. No this solution is not production ready. For 'production' level code I would need to address several key aspects that would ensure the scalability and availability of the product. 
    * Configuring Docker container security
    * Optimizing performance by developing scaling, caching and load balancing strategies
    * Improve redundancy and failover capacity by leveraging Orchestration tools (K8s/Docker Swarm)
    * Implementation of a CI/CD pipeline to automate testing, deployment, and updates
    * Setup monitoring tools to monitor application health (Prometheus, Grafana, etc.)
    * Production environments and development environments may require different configurations 