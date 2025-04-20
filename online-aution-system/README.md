# 💻 Machine Coding Assignment: Online Auction System

## Problem Statement

FooBar Inc. wants to build an **Online Auction System** where registered users can sell or bid on products. Sellers create auctions, and buyers participate in them by placing bids.

Your task is to design and implement this auction platform with proper **object-oriented principles**, **clean code practices**, and **extensibility** in mind.

## ✅ Functional Requirements

### 👥 Users

- **Buyers** can participate in multiple auctions.
- **Sellers** can host auctions and track profit/loss.

### 🛒 Auctions

- Each auction has:

  - A unique ID
  - Lowest and highest bid limits
  - A seller
  - A fixed **participation cost (Rs. x)** paid by each participating buyer

- The seller receives **20%** of the participation cost from each bidder.

- The remaining **80%** is retained by FooBar as commission.

### 💰 Bids

- Buyers can **create**, **update**, or **withdraw** bids until the auction is closed.
- Bid amount must lie **within bid limits**.
- Multiple auctions can run **simultaneously**.

### 🏆 Winner Selection: Highest Unique Bid

- The **highest bid** which is **unique** (placed by only one buyer) wins.
- If no unique bid exists, **no winner** is declared.

### 📈 Seller Profit/Loss Calculation

```python
profit_or_loss = winning_bid_amount
               + (no_of_bidders * 0.2 * participation_cost)
               - average_of(lowest_bid_limit, highest_bid_limit)

# If there’s no winner:
profit = no_of_bidders * 0.2 * participation_cost
```

### 🎁 Bonus: Preferred Buyers

- Buyers who participate in **more than 2 auctions** are marked as **Preferred Buyers**.
- In case of a tie for the highest unique bid, **Preferred Buyers win**.
- If multiple preferred buyers tie, fall back to the **next highest unique bid**.

## 🛠 Commands to Implement

Implement the following operations:

| **Command**                                                                | **Description**                                   |
| -------------------------------------------------------------------------- | ------------------------------------------------- |
| `ADD_BUYER(name)`                                                          | Registers a new buyer                             |
| `ADD_SELLER(name)`                                                         | Registers a new seller                            |
| `CREATE_AUCTION(id, lowestBid, highestBid, participationCost, sellerName)` | Creates a new auction                             |
| `CREATE_BID(buyerName, auctionId, bidAmount)`                              | Buyer places a bid                                |
| `UPDATE_BID(buyerName, auctionId, newBidAmount)`                           | Updates buyer's bid                               |
| `WITHDRAW_BID(buyerName, auctionId)`                                       | Withdraws buyer's bid                             |
| `CLOSE_AUCTION(auctionId)`                                                 | Finalizes the auction and announces winner        |
| `GET_PROFIT(sellerName, auctionId)`                                        | Displays the seller’s profit/loss for the auction |

## 🧪 Sample Test Cases

### ✅ Test Case 1: Valid Bidding and Winner

```python
ADD_BUYER("buyer1")
ADD_BUYER("buyer2")
ADD_BUYER("buyer3")
ADD_SELLER("seller1")
CREATE_AUCTION("A1", 10, 50, 1, "seller1")
CREATE_BID("buyer1", "A1", 17)
CREATE_BID("buyer2", "A1", 15)
UPDATE_BID("buyer2", "A1", 19)
CREATE_BID("buyer3", "A1", 19)
CLOSE_AUCTION("A1")
→ Winner: buyer1 (17 is highest unique bid)

GET_PROFIT("seller1", "A1")
→ Profit/Loss = 17 + (3 * 0.2 * 1) - ((10 + 50) / 2) = 17 + 0.6 - 30 = -12.4
```

### ❌ Test Case 2: No Winner

```python
ADD_SELLER("seller2")
CREATE_AUCTION("A2", 5, 20, 2, "seller2")
CREATE_BID("buyer3", "A2", 25) // Invalid: beyond max bid
CREATE_BID("buyer2", "A2", 5)

WITHDRAW_BID("buyer2", "A2")
CLOSE_AUCTION("A2")
→ No winner

GET_PROFIT("seller2", "A2")
→ Profit = (1 * 0.2 * 2) = 0.4
```

## 🧩 Design Expectations

### 📦 Object-Oriented Design

Structure your solution with modular, extensible classes. Suggested components:

### 💡 Coding Best Practices

- Handle edge cases (duplicate names, invalid bid ranges, etc.)
- Modular responsibilities – avoid God classes
- Clean code, meaningful names, no hardcoding
- Graceful failures with helpful error messages
- Easily extensible system

---

## 📦 Deliverables

- Source Code (modular & runnable)
- `Main.java` or `AppRunner.java` or `AuctionSystemTest.java` for demo/testing
- Console I/O
- README (optional but encouraged)
