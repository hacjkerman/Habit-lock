/*global chrome*/
export async function appendHabitToLocal(habit) {
  console.log(habit);
  chrome.storage.executeScript({});
}
