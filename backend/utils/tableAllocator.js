function findOptimalTableCombination(tables, guestCount) {
  const results = [];

  const dfs = (i, currTables, totalSeats) => {
    if (totalSeats >= guestCount) {
      results.push([...currTables]);
      return;
    }
    if (i >= tables.length) return;

    // Include current table
    currTables.push(tables[i]);
    dfs(i + 1, currTables, totalSeats + tables[i].occupancy);
    currTables.pop();

    // Exclude current table
    dfs(i + 1, currTables, totalSeats);
  };

  dfs(0, [], 0);

  if (results.length === 0) return null;

  // Sort: fewest tables, then fewest extra seats
  results.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    const seatsA = a.reduce((sum, t) => sum + t.occupancy, 0);
    const seatsB = b.reduce((sum, t) => sum + t.occupancy, 0);
    return seatsA - seatsB;
  });

  return results[0]; 
}

module.exports = { findOptimalTableCombination };
