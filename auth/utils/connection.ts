import amqp from "amqplib";

const amqpServer = "amqps://eznwrdsq:O7Ifjraf6rBIlyiynUYQ1Bmbsr1w6pmv@fish.rmq.cloudamqp.com/eznwrdsq";
let channel: any;
let connect: any;
let result: any;

const publisherConnection = async (queue: string, data: any) => {
    try {
        connect = await amqp.connect(amqpServer);
        channel = await connect.createChannel();

        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log("error connecting...");
    }
};

export { publisherConnection };