# Provides regular expression support 
import re

# Approach: Develop a class based solution to sort input text file alphanumerically 
class SortTextFile:
    def __init__(self, input_file, output_file):
        """
        Initializes a SortTextFile object with input and output file paths.

        Args:
        - input_file (str): Path to the input text file.
        - output_file (str): Path to the output text file where sorted lines will be written.
        """
        self.input_file= input_file
        self.output_file = output_file

    def read_file(self):
        """
        Reads lines from the input file and stores them in self.lines.

        Raises:
        - IOError: If there is an error reading the input file.
        """
        try:
            with open(self.input_file, 'r') as file:
                self.lines = file.readlines()
        except IOError as e:
            print(f"Error reading {self.input_file}: {e}")
            self.lines = []
   
    def extract_number_and_string(self, line):
        """
        Extracts a number and the rest of the string from the given line using a regular expression.

        Args:
        - line (str): The line from which to extract the number and string.

        Returns:
        - tuple: A tuple containing the extracted number and the rest of the string.
        """
        #RegEx Explanation
        # (\d+): Matches one or more digits [0-9] at the beginning of the string and captures them as group(1)
        # (.*): Matches any characters (except newline) zero or more times and captures them as group(2)
        match = re.match(r"(\d+)(.*)", line) 
        if match:
            number = int(match.group(1)) #Pulls out the number from the string
            rest_of_string = match.group(2).strip() #Assigned with the remainder of the string
            return (number, rest_of_string)
        return (0, line.strip()) #Default if no match exists
        
    def sort_lines(self):
        """
        Sorts the lines stored in self.lines based on extracted numbers.
        """
        self.lines.sort(key=self.extract_number_and_string)
    
    def write_file(self):
        """
        Writes the sorted lines to the output file.

        Raises:
        - IOError: If there is an error writing to the output file.
        """
        try:
            with open(self.output_file, 'w') as file:
                file.writelines(self.lines)
        except IOError as e:
            print(f"Error writing to {self.output_file}: {e}")
    
    def process(self):
        """
        Executes the full process of reading, sorting, and writing to files.
        """
        self.read_file()
        self.sort_lines()
        self.write_file()

if __name__ == '__main__':
    input_file = 'example-list.txt'
    output_file = 'sorted-output-list.txt'
    sorter = SortTextFile(input_file, output_file)
    sorter.process()