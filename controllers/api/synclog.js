var index2 = async(ctx, next) => {
	ctx.rest({
		a: 'a',
		b: 'b'
	});
};

function db(ctx) {
	var req = ctx.req
	var conn;
	if (ctx.params.site == 'US' || ctx.params.site == 'US') {
		conn = process.env.SQL_CON_US;
	}
	return new require('../../da/sql_db')(conn);
}

var formmatSql = function(sql, params) {
	var l = params.length;
	for (var i = params.length - 1; i >= 0; i--) {
		var key = "{" + i + "}";
		sql = sql.replace(key, params[i]);
	}
	return sql;
}
var getSyncLogSummary = async(ctx, next) => {
	var q = "SELECT *FROM (	SELECT DataName AS dataName,Status AS [status],COUNT(1) AS c FROM dbo.IntegrationLog with(nolock) GROUP BY DataName, Status ) as s PIVOT(    SUM([c])    FOR [status] IN (New,NoNeedUpload,UpdateSuccess,Exception,Processing,Inqueue))AS pvt";
	r = await db(ctx).select(q);
	ctx.rest(r);
}

var getSyncErrors = async(ctx, next) => {
	var q = "SELECT ID, DataName,Destination,Key1,key2,Key3,Result,EntityXml,PostEntityXml,SyncTimes,CreatedBy,CreatedDttm,UpdatedDttm FROM dbo.IntegrationLog WHERE Status='exception' ORDER BY CreatedDttm DESC";
	r = await db(ctx).select(q);
	ctx.rest(r);
}

var getSyncErrorByID = async(ctx, next) => {
	var q = "SELECT ID, DataName,Destination,Key1,key2,Key3,Result,EntityXml,PostEntityXml,SyncTimes,CreatedBy,CreatedDttm,UpdatedDttm FROM dbo.IntegrationLog WHERE ID='" + ctx.params.ID + "'";
	r = await db(ctx).select(q);
	ctx.rest(r);
}

var getDuplicateInvoice = async(ctx, next) => {
	var q = "SELECT InvoiceID,OrderID FROM dbo.FinalInvoiceHeader a WITH(NOLOCK) INNER JOIN dbo.FinalInvoiceDetail b WITH(NOLOCK) ON a.FinalInvoiceID=b.FinalInvoiceID GROUP BY InvoiceID,OrderID HAVING COUNT(DISTINCT a.FinalInvoiceID)>1";
	r = await db(ctx).select(q);
	ctx.rest(r);
}

var getCustomerMonthlySummary = async(ctx, next) => {
	var q =
		`;WITH tmp AS( 
	SELECT a.UserID,b.LoginName,TotalAmount
	,CONVERT(NVARCHAR(128),YEAR(a.CheckOutDate))+'-'+RIGHT('00'+CONVERT(NVARCHAR(128),MONTH(a.CheckOutDate)),2) AS M 
	FROM dbo.SalesOrder a with(nolock)
	INNER JOIN dbo.CustUserInfo b WITH(NOLOCK) ON a.UserID = b.UserID
	WHERE b.LoginName NOT LIKE '%genewiz%' AND a.IsOrder=1
	--AND a.UserID='46AFE43F-39EA-414E-8D36-C3BE0FCEA20B'
	AND b.LoginName=N'{0}'
	)
	SELECT a.UserID,a.LoginName,a.M,COUNT(1) AS  orders,SUM(a.TotalAmount) AS amount
	FROM tmp a
	GROUP BY a.UserID,a.LoginName,a.M
	ORDER BY a.M DESC
	`
	q = formmatSql(q, [ctx.params.CustomerAccount]);
	r = await db(ctx).select(q);
	ctx.rest(r);
}
var getPIMonthlySummary = async(ctx, next) => {
	var q = `
	--PI layer monthly report
;WITH pitmp AS( 
SELECT p.piid,p.FullName,TotalAmount
,CONVERT(NVARCHAR(128),YEAR(a.CheckOutDate))+'-'+RIGHT('00'+CONVERT(NVARCHAR(128),MONTH(a.CheckOutDate)),2) AS M 
FROM dbo.SalesOrder a with(nolock)
INNER JOIN dbo.CustUserInfo b WITH(NOLOCK) ON a.UserID = b.UserID
LEFT JOIN dbo.CustPI p WITH(NOLOCK) ON b.PiID=p.PIID
WHERE b.LoginName NOT LIKE '%genewiz%' AND a.IsOrder=1
--AND p.PIID='2D00BC20-CA37-4151-AB4A-13BAFC54F2DD'
And p.FullName=N'{0}'
)
SELECT a.piid,a.FullName,a.M,COUNT(1) AS  orders,SUM(a.TotalAmount)  AS amount
FROM pitmp a
GROUP BY a.piid,a.FullName,a.M
ORDER BY a.M DESC
`;
	q = formmatSql(q, [ctx.params.PIName]);
	r = await db(ctx).select(q);
	ctx.rest(r);
}
var getCompanyMonthlySummary = async(ctx, next) => {
	var q = `;WITH pitmp AS( 
SELECT c.CompanyID,c.CompanyName,TotalAmount
,CONVERT(NVARCHAR(128),YEAR(a.CheckOutDate))+'-'+RIGHT('00'+CONVERT(NVARCHAR(128),MONTH(a.CheckOutDate)),2) AS M 
FROM dbo.SalesOrder a with(nolock)
INNER JOIN dbo.CustUserInfo b WITH(NOLOCK) ON a.UserID = b.UserID
LEFT JOIN dbo.CustPI p WITH(NOLOCK) ON b.PiID=p.PIID
LEFT JOIN dbo.CustCompany c WITH(NOLOCK) ON p.CompanyID=c.CompanyID
WHERE b.LoginName NOT LIKE '%genewiz%' AND a.IsOrder=1
--AND c.CompanyID='61D74E0F-477A-4B75-A191-EDBE1000AD9E'
AND c.CompanyName=N'{0}'
)
SELECT a.CompanyID,a.CompanyName,a.M,COUNT(1) AS  orders,SUM(a.TotalAmount)  AS amount
FROM pitmp a
GROUP BY a.CompanyID,a.CompanyName,a.M
ORDER BY a.M DESC
	`;
	q = formmatSql(q, [ctx.params.CompanyName]);
	if (ctx.params.CompanyName == undefined || ctx.params.CompanyName == '') {
		q = `;WITH pitmp AS( 
SELECT TotalAmount
,CONVERT(NVARCHAR(128),YEAR(a.CheckOutDate))+'-'+RIGHT('00'+CONVERT(NVARCHAR(128),MONTH(a.CheckOutDate)),2) AS M 
FROM dbo.SalesOrder a with(nolock)
INNER JOIN dbo.CustUserInfo b WITH(NOLOCK) ON a.UserID = b.UserID
WHERE b.LoginName NOT LIKE '%genewiz%' AND a.IsOrder=1
)
SELECT a.M,COUNT(1) AS  orders,SUM(a.TotalAmount)  AS amount
FROM pitmp a
GROUP BY a.M
ORDER BY a.M DESC`;

	}
	r = await db(ctx).select(q);
	ctx.rest(r);
}
module.exports = {
	'GET /api/t:id': index2,
	'GET /api/synclog': getSyncLogSummary,
	'GET /api/getCompanyMonthlySummary': getCompanyMonthlySummary
};