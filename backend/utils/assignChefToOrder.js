const Chef = require("../models/Chef");

const assignChefToOrder = async (orderId, estimatedDuration) => {
  const chefs = await Chef.find();

  if (chefs.length === 0) {
    throw new Error("No chefs available");
  }

  // Find min totalEstimatedTime
  let minTime = Math.min(...chefs.map((chef) => chef.totalEstimatedTime));

  // Get all chefs with the min time
  const leastBusyChefs = chefs.filter(
    (chef) => chef.totalEstimatedTime === minTime
  );

  // Pick any one (could add randomness or FIFO later)
  const selectedChef = leastBusyChefs[0];

  // Update that chef's data
  selectedChef.currentOrders.push({
    orderId,
    estimatedDuration,
  });
  selectedChef.totalEstimatedTime += estimatedDuration;
  await selectedChef.save();

  return selectedChef._id;
};

const removeOrderFromChef = async (orderId) => {
  const chef = await Chef.findOne({ "currentOrders.orderId": orderId });

  if (!chef) return;

  const orderEntry = chef.currentOrders.find(
    (o) => o.orderId.toString() === orderId.toString()
  );
  if (!orderEntry) return;

  chef.totalEstimatedTime -= orderEntry.estimatedDuration;

  // Remove the order from the list
  chef.currentOrders = chef.currentOrders.filter(
    (o) => o.orderId.toString() !== orderId.toString()
  );

  await chef.save();
};

module.exports = { assignChefToOrder,removeOrderFromChef };
