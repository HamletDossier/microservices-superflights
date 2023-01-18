import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientProxySuperFlights } from "./client-proxy";

@Module({
	providers:[ClientProxySuperFlights],
	exports:[ClientProxySuperFlights]
})

export class ProxyModule{}