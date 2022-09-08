modify HooshabiTemplate\Hooshabi.Server\src\Host\Configurations\database.json  for sql connection string.


modify HooshabiTemplate\Hooshabi.Server\src\Host\Configurations\hangfire.json for connection string.


follow as below: 

cd src/Host
dotnet build


make sure ef tools is installed as below:

dotnet tool install --global dotnet-ef


for installing DB:

dotnet ef database update --context Hooshabi.Server.Infrastructure.Multitenancy.TenantDbContext

dotnet ef database update --context Hooshabi.Server.Infrastructure.Persistence.Context.ApplicationDbContext


cd src/Host
dotnet build
dotnet run

The server is listening for port 5000 and 5001.


For client follow as below: 

HooshabiTemplate\Hooshabi.Client

cd src/Host
dotnet build
dotnet run


run this on browser https://localhost:5002


login info:
email: admin@root.com
pass: 123Pa$$word!
tenant: root



Hangfire Info:
User: Admin
Password: S3(r3tP@55w0rd"



For testing only Services with Swagger:

goto https://localhost:5001/swagger/index.html

run the API /api/tokens  with tenant: root and the body below

{
  "email":"admin@root.com",
    "password":"123Pa$$word!"
}

copy the token from response to Swagger Authorize button on top of the page.

then call the apis.



The Features

 Built on .NET 6.0 \
 Follows Clean Architecture Principles \
 Domain Driven Design \
 Completely Documented at fullstackhero.net\
 Multi Tenancy Support with Finbuckle\
 Create Tenants with Multi Database / Shared Database Support\
 Upgrade Subscription of Tenants - Add More Validity Months to each tenant! \
 Supports MySQL, MSSQL, Oracle & PostgreSQL! \
 Uses Entity Framework Core as DB Abstraction \
 Flexible Repository Pattern \
 Dapper Integration for Optimal Performance \
 Serilog Integration with various Sinks - File, SEQ, Kibana \
 OpenAPI - Supports Client Service Generation \
 Mapster Integration for Quicker Mapping \
 API Versioning \
 Response Caching - Distributed Caching + REDIS \
 Fluent Validations \
 Audit Logging \
 Advanced User & Role Based Permission Management \
 Code Analysis & StyleCop Integration with Rulesets \
 JSON Based Localization with Caching \
 Hangfire Support \
 File Storage Service \
 Test Projects \
 JWT & Azure AD Authentication \
 MediatR - CQRS \
 SignalR Notifications \
