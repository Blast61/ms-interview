## Summary
I have created a bash script ```build_and_run.sh``` to automate the Docker image building, and container running processes. Upon completion, the script opens the Docker container in either a Google Chrome browser or Safari browser. All aspects of the code, including the Dockerfile configuration and bash script development, were independently implemented. Optimizations in the Dockerfile structure and bash script logic were made based on recommendations from ChatGPT, an AI language model, in efforts to improve submission performance. Thank you for your time and consideration!

## Steps to Run Script
1. Open your terminal 
2. Ensure you are in the `devops-engineering/app` directory 
3. Run the following command ``` ./build_and_run.sh```

## Added File Documentation

```build_and_run.sh``` : Contains scripting logic to automate the building of the Docker image and the running of the Docker container

```Dockerfile```: Sets up a Debian-based environment suitable for Python development, supporting both Python 2 and Python 3 packages with necessary dependencies and configurations, and to host the application on port 5000 within a Docker container.




## DevOps Engineer Prompt Responses

1. Upon starting the application, the process includes the following steps

    * Building the image by compiling all necessary dependencies and configurations into a Docker image

    * A Docker container is then started based on the image and exposes the Flask application on port 5000 of your localhost.

    * As described in the build_and_run.sh file the excutable then runs the command to open the application in Google Chrome, if Chrome is not available I added an else clause to open the application in Safari at 127.0.0.1:5000. 

    * The output is that the container is available and running in a web browser in Chrome at ```http://localhost:5000``` or in Safari at ```http://127.0.0.1:5000```     



2. No this solution is not production ready. For 'production' level code I would need to address the following key aspects that would ensure the scalability and availability of the product. 
    * Configuring Docker container security
    * Optimizing performance by developing scaling, caching and load balancing strategies
    * Improve redundancy and failover capacity by leveraging Orchestration tools (K8s/Docker Swarm)
    * Implementation of a CI/CD pipeline to automate testing, deployment, and updates
    * Setup monitoring tools to monitor application health (Prometheus, Grafana, etc.)
    * Production environments and development environments may require different configurations 


## Integrity Guidelines Disclosure
    * I believe in development efficiency and utilize the assistance of Large Language Models such as ChatGPT for debugging, syntax concerns, and logic related questions.