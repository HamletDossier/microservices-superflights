import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQ } from "../constants";

@Injectable()
export class ClientProxySuperFlights{
	constructor(private readonly config:ConfigService){}

	ClientProxyUsers(): ClientProxy{
		return ClientProxyFactory.create({
			transport: Transport.RMQ,
			options:{
				urls:this.config.get('AMQP_URL'),
				queue:RabbitMQ.UserQueue,
			}
		})
	}

	ClientProxyPassengers():ClientProxy{
		return ClientProxyFactory.create({
			transport: Transport.RMQ,
			options:{
				urls:this.config.get('AMQP_URL'),
				queue:RabbitMQ.PassengerQueue
			}
		})
	}

	ClientProxyFlights():ClientProxy{
		return ClientProxyFactory.create({
			transport:Transport.RMQ,
			options:{
				urls:this.config.get('AMQP_URL'),
				queue:RabbitMQ.FlightQueue
			}
		});
	}
}