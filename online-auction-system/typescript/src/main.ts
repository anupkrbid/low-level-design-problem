import readline from "readline";
import color from "yoctocolors";
import { OnlineAuctionSystem } from "./models";

console.log(color.bold(color.cyan("Online Auction System")));
console.log(color.gray("----------------------------------------"));

const onlineAuctionSystem = new OnlineAuctionSystem();

// Predefined methods (make sure these methods exist on OnlineAuctionSystem)
const methods = {
  ADD_BUYER: (name: string) => {
    onlineAuctionSystem.addBuyer(name);
    console.log(
      color.green("✓ ") + color.bold(color.green("Buyer added successfully"))
    );
  },
  ADD_SELLER: (name: string) => {
    onlineAuctionSystem.addSeller(name);
    console.log(
      color.green("✓ ") + color.bold(color.green("Seller added successfully"))
    );
  },
  CREATE_AUCTION: (
    id: string,
    lowestBid: number,
    highestBid: number,
    participationCost: number,
    sellerName: string
  ) => {
    onlineAuctionSystem.createAuction(
      id,
      lowestBid,
      highestBid,
      participationCost,
      sellerName
    );
    console.log(
      color.green("✓ ") +
        color.bold(color.green("Auction created successfully"))
    );
  },
  CREATE_BID: (buyerName: string, auctionId: string, bidAmount: number) => {
    onlineAuctionSystem.createBid(buyerName, auctionId, bidAmount);
    console.log(
      color.green("✓ ") + color.bold(color.green("Bid created successfully"))
    );
  },
  UPDATE_BID: (buyerName: string, auctionId: string, newBidAmount: number) => {
    onlineAuctionSystem.updateBid(buyerName, auctionId, newBidAmount);
    console.log(
      color.green("✓ ") + color.bold(color.green("Bid updated successfully"))
    );
  },
  WITHDRAW_BID: (buyerName: string, auctionId: string) => {
    onlineAuctionSystem.withdrawBid(buyerName, auctionId);
    console.log(
      color.green("✓ ") + color.bold(color.green("Bid withdrawn successfully"))
    );
  },
  CLOSE_AUCTION: (auctionId: string) => {
    const winningBid = onlineAuctionSystem.closeAuction(auctionId);
    if (!winningBid) {
      console.log(color.yellow("→ ") + color.bold("No winner"));
    } else {
      console.log(
        color.cyan("→ ") +
          color.bold("Winner: ") +
          color.yellow(
            `${winningBid.user.getName()} (${
              winningBid.amount
            } is highest unique bid)`
          )
      );
    }
  },
  GET_PROFIT: (sellerName: string, auctionId: string) => {
    const result = onlineAuctionSystem.getProfit(sellerName, auctionId);
    console.log(
      color.cyan("→ ") +
        color.bold("Profit/Loss ") +
        (result >= 0
          ? color.green(result.toString())
          : color.red(result.toString()))
    );
  },
  EXIT: () => {
    console.log(color.yellow("Exiting. Goodbye! 👋"));
    console.log(color.gray("----------------------------------------"));
    process.exit(0);
  },
};

type MethodName = keyof typeof methods;

// Generic success messages for void methods
const successMessages: Record<MethodName, string> = {
  ADD_BUYER: "Buyer added successfully",
  ADD_SELLER: "Seller added successfully",
  CREATE_AUCTION: "Auction created successfully",
  CREATE_BID: "Bid created successfully",
  UPDATE_BID: "Bid updated successfully",
  WITHDRAW_BID: "Bid withdrawn successfully",
  CLOSE_AUCTION: "Auction closed successfully",
  GET_PROFIT: "Profit calculated successfully",
  EXIT: "Exiting program...",
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
  prompt: color.cyan("online-auction-system > "),
});

console.log(
  color.bold(
    color.green("Custom Shell Ready. Try calling one of the following methods:")
  ) +
    "\n" +
    color.yellow('ADD_BUYER("Alice")') +
    "\n" +
    color.yellow('ADD_SELLER("Bob")') +
    "\n" +
    color.yellow('CREATE_AUCTION("auction1", 100, 200, 10, "Bob")') +
    "\n" +
    color.yellow('CREATE_BID("Alice", "auction1", 150)') +
    "\n" +
    color.yellow('UPDATE_BID("Alice", "auction1", 160)') +
    "\n" +
    color.yellow('WITHDRAW_BID("Alice", "auction1")') +
    "\n" +
    color.yellow('CLOSE_AUCTION("auction1")') +
    "\n" +
    color.yellow('GET_PROFIT("Bob", "auction1")') +
    "\n" +
    color.yellow("EXIT()")
);
console.log(color.gray("----------------------------------------"));
rl.prompt();

rl.on("line", (line) => {
  const parsed = parseInput(line);
  if (!parsed) {
    console.log(color.red("Invalid format. Use method(arg1, arg2, ...)"));
    rl.prompt();
    return;
  }

  const { methodName, args } = parsed as {
    methodName: MethodName;
    args: any[];
  };

  const method = methods[methodName] as (...args: any[]) => any;

  if (methodName in methods) {
    try {
      method.apply(null, args);

      console.log(color.gray("----------------------------------------"));
    } catch (err: any) {
      console.log(color.red("✗ ") + color.bold(color.red(err.message)));
      console.log(color.gray("----------------------------------------"));
    }
  } else {
    console.log(
      color.red("✗ ") +
        color.bold(color.red("Unknown Method: ") + color.red(methodName))
    );
  }

  rl.prompt();
}).on("close", () => {
  console.log(color.yellow("Exiting. Goodbye! 👋"));
  console.log(color.gray("----------------------------------------"));
  process.exit(0);
});
