import random
import io
from datetime import datetime
from datetime import time
import datetime
from unidecode import unidecode
import string

# Tạo account
accounts = []


# Tạo 1000 tên công ty
ran_names = []
heads = ["Trung tâm Đăng kiểm"]
name_p1 = ["David", "Vodka", "Vladimir", "Viktor", "Hữu", "Văn", "Hữu", "Thị", "Gia", "An", "Hoài",
           "Thanh", "Minh", "Ngọc", "Thuỳ", "Hồng",
           "Bảo", "Đức", "Quốc", "Thịnh", "Duy", "Trung", "Michael", "Emily", "William", "Elizabeth", "Alex", "Victoria", "James", "Johny", "Honey"]
name_p2 = ["Suy", "Quang", "Tuấn", "Ân", "Linh", "Quân", "Long", "Nam",
           "Phong", "Thắng", "Vũ", "Bình", "Đức", "Hoàng", "Minh", "Phúc", "Tú", "Vi"]

for i in range(100):
    part_name = random.choice(name_p1) + " " + random.choice(name_p2)
    name = random.choice(heads) + " " + part_name
    ran_names.append(name)
    short = unidecode(part_name.lower().replace(" ",""))
    acc = str(short) + "@ttdk.vn"
    accounts.append(acc)
    

# Tạo 1000 địa chỉ khác nhau
ran_diss = []
ran_pros = []

district = ["Cầu Giấy", "Đống Đa", "Ba Đình", "Hai Bà Trưng", "Hoàn Kiếm", "Hoàng Mai", "Long Biên", "Tây Hồ", "Thanh Xuân", "Bắc Từ Liêm", "Cầu Giấy", "Đống Đa",
            "Hà Đông", "Hai Bà Trưng", "Hoàn Kiếm", "Hoàng Mai", "Long Biên", "Nam Từ Liêm", "Tây Hồ", "Thanh Xuân", "Ba Đình", "Sơn Trà", "Bình Thạnh", "Hải Châu", "Thanh Khê"]
province = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên",
            "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"]

for i in range(1000):
    ran_dis = random.choice(district)
    ran_diss.append(ran_dis) 
    ran_pro = random.choice(province)
    ran_pros.append(ran_pro)

# Activation date
act_dates = []
start_date = datetime.date(1990, 1, 1)
end_date = datetime.date(2015, 1, 1)
for i in range(1000):
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    act_dates.append(random_date)

#Tạo mật khẩu ngẫu nhiên
def generate_random_string(length):
    letters_and_digits = string.ascii_letters + string.digits
    return ''.join(random.choice(letters_and_digits) for i in range(length))
passwords = []
for i in range(100):
    random_string = generate_random_string(8)
    passwords.append(random_string)

# Tạo file text và ghi danh sách biển số xe vào file
with io.open('sql_generate/sql/account_centre.sql', 'w', encoding='utf-8') as f:
    f.write("\n".join(["insert into `account` (`email`, `password`, `type`) values ('" + email + "', '" + pw + "', '0');\n" 
                   + "insert into `centre` (`id`, `name`,`city`,`district`,`activation`) values ((SELECT MAX(ID) FROM `account`), '" + name + "', '" + province + "', '" + district + "', '" + str(date) + "');" 
        for name, province, district, date, email, pw  in zip(ran_names, ran_pros, ran_diss, act_dates, accounts, passwords)]))


