INSERT INTO `registry` (date, expire, centreId, licenseId)
SELECT DATE_ADD(expire, INTERVAL 1 DAY), DATE_ADD(expire, INTERVAL 18 MONTH) + INTERVAL 1 DAY, centreId, licenseId
FROM registry
WHERE expire < CURRENT_DATE();
