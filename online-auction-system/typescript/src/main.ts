import * as readline from "readline";
import { OnlineAuctionSystem } from "./models/online-auction-system.class";

console.log("Online Auction System");

const onlineAuctionSystem = new OnlineAuctionSystem();

// Predefined methods (make sure these methods exist on OnlineAuctionSystem)
const methods = {
  ADD_BUYER: (name: string) => onlineAuctionSystem.addBuyer(name),
  ADD_SELLER: (name: string) => onlineAuctionSystem.addSeller(name),
  CREATE_AUCTION: (
    id: string,
    lowestBid: number,
    highestBid: number,
    participationCost: number,
    sellerName: string
  ) =>
    onlineAuctionSystem.createAuction(
      id,
      lowestBid,
      highestBid,
      participationCost,
      sellerName
    ),
  CREATE_BID: (buyerName: string, auctionId: string, bidAmount: number) =>
    onlineAuctionSystem.createBid(buyerName, auctionId, bidAmount),
  UPDATE_BID: (buyerName: string, auctionId: string, newBidAmount: number) =>
    onlineAuctionSystem.updateBid(buyerName, auctionId, newBidAmount),
  WITHDRAW_BID: (buyerName: string, auctionId: string) =>
    onlineAuctionSystem.withdrawBid(buyerName, auctionId),
  CLOSE_AUCTION: (auctionId: string) =>
    onlineAuctionSystem.closeAuction(auctionId),
  GET_PROFIT: (sellerName: string, auctionId: string) =>
    onlineAuctionSystem.getProfit(sellerName, auctionId),
};

// Basic parser for `method(arg1, arg2)` pattern
function parseInput(input: string) {
  const match = input.trim().match(/^(\w+)\((.*)\)$/);
  if (!match) return null;
  const [, methodName, argsString] = match;
  try {
    // Parse args as CSV, preserving strings/numbers
    const args = eval(`[${argsString}]`); // Use caution with eval
    return { methodName, args };
  } catch {
    return null;
  }
}

// Setup shell
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "online-auction-system > ",
});

console.log(
  "Custom Shell Ready. Try calling one of the following methods:\n" +
    'ADD_BUYER("Alice")\n' +
    'ADD_SELLER("Bob")\n' +
    'CREATE_AUCTION("auction1", 100, 200, 10, "Bob")\n' +
    'CREATE_BID("Alice", "auction1", 150)\n' +
    'UPDATE_BID("Alice", "auction1", 160)\n' +
    'WITHDRAW_BID("Alice", "auction1")\n' +
    'CLOSE_AUCTION("auction1")\n' +
    'GET_PROFIT("Bob", "auction1")'
);
rl.prompt();

rl.on("line", (line) => {
  const parsed = parseInput(line);
  if (!parsed) {
    console.log("Invalid format. Use method(arg1, arg2, ...)");
    rl.prompt();
    return;
  }

  const { methodName, args } = parsed as {
    methodName: keyof typeof methods;
    args: any[];
  };

  const method = methods[methodName] as (...args: any[]) => any;

  if (methodName in methods) {
    try {
      const result = method.apply(null, args);
      console.log(result);
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
    }
  } else {
    console.log(`Unknown method: ${methodName}`);
  }

  rl.prompt();
}).on("close", () => {
  console.log("Exiting.");
  process.exit(0);
});
