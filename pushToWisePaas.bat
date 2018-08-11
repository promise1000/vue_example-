pause
cf login -a api.wise-paas.com -u 用户名 -p 用户密码
pause
cf push --no-start
pause
cf bs eneDeviceCloud-Dataworker-DataArchiver-procdata mongodb
pause
cf start eneDeviceCloud-Dataworker-DataArchiver-procdata
:: cf stop eneDeviceCloud-Dataworker-DataArchiver-procdata
pause
