TRUNCATE TABLE bi_data.`price_weekly`;
INSERT INTO bi_data.`price_weekly`
SELECT 
DATE_FORMAT(a.`datadate`,'%x-%v周') AS c0
,b.`cityid` AS c1
,CASE WHEN housetype = 'Apartment/Condo' THEN 'Apartment/Condo'
      WHEN housetype IN ('House with Acreage','House/Single Family') THEN 'House'
      ELSE 'Townhouse' END AS c2

,AVG(CAST(TRIM(REPLACE(REPLACE(price,'$',''),',','')) AS SIGNED)
/CASE WHEN CAST(TRIM(REPLACE(REPLACE(areas,'sqft.',''),',','')) AS SIGNED) = 0 THEN CAST(TRIM(REPLACE(REPLACE(parking,'sq.ft.',''),',','')) AS SIGNED)
      ELSE CAST(TRIM(REPLACE(REPLACE(areas,'sqft.',''),',','')) AS SIGNED) END) AS c4
FROM app.`app_listing` a
LEFT JOIN app.`t99_cityname` b
ON a.`cityname` = b.`srcdata`
WHERE housetype IN ('House with Acreage','House/Single Family','Apartment/Condo','Townhouse')
AND a.datadate > STR_TO_DATE('20180301','%Y%m%d')
AND b.cityid IS NOT NULL
GROUP BY c0,c1,c2
ORDER BY c0 ASC;
