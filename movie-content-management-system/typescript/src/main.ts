// import readline from "readline";
// import color from "yoctocolors";
// import { OnlineAuctionSystem } from "./models";

// console.log(color.bold(color.cyan("Online Auction System")));
// console.log(color.gray("----------------------------------------"));

// const onlineAuctionSystem = new OnlineAuctionSystem();

// // Predefined methods (make sure these methods exist on OnlineAuctionSystem)
// const methods = {
//   ADD_BUYER: (name: string) => onlineAuctionSystem.addBuyer(name),
//   ADD_SELLER: (name: string) => onlineAuctionSystem.addSeller(name),
//   CREATE_AUCTION: (
//     id: string,
//     lowestBid: number,
//     highestBid: number,
//     participationCost: number,
//     sellerName: string
//   ) =>
//     onlineAuctionSystem.createAuction(
//       id,
//       lowestBid,
//       highestBid,
//       participationCost,
//       sellerName
//     ),
//   CREATE_BID: (buyerName: string, auctionId: string, bidAmount: number) =>
//     onlineAuctionSystem.createBid(buyerName, auctionId, bidAmount),
//   UPDATE_BID: (buyerName: string, auctionId: string, newBidAmount: number) =>
//     onlineAuctionSystem.updateBid(buyerName, auctionId, newBidAmount),
//   WITHDRAW_BID: (buyerName: string, auctionId: string) =>
//     onlineAuctionSystem.withdrawBid(buyerName, auctionId),
//   CLOSE_AUCTION: (auctionId: string) =>
//     onlineAuctionSystem.closeAuction(auctionId),
//   GET_PROFIT: (sellerName: string, auctionId: string) =>
//     onlineAuctionSystem.getProfit(sellerName, auctionId),
//   EXIT: () => {
//     console.log(color.gray("----------------------------------------"));
//     console.log(color.cyan("Exiting. Goodbye! 👋"));
//     process.exit(0);
//   },
// };

// type MethodName = keyof typeof methods;

// // Generic success messages for void methods
// const successMessages: Record<MethodName, string> = {
//   ADD_BUYER: "Buyer added successfully",
//   ADD_SELLER: "Seller added successfully",
//   CREATE_AUCTION: "Auction created successfully",
//   CREATE_BID: "Bid created successfully",
//   UPDATE_BID: "Bid updated successfully",
//   WITHDRAW_BID: "Bid withdrawn successfully",
//   CLOSE_AUCTION: "Auction closed successfully",
//   GET_PROFIT: "Profit calculated successfully",
//   EXIT: "Exiting program...",
// };

// // Basic parser for `method(arg1, arg2)` pattern
// function parseInput(input: string) {
//   const match = input.trim().match(/^(\w+)\((.*)\)$/);
//   if (!match) return null;
//   const [, methodName, argsString] = match;
//   try {
//     // Parse args as CSV, preserving strings/numbers
//     const args = eval(`[${argsString}]`); // Use caution with eval
//     return { methodName, args };
//   } catch {
//     return null;
//   }
// }

// // Setup shell
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: color.cyan("online-auction-system > "),
// });

// console.log(
//   color.bold(
//     color.green("Custom Shell Ready. Try calling one of the following methods:")
//   ) +
//     "\n" +
//     color.yellow('ADD_BUYER("Alice")') +
//     "\n" +
//     color.yellow('ADD_SELLER("Bob")') +
//     "\n" +
//     color.yellow('CREATE_AUCTION("auction1", 100, 200, 10, "Bob")') +
//     "\n" +
//     color.yellow('CREATE_BID("Alice", "auction1", 150)') +
//     "\n" +
//     color.yellow('UPDATE_BID("Alice", "auction1", 160)') +
//     "\n" +
//     color.yellow('WITHDRAW_BID("Alice", "auction1")') +
//     "\n" +
//     color.yellow('CLOSE_AUCTION("auction1")') +
//     "\n" +
//     color.yellow('GET_PROFIT("Bob", "auction1")') +
//     "\n" +
//     color.yellow("EXIT()")
// );
// console.log(color.gray("----------------------------------------"));
// rl.prompt();

// rl.on("line", (line) => {
//   const parsed = parseInput(line);
//   if (!parsed) {
//     console.log(color.red("Invalid format. Use method(arg1, arg2, ...)"));
//     rl.prompt();
//     return;
//   }

//   const { methodName, args } = parsed as {
//     methodName: MethodName;
//     args: any[];
//   };

//   const method = methods[methodName] as (...args: any[]) => any;

//   if (methodName in methods) {
//     try {
//       const result = method.apply(null, args);
//       console.log(color.green("✓ ") + color.bold(color.green("Success!")));

//       if (methodName === "CLOSE_AUCTION") {
//         const auction = onlineAuctionSystem["auctions"].find(
//           (a) => a.getId() === args[0]
//         );
//         if (auction) {
//           const winningBid = auction.getBidEvaluator().getWinningBid();
//           if (winningBid) {
//             console.log(
//               color.cyan("→ ") +
//                 color.bold("Winner: ") +
//                 color.yellow(
//                   `${winningBid.user.getName()} (${
//                     winningBid.amount
//                   } is highest unique bid)`
//                 )
//             );
//           } else {
//             console.log(color.cyan("→ ") + color.bold("No winner"));
//           }
//           const profit = auction.getProfitCalculator().calculateProfit();
//           console.log(
//             color.cyan("→ ") +
//               color.bold("Profit/Loss ") +
//               (profit >= 0
//                 ? color.green(profit.toString())
//                 : color.red(profit.toString()))
//           );
//         }
//       } else if (result !== undefined) {
//         console.log(color.gray("Result: ") + color.yellow(result));
//       } else if (successMessages[methodName]) {
//         console.log(color.gray(successMessages[methodName]));
//       }

//       console.log(color.gray("----------------------------------------"));
//     } catch (err: any) {
//       console.log(color.red("✗ ") + color.bold(color.red("Error:")));
//       console.log(color.red(err.message));
//       console.log(color.gray("----------------------------------------"));
//     }
//   } else {
//     console.log(color.red("✗ ") + color.bold(color.red("Unknown method:")));
//     console.log(color.red(methodName));
//     console.log(color.gray("----------------------------------------"));
//   }

//   rl.prompt();
// }).on("close", () => {
//   console.log(color.gray("----------------------------------------"));
//   console.log(color.cyan("Exiting. Goodbye! 👋"));
//   process.exit(0);
// });
