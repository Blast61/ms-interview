import unittest
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from sort_list import SortList



class TestSortList(unittest.TestCase):
    def setUp(self):
        print('Entering testing setup...')
        self.test_input_file = 'test-input.txt'
        self.test_output_file = 'test-output.txt'
        self.create_test_input_file()

    def tearDown(self):
        if os.path.exists(self.test_input_file):
            os.remove(self.test_input_file)
        if os.path.exists(self.test_output_file):
            os.remove(self.test_output_file)
    
    def create_test_input_file(self):
        with open(self.test_input_file, 'w') as file:
            file.write("61 Beans\n")
            file.write("3 Quesobirria\n")
            file.write("420Sparky\n")
            file.write("42 fantastic day\n")
            file.write("2 Phones\n")
    
    def test_read_file(self):
        sorter = SortList(self.test_input_file, self.test_output_file)
        sorter.read_file()
        expected_lines = [
            "61 Beans\n",
            "3 Quesobirria\n",
            "420Sparky\n",
            "42 fantastic day\n",
            "2 Phones\n"
        ]
        self.assertEqual(sorter.lines, expected_lines)
    
    def test_extract_number_and_string(self):
        sorter = SortList(self.test_input_file, self.test_output_file)
        self.assertEqual(sorter.extract_number_and_string("61 Beans\n"), (61, "Beans"))
        self.assertEqual(sorter.extract_number_and_string("3 Quesobirria\n"), (3, "Quesobirria"))
        self.assertEqual(sorter.extract_number_and_string("2 Phones\n"), (2, "Phones"))
        self.assertEqual(sorter.extract_number_and_string("420Sparky\n"), (420, "Sparky"))
        self.assertEqual(sorter.extract_number_and_string("42 fantastic day\n"), (42, "fantastic day"))

    def test_sort_lines(self):
        sorter = SortList(self.test_input_file, self.test_output_file)
        sorter.read_file()
        sorter.sort_lines()
        expected_sorted_lines = [
            "2 Phones\n",
            "3 Quesobirria\n",
            "42 fantastic day\n",
            "61 Beans\n",
            "420Sparky\n"
        ]
        self.assertEqual(sorter.lines, expected_sorted_lines)
    
    def test_write_file(self):
        sorter = SortList(self.test_input_file, self.test_output_file)
        sorter.read_file()
        sorter.sort_lines()
        sorter.write_file()
        with open(self.test_output_file, 'r') as file:
            output_lines = file.readlines()
        expected_sorted_lines = [
            "2 Phones\n",
            "3 Quesobirria\n",
            "42 fantastic day\n",
            "61 Beans\n",
            "420Sparky\n"
        ]
        self.assertEqual(output_lines, expected_sorted_lines)

    def test_process(self):
        sorter = SortList(self.test_input_file, self.test_output_file)
        sorter.process()
        with open(self.test_output_file, 'r') as file:
            output_lines = file.readlines()
        expected_sorted_lines = [
            "2 Phones\n",
            "3 Quesobirria\n",
            "42 fantastic day\n",
            "61 Beans\n",
            "420Sparky\n"
        ]
        self.assertEqual(output_lines, expected_sorted_lines)

if __name__ == "__main__":
    unittest.main()