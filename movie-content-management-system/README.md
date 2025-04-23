# 🎬 Machine Coding Assignment - Movie Content Management System

## 📋 Overview

You are tasked with building a **high-performance movie search system** for a streaming platform called **ZipReel**. This system must manage user and movie registrations while delivering **ultra-fast movie searches** via a **multi-level caching mechanism**.

Your solution should follow **modular**, **object-oriented**, and **scalable** design principles.

---

## ✅ Functional Requirements

### 🎞️ Movie Registration

Each movie must have:

- **Movie ID** (unique integer)
- **Title** (string)
- **Genre** (string)
- **Release Year** (integer)
- **Rating** (float)

**Command:**

```
ADD_MOVIE <id> <title> <genre> <year> <rating>
Example: ADD_MOVIE 1 "Inception" "Sci-Fi" 2010 9.5
```

**Output:**

```
Movie 'Inception' added successfully
```

---

### 👤 User Registration

Each user must have:

- **User ID** (unique integer)
- **Name** (string)
- **Preferred Genre** (string)

**Command:**

```
ADD_USER <id> <name> <preferred_genre>
Example: ADD_USER 1 "John" "Action"
```

**Output:**

```
User 'John' added successfully
```

---

### 🎬 Movie Search

**1. Single Filter Search**

**Command:**

```
SEARCH <user_id> <search_type> <search_value>
Example: SEARCH 1 GENRE "Action"
```

**Output:**

```
Inception (Found in L1)
Tenet (Found in L2)
John Wick (Found in Primary Store)
```

---

**2. Multi-Filter Search**

**Command:**

```
SEARCH_MULTI <user_id> <genre> <year> <min_rating>
Example: SEARCH_MULTI 1 "Action" 2020 8.0
```

**Output:**

```
Extraction (Found in Primary Store)
```

---

## 🧠 Multi-Level Cache Architecture

| Cache Level   | Scope    | Max Entries | Eviction Policy             | Description                                  |
| ------------- | -------- | ----------- | --------------------------- | -------------------------------------------- |
| L1 Cache      | Per user | 5 per user  | LRU (Least Recently Used)   | Stores recent searches for each user         |
| L2 Cache      | Global   | 20 total    | LFU (Least Frequently Used) | Stores most common searches across all users |
| Primary Store | Global   | Unlimited   | N/A                         | Stores full movie database in memory         |

### 🔍 Search Lookup Order

```
L1 (User) → L2 (Global) → Primary Store
```

- **Cache Hit**: Search result found in L1 or L2
- **Cache Miss**: Result only found in primary store

---

## 📊 Cache Analytics

**Command:**

```
VIEW_CACHE_STATS
```

**Output:**

```
L1 Cache Hits: 5
L2 Cache Hits: 3
Primary Store Hits: 12
Total Searches: 20
```

---

## 🧹 Cache Maintenance

**Command:**

```
CLEAR_CACHE <cache_level>
Example: CLEAR_CACHE L1
```

**Output:**

```
L1 cache cleared successfully
```

---

## ⚠️ Error Handling Requirements

- Invalid movie/user ID during search → print descriptive error message
- Duplicate user or movie registration → fail with proper message
- Invalid search type or missing parameters → show error
- Handle empty results gracefully → "No movies found"

---

## 🧱 Design Guidelines

### 📦 Expected Components

You are encouraged to use the following logical class structure:

- `Movie`, `User` (Models)
- `MovieService` (Handles storage & registration)
- `UserService` (Handles user management)
- `SearchService` (Handles search with multi-level caching)
- `L1CacheManager` (Per-user LRU cache)
- `L2CacheManager` (Global LFU cache)
- `SearchResult` (Stores result + cache level)
- `ZipReelAppDriver` (Main method with demo/test cases)

---

## ✨ Bonus Features (Optional but encouraged)

- Command parser or menu-based CLI for easier testing
- Proper unit tests for `L1Cache`, `L2Cache`, and `SearchService`
- Search performance optimizations with indexed data structures

---

## 🔁 Input/Output

- **Input Mode:** STDIN / hardcoded demo in main driver / input file
- **Output Mode:** STDOUT / console print
- **Storage:** All data must be in-memory (no file/db usage)

---

## 🧪 Sample Workflow

```
ADD_USER 1 "Alice" "Action" ADD_USER 2 "Bob" "Sci-Fi"

ADD_MOVIE 1 "Inception" "Sci-Fi" 2010 9.5 ADD_MOVIE 2 "Mad Max" "Action" 2015 8.1 ADD_MOVIE 3 "Tenet" "Sci-Fi" 2020 7.8

SEARCH 1 GENRE "Sci-Fi"
→ Inception (Found in Primary Store)
→ Tenet (Found in Primary Store)

SEARCH 1 GENRE "Sci-Fi"
→ Inception (Found in L1)
→ Tenet (Found in L1)

SEARCH 2 GENRE "Sci-Fi"
→ Inception (Found in L2)
→ Tenet (Found in L2)

VIEW_CACHE_STATS
→ L1 Cache Hits: 2
→ L2 Cache Hits: 2
→ Primary Store Hits: 2
→ Total Searches: 3
```

---

## 📦 Deliverables

- ✅ Full working Java code
- ✅ Main driver to test the functionality
- ✅ Modular structure (service, model, cache, etc.)
- ✅ Console output matching problem statement
- ⭕ (Optional) Unit tests

---
