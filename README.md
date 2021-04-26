Context: Your company is recruiting lawyers. You have a prepared csv file, which contains employee data in the following format:

1) Full name
2) Phone
3) Email
4) Age
5) Experience
6) Yearly Income
7) Has children
8) License states
9) Expiration date
10) License number

You need to import the data and display it in a table. If the data is filled in incorrectly - the corresponding cell should be highlighted in red.

# Validation rules:
1) Data can have a space before or after the text, so it should be ignored.
2) Email and Phone must be unique within the file. AlexCho@cho.com is the same as alexCHO@CHO.coM. The Duplicate with column should show the ID of the first row found, which duplicates the current email / phone.
3) Age - must be of type integer. Not less than 21 years.
4) Experience - greater than or equal to 0 (not more than current Age - 21).
5) Yearly income - can be integer or decimal, but always displayed with two decimal places. Not more than 1 million.
6) All numeric values should be > = 0 (depending on the field - age cannot be 0).
7) License states - can be abbreviated or have a full name (AL, Alabama). However, they are displayed only in a short format. There can be several values, separated by a vertical line | .
8) Expiration date - can be accepted in two formats (YYYY-MM-DD or MM / DD / YYYY). Everything else is a mistake. Cannot be less than the current date.
9) Phone - should be displayed in the format + 1xxxxxxxxxx (ten characters after +1). However, you can import in the following formats: + 1хххххххххх, 1хххххххххх, хххххххххх.
10) Has children - is accepted as TRUE / FALSE values. An empty cell is accepted as FALSE. Everything else is a mistake.
11) License number - 6 characters consisting of numbers or text characters.
12) Full Name / Phone / Email are required fields. If one of them is not present - instead of the table it is necessary to show the message that the file is not correct. Show the same message if the file format is not csv. If the title name has another case - 'full Name', the field is considered valid.
