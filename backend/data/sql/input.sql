SET @Startdate = '2021-01-01';
SET @Enddate = CURRENT_DATE();

INSERT INTO registry (centreId, licenseId, date, expire)
SELECT regId, lisId, date, DATE_ADD(date, INTERVAL 18 MONTH) AS expire
FROM (
  SELECT 
    MIN(centre.id) AS regId, 
    vehicles.licenseId AS lisId, 
    DATE_ADD(@Startdate, INTERVAL ROUND(RAND()*(DATEDIFF(@Enddate, @Startdate)+1)) DAY) AS date
  FROM centre
  CROSS JOIN vehicles
  WHERE NOT EXISTS (
    SELECT 1
    FROM registry
    WHERE registry.centreId = centre.id
  )
  AND NOT EXISTS (
    SELECT 1
    FROM registry
    WHERE registry.licenseId = vehicles.licenseId
  )
  GROUP BY vehicles.licenseId
  ORDER BY vehicles.licenseId
  LIMIT 370
) t;