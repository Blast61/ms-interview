#!/bin/bash

#Define paths to files
SORT_FILE="sort_list.py"
TEST_FILE="tests/test_sort_list.py"

# Run sort_list script
echo "Running sort_list.py..."
python3 "$SORT_FILE"

# Run the testing script
echo "Running test_sort_list.py"
python3 "$TEST_FILE"