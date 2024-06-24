# Official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements and os-requirement files
COPY requirements.txt .
COPY os-requirements.txt .

# Install needed Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
# Install OS level dependencies
RUN apt-get update && xargs -a os-requirements.txt apt-get install -y
# Copy the rest of the application code
COPY . . 

# Expose port 5000 
EXPOSE 5000

# Command to run the application 
CMD ["python", "server.py"]
