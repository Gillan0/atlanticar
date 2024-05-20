SELECT * FROM request as r JOIN account as c ON c.id = r.author WHERE c.user = 'JC';


SELECT c1.user as candidate, r.departure, r.arrival, r.date, c2.user as author 
FROM apply_request as cr 
JOIN account as c1 ON c1.id = cr.candidate 
JOIN account as c2 ON c2.id = cr.author 
JOIN request as r ON r.id = cr.id_request;
