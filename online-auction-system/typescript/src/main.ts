import readline from "node:readline";
import { OnlineAuctionSystem } from "./models/online-auction-system.class";

console.log("Online Auction System");

const onlineAuctionSystem = new OnlineAuctionSystem();

// Safe, predefined methods
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

// Basic parser for `method(arg1, arg2)`
function parseInput(input: string) {
  const match = input.trim().match(/^(\w+)\((.*)\)$/);
  if (!match) return null;

  const [, methodName, argsString] = match;
  try {
    // Parse args as CSV, preserving strings/numbers
    const args = eval(`[${argsString}]`); // Safer than full eval, but still needs care
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
  'Custom Shell Ready. Try calling: add(2, 3), greet("Alice"), help()'
);
rl.prompt();

rl.on("line", (line) => {
  const parsed = parseInput(line);
  if (!parsed) {
    console.log("Invalid format. Use method(arg1, arg2)");
    rl.prompt();
    return;
  }

  const { methodName, args } = parsed;

  if (methods.hasOwnProperty(methodName)) {
    try {
      const result = methods[methodName](...args);
      console.log(result);
    } catch (err) {
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
