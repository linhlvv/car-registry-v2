# Mở file input để đọc nội dung
with open('backend/sql_generate/sql/input.sql', 'r') as input_file:
    content = input_file.read()

# Mở file output để ghi nội dung
with open('backend/sql_generate/sql/output.sql', 'w') as output_file:
    # Sinh 100 bản sao
    for i in range(9):
        # Ghi nội dung vào file output
        output_file.write(f'{content}\n')
