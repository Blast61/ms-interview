# Debian-based image that supports both Python2 and Python3 packages
FROM debian:buster-slim

# Install Python3 and the python-dev package
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python-dev \
    tini \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory in the  container
WORKDIR /app 


# Copy requirements and os-requirement files
COPY requirements.txt .


# Install needed Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . . 

# Expose port 5000 
EXPOSE 5000

# Command to run the application 
CMD ["python3", "app.py"]
