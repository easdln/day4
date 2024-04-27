select t.*, a.Name,[Type] = iif(t.TypeName = 'Coming','Приход','Расход') from (
select m.VCode, md.Article, Sum = md.[Sum] ,m.TypeName, m.DocumentDate
from Movement m
join MovementDetail md on md.PCode = m.VCode
where m.TypeName = 'Coming' and m.DocumentDate between @BDate and @EDate
and (@Type is null or @Type = 1)
union all
select m.VCode, md.Article, Sum = -md.[Sum] ,m.TypeName, m.DocumentDate
from Movement m
join MovementDetail md on md.PCode = m.VCode
where m.TypeName = 'Rate' and m.DocumentDate between @BDate and @EDate
and (@Type is null or @Type = 2)
) t
left join Article a on a.VCode = t.Article