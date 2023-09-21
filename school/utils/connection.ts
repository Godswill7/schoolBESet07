import amqp from "amqplib";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const amqpServer = "amqps://eznwrdsq:O7Ifjraf6rBIlyiynUYQ1Bmbsr1w6pmv@fish.rmq.cloudamqp.com/eznwrdsq";

const consumerService = async (queue: string) => {
    try {
        const connect = await amqp.connect(amqpServer);
        const channel = await connect.createChannel();

        await channel.assertQueue(queue);

        await channel.consume(queue, async (message: any) => {
            let res = JSON.parse(message.content.toString());

            const classify: any = await prisma.classModel.findUnique({
                where: { id: res?.id },
            });

            classify?.students?.push(res)

            // const classy : any = await prisma.classModel.findUnique({
            //     where: { id: res?.className },
            // });

            // if (classify === ) {
                
            // }

            console.log(classify);

            await channel.ack(message);
        });
    } catch (error) {
        console.log("error connecting...");
    }
};

export { consumerService };