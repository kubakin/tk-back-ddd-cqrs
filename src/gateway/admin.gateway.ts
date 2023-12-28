// import {
//   ConnectedSocket,
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   OnGatewayInit,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer
// } from "@nestjs/websockets";
// import { Server, Socket } from "socket.io";
// import { Logger } from "@nestjs/common";
//
// const wsPort = 3030;
//
// @WebSocketGateway(wsPort, { cors: "*", path: "/" })
// export class AdminGateway
//   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
//   constructor() {
//   }
//
//   @WebSocketServer() public server: Server;
//   private logger: Logger = new Logger("Admin Gateway");
//
//   afterInit(server: Server) {
//     console.log(server);
//     this.logger.log(`WS server listening on port ${wsPort}`);
//   }
//
//   handleDisconnect(client: Socket) {
//     this.logger.log(`Client disconnected: ${client.id}`);
//   }
//
//   handleConnection(client: Socket, ...args: any[]) {
//     this.logger.log(`Client connected: ${client.id}`);
//   }
//
//   @SubscribeMessage("join-admin")
//   handleJoin(@ConnectedSocket() client: Socket, @MessageBody() teamId: string) {
//     client.join("admin");
//   }
//
//   notifyMsg({
//               text,
//               teamId,
//               id,
//               userId
//             }: {
//     text: string;
//     teamId: string;
//     id: string;
//     userId: string;
//   }) {
//     this.server.to("admin").emit("message", { text, id, teamId, userId });
//   }
// }
