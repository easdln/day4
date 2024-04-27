CREATE FUNCTION dbo.GetPriceLists
(
 @Material bigint
)
RETURNS TABLE
AS
RETURN
(
 select p.DocumentDate, p.VCode
 , Material = m.Name
 , MaterialGroup = mg.Name
 , d.Price
 from dbo.PriceListDetail d
 inner join dbo.PriceList p on p.VCode = d.PCode
 inner join dbo.Material m on m.VCode = d.Material
 left join dbo.MaterialGroup mg on mg.VCode = m.MaterialGroup
 where (@Material > 0 and d.Material = @Material)
 or (@Material = 0)
)