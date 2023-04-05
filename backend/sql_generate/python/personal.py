from datetime import time
from datetime import datetime
import datetime
import random
import io

# Tạo danh sách họ và tên
first_names = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng",
               "Huỳnh", "Phan", "Vũ", "Võ", "Đặng", "Bùi",
               "Đỗ", "Hồ", "Ngô", "Dương", "Lý", "Trịnh",
               "Đinh", "Mai", "Lê Viết", "Chu", "Cao", "Nghiêm",
               "Lương", "Đoàn", "Tạ", "Tô", "Quách", "Lục", "Hà"]
middle_names = ["Văn", "Hữu", "Thị", "Gia", "An", "Hoài",
                "Thanh", "Minh", "Ngọc", "Thuỳ", "Hồng",
                "Bảo", "Đức", "Quốc", "Thịnh", "Duy", "Trung",
                "Linh", "Phương", "Diệu", "Việt", "Tú", "Hà",
                "Mai", "Nam", "Nhi", "Tâm", "Khánh", "Hải", "Lan"]
last_names = ['Quang', 'Linh', 'Tuấn', 'Dũng', 'Vinh', 'Hiếu',
              'Vương', 'Vượng', 'Công', 'Anh', 'An', 'Cường',
              'Hùng', 'Mạnh', 'Quân', "Dũng", "Huy", "Khang",
              "Long", "Nam", "Phong", "Thắng", "Trung", "Vũ",
              "Chi", "Hà", "Hương", "Lan", "Linh", "Mai", "Ngân",
              "Thảo", "Uyên", "Yến", "Bình", "Đức", "Hoàng", "Minh",
              "Nga", "Phúc", "Tú", "Vy"]

# Tạo danh sách 2220 họ và tên
names = []
for i in range(2220):
    first_name = random.choice(first_names)
    middle_name = random.choice(middle_names)
    last_name = random.choice(last_names)
    name = first_name + ' ' + middle_name + ' ' + last_name
    names.append(name)

# Generate random date of birth
ran_dobs = []
start_dob = datetime.date(1960, 1, 1)
end_dob = datetime.date(2003, 12, 31)
time_between_dates = end_dob - start_dob
days_between_dates = time_between_dates.days
for i in range(2220):
    random_number_of_days = random.randrange(days_between_dates)
    ran_dob = start_dob + datetime.timedelta(days=random_number_of_days)
    ran_dobs.append(ran_dob)

# Generate random ssn
ran_ssns = []
for i in range(2220):
    first_ssn = ""
    for i in range(4):
        first_ssn += str(random.randrange(0, 9))
    second_ssn = ""
    for i in range(4):
        second_ssn += str(random.randrange(0, 9))
    third_ssn = ""
    for i in range(3):
        third_ssn += str(random.randrange(0, 9))
    ran_ssn = str(first_ssn) + "-" + str(second_ssn) + "-" + str(third_ssn)
    ran_ssns.append(ran_ssn)

# Tạo 2220 địa chỉ khác nhau
ran_adds = []

street = ["Trần Thái Tông", "Đốc Thiết", "Nguyễn Trãi", "Lê Lợi", "Phan Chu Trinh", "Bà Triệu", "Phạm Hùng", "Lê Mao", "Nguyễn Văn Cừ", "Hồ Tùng Mậu", "Trần Quốc Hoàn", "Quang Trung", "Mai Hắc Đế", "Phạm Ngọc Thạch", "Thái Hà", "Lê Nin", "Huỳnh Thúc Kháng",
          "Phan Đình Phùng", "Đình Thôn", "Hà Huy Tập", "Lý Thái Tổ", "Trần Nhân Tông", "Trần Quốc Vượng", "Nguyễn Phong Sắc", "Đinh Tiên Hoàn", "Âu Cơ", "Võ Thị Sáu", "Trần Quang Diệu", "Nguyễn Văn Cừ", "Hồng Bàng", "Trần Phú", "Lý Thường Kiệt", "Lê Văn Lương"]
ward = ["Hưng Bình", "Mỹ Đình", "Dịch Vọng", "Dịch Vọng Hậu", "Tân Mai", "Trung Hoà", "Linh Đàm", "Bến Thành", "Hoàng Văn Thụ", "Tân Thành", "Hoà Xuân", "Phú Hưng", "Tân Định",
        "Trường Thi", "Trung đô", "Phúc Yên", "Tân Yên", "Hưng An", "An Hoà", "Long Bình", "Yên Sở", "Phú Đô", "Nghĩa Tân", "Bắc Sơn", "Quang Minh", "Hà Huy Tập", "Trung Hoà"]
district = ["Cầu Giấy", "Đống Đa", "Ba Đình", "Hai Bà Trưng", "Hoàn Kiếm", "Hoàng Mai", "Long Biên", "Tây Hồ", "Thanh Xuân", "Bắc Từ Liêm", "Cầu Giấy", "Đống Đa",
            "Hà Đông", "Hai Bà Trưng", "Hoàn Kiếm", "Hoàng Mai", "Long Biên", "Nam Từ Liêm", "Tây Hồ", "Thanh Xuân", "Ba Đình", "Sơn Trà", "Bình Thạnh", "Hải Châu", "Thanh Khê"]
province = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên",
            "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"]

for i in range(2220):
    ran_add = "số " + str(random.randrange(1, 200)) + ", " + random.choice(street) + ", " + \
        random.choice(ward) + ", " + random.choice(district) + \
        ", " + random.choice(province)
    ran_adds.append(ran_add)

phones = []
for i in range(2220):
    phone = "09"
    for i in range(10):
        phone += str(random.randrange(0, 9))
    phones.append(phone)
# Tạo file text và ghi danh sách biển số xe vào file
with io.open('./backend/sql_generate/sql/personal.sql', 'w', encoding='utf-8') as f:
    f.write("\n".join(["insert into `owner` (`type`) VALUES ('1');\n"
                       + "insert into `personal` (`id`, `dob`, `ssn`, `name`, `address`, `phone`) values ("
                       + "(SELECT MAX(ID) FROM `owner`), '" + str(dob) +
                       "', '" + ssn + "', '" + name + "', '" + address + "', '" + phone + "');"
            for dob, name, ssn, address, phone in zip(ran_dobs, names, ran_ssns, ran_adds, phones)]))
    f.close()