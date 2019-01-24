# DBTransaction


# Transaction

**Description :**
- transaction : Transactions group a set of tasks into a single execution unit. Each transaction begins with a specific task and ends when all the tasks in the group successfully complete. If any of the tasks fail, the transaction fails. Therefore, a transaction has only two results: success or failure.

Incomplete steps result in the failure of the transaction. A database transaction, by definition, must be atomic, consistent, isolated and durable. These are popularly known as
ACID(Atomicity, Consistency, Isolation, and Durability) properties.

**Sequelize supports two ways of using transactions:**
- One which will automatically commit or rollback the transaction based on the result of a promise chain and, (if enabled) pass the transaction to all calls within the callback
- And one which leaves committing, rolling back and passing the transaction to the user.
The key difference is that the managed transaction uses a callback that expects a promise to be returned to it while the unmanaged transaction returns a promise.

