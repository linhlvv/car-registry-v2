import random
import io
from datetime import datetime
from datetime import time
import datetime


# Tạo danh sách mã đăng kiểm
cerIDs = []
for i in range(3330):
    cerID = str(random.randrange(0, 9)) + str(random.randrange(0, 9)) + str(random.randrange(0, 9)) + str(random.randrange(0, 9)) + "-" + str(random.randrange(0, 9)) + str(random.randrange(0, 9)) + \
        str(random.randrange(0, 9))+str(random.randrange(0, 9)) + "-" + str(random.randrange(0, 9)) + \
        str(random.randrange(0, 9)) + \
        str(random.randrange(0, 9)) + str(random.randrange(0, 9))
    cerIDs.append(cerID)

# Tạo danh sách các mã vùng phổ biến
area_codes = ['11', '12', '14', '15', '16', '17', '18', '19',
              '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
              '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
              '40', '41', '43', '47', '48', '49',
              '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',
              '60', '61', '62', '63', '64', '65', '66', '67', '68', '69',
              '70', '71', '72', '73', '74', '75', '76', '77', '78', '79',
              '81', '82', '83', '84', '85', '86', '88', '89',
              '90', '92', '93', '94', '95', '97', '99']

# Tạo ngày sản xuất ngẫu nhiên

random_dates = []

# Sửa chữa?
modifieds = []
modify_dates = []

# Tạo danh sách info xe
brands = ['Toyota', 'Ford', 'Honda', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Jeep', 'Lexus', 'Infiniti', 'Cadillac', 'GMC', 'Dodge', 'Chrysler', 'Volvo', 'Mitsubishi', 'Buick',
          'Ram', 'Land Rover', 'Porsche', 'Acura', 'Lincoln', 'Jaguar', 'Tesla', 'Fiat', 'Mini', 'Smart', 'Scion', 'Suzuki', 'Isuzu', 'Maserati', 'Ferrari', 'Lamborghini', 'Bentley', 'Rolls-Royce', 'McLaren', 'Bugatti', 'Pagani', 'Koenigsegg']

models = ['Camry', 'F-150', 'Civic', 'Silverado', 'Altima', '3 Series', 'E-Class', 'A4', 'Jetta', 'Elantra', 'Sorento', 'CX-5', 'Outback', 'Grand Cherokee', 'RX', 'Q50', 'ATS', 'Sierra', 'Challenger', '300', 'XC90', 'Outlander', 'Encore',
          '1500', 'Range Rover', '911', 'MDX', 'Continental', 'XF', 'Model S', '500', 'Cooper', 'Fortwo', 'FR-S', 'SX4', 'Trooper', 'GranTurismo', '458 Italia', 'Aventador', 'Continental GT', 'Phantom', 'P1', 'Chiron', 'Huayra', 'Regera']

years = [i for i in range(2015, 2019)]
ran_cars = []
manu_dates = []
for i in range(3330):
    modified = random.random() >= 0.5
    modifieds.append(modified)
    brand = random.choice(brands)
    model = random.choice(models)
    year = random.choice(years)
    ran_car = (str(brand) + "', '" + str(model) + "', '" + str(year))
    ran_cars.append(ran_car)
    start_date = datetime.date(year, 1, 1)
    end_date = datetime.date(2020,12,31)
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    random_dates.append(random_date)
    start_date = random_date
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    manu_dates.append(random_date)
    if modified == True:
        start_date = random_date
        end_date = datetime.date.today()
        time_between_dates = end_date - start_date
        days_between_dates = time_between_dates.days
        random_number_of_days = random.randrange(days_between_dates)
        random_date = start_date + \
            datetime.timedelta(days=random_number_of_days)
        modify_dates.append(random_date)
    else:
        random_date = "NULL"
        modify_dates.append(random_date)

# Tạo danh sách 3330 biển số xe
license_plates = []
acodes = []
for i in range(3330):
    # Chọn một mã vùng ngẫu nhiên
    area_code = random.choice(area_codes)
    acodes.append(area_code)
    # Tạo một ký tự chữ cái ngẫu nhiên
    letter = random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    # Tạo 5 số ngẫu nhiên
    numbers = ""
    for i in range(5):
        numbers += str(random.randrange(0, 9))
        if (i == 2):
            numbers += '.'
    # Kết hợp mã vùng, chữ cái và 5 số để tạo biển số xe
    license_plate = area_code + letter + '-' + numbers
    license_plates.append(license_plate)


# Tạo file text và ghi danh sách biển số xe vào file
with io.open('./backend/sql_generate/sql/vehicles.sql', 'w', encoding='utf-8') as f:
    f.write("\n".join(["insert into `vehicles` (`certId`, `certDate`, `licenseId`, `regionId`, `ownerId`, `brand`, `model`, `version`, `manafractureDate`, `modified`, `modifyDate`) select '"
                       + str(id) + "', '" + str(manuDate) + "', '"
                       + plate + "', '" + acode + "', "
                          + "max(id), '"
                       + info + "', '" + str(time) + "', '"
                       + str(int(modify)) + "', " + (str(modifyDate) if str(modifyDate)=='NULL' else "'"+str(modifyDate)+"'") + " "
                       + "from owner where type = 1 and id not in (select owner.id from owner right join vehicles on owner.id=vehicles.ownerId);"
            for acode, plate, id, info, time, manuDate, modify, modifyDate in zip(acodes, license_plates, cerIDs, ran_cars, random_dates, manu_dates, modifieds, modify_dates)]))
    f.close()