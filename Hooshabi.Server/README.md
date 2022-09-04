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
