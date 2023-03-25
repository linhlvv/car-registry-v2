import random
import io
from datetime import datetime
from datetime import time
import datetime

# Tạo 1000 tên công ty
ran_names = []
heads = ["Công ty", "Văn Phòng", "Trung tâm",
         "Đại lý", "Trụ sở", "Nhà máy", "Chi nhánh"]
mids = ["Cổ phần", "TNHH", "TNHH MTV", "Liên doanh", "Liên kết"]
acts = ["Sản xuất", "Kinh doanh", "Dịch vụ", "Du lịch", "Công nghệ", "Bất động sản", "Giáo dục", "Y tế", "Năng lượng", "Môi trường", "Hoá chất",
        "Quảng cáo", "Giải trí", "Tài chính", "Điện tử", "Thương mại", "Vận chuyển", "Phát triển", "Tư vấn khởi nghiệp", "Logistics", "Viễn thông", ""]
name_p1 = ["David", "Vodka", "Vladimir", "Viktor", "Hữu", "Văn", "Hữu", "Thị", "Gia", "An", "Hoài",
           "Thanh", "Minh", "Ngọc", "Thuỳ", "Hồng",
           "Bảo", "Đức", "Quốc", "Thịnh", "Duy", "Trung", "Michael", "Emily", "William", "Elizabeth", "Alex", "Victoria", "James", "Johny", "Honey"]
name_p2 = ["Suy", "Quang", "Tuấn", "Ân", "Linh", "Quân", "Long", "Nam",
           "Phong", "Thắng", "Vũ", "Bình", "Đức", "Hoàng", "Minh", "Phúc", "Tú", "Vi"]

for i in range(1000):
    name = random.choice(heads) + " " + random.choice(mids) + " " + random.choice(
        acts) + " " + random.choice(name_p1) + " " + random.choice(name_p2)
    ran_names.append(name)

# Tạo 1000 địa chỉ khác nhau
ran_adds = []

street = ["Trần Thái Tông", "Đốc Thiết", "Nguyễn Trãi", "Lê Lợi", "Phan Chu Trinh", "Bà Triệu", "Phạm Hùng", "Lê Mao", "Nguyễn Văn Cừ", "Hồ Tùng Mậu", "Trần Quốc Hoàn", "Quang Trung", "Mai Hắc Đế", "Phạm Ngọc Thạch", "Thái Hà", "Lê Nin", "Huỳnh Thúc Kháng",
          "Phan Đình Phùng", "Đình Thôn", "Hà Huy Tập", "Lý Thái Tổ", "Trần Nhân Tông", "Trần Quốc Vượng", "Nguyễn Phong Sắc", "Đinh Tiên Hoàn", "Âu Cơ", "Võ Thị Sáu", "Trần Quang Diệu", "Nguyễn Văn Cừ", "Hồng Bàng", "Trần Phú", "Lý Thường Kiệt", "Lê Văn Lương"]
ward = ["Hưng Bình", "Mỹ Đình", "Dịch Vọng", "Dịch Vọng Hậu", "Tân Mai", "Trung Hoà", "Linh Đàm", "Bến Thành", "Hoàng Văn Thụ", "Tân Thành", "Hoà Xuân", "Phú Hưng", "Tân Định",
        "Trường Thi", "Trung đô", "Phúc Yên", "Tân Yên", "Hưng An", "An Hoà", "Long Bình", "Yên Sở", "Phú Đô", "Nghĩa Tân", "Bắc Sơn", "Quang Minh", "Hà Huy Tập", "Trung Hoà"]
district = ["Cầu Giấy", "Đống Đa", "Ba Đình", "Hai Bà Trưng", "Hoàn Kiếm", "Hoàng Mai", "Long Biên", "Tây Hồ", "Thanh Xuân", "Bắc Từ Liêm", "Cầu Giấy", "Đống Đa",
            "Hà Đông", "Hai Bà Trưng", "Hoàn Kiếm", "Hoàng Mai", "Long Biên", "Nam Từ Liêm", "Tây Hồ", "Thanh Xuân", "Ba Đình", "Sơn Trà", "Bình Thạnh", "Hải Châu", "Thanh Khê"]
province = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên",
            "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"]

for i in range(1000):
    ran_add = "số " + str(random.randrange(1, 200)) + ", " + random.choice(street) + ", " + \
        random.choice(ward) + ", " + random.choice(district) + \
        ", " + random.choice(province)
    ran_adds.append(ran_add)

phones = []
for i in range(1000):
    phone = "09"
    for i in range(10):
        phone += str(random.randrange(0, 9))
    phones.append(phone)

taxes = []
for i in range(1000):
    tax = ""
    for i in range(9):
        tax += str(random.randrange(0, 9))
        if (i == 2 or i == 5):
            tax += "-"
    taxes.append(tax)

# Tạo file text và ghi danh sách biển số xe vào file
with io.open('./sql/company.sql', 'w', encoding='utf-8') as f:
    f.write("\n".join(["insert into `owner` (`type`) VALUES ('0');\n" +
                       "insert into `company` (`id`, `address`, `phone`, `name`, `taxnum`) values ("
                       + "(SELECT MAX(ID) FROM `owner`), '" + address 
                       + "', '" + phone + "', '" + name + "', '" + tax + "');"
            for address, name, phone, tax in zip(ran_adds, ran_names, phones, taxes)]))
    f.close()
