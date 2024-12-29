use car_regist;
-- select * from vehicles;
-- select id from owner where type = 0 and id not in (select owner.id from owner right join vehicles on owner.id=vehicles.ownerId)
-- describe account;
-- show tables;
select 
  v.licenseId as license,
  r.name as region,
  p.name as owner
  from vehicles v 
join region r 
  on v.regionId = r.id 
join owner o 
  on v.ownerId = o.id 
join personal p
  on o.id = p.id
-- left join registry re
--   on v.licenseId = re.licenseId
-- where re.licenseId is null
--   and 
o.type = 1;
select license, region, owner from (
    select  v.licenseId as license, r.name as region, p.name as owner,
    ntile(100) over(order by v.licenseId) as tile_nr
  from vehicles v 
join region r 
  on v.regionId = r.id 
join owner o 
  on v.ownerId = o.id 
join personal p
  on o.id = p.id
where
o.type = 1
) x
where x.tile_nr = 1;

select count(licenseId)
  from vehicles v 
join region r 
  on v.regionId = r.id 
join owner o 
  on v.ownerId = o.id 
join personal p
  on o.id = p.id
where
o.type = 1;
