let array = [];
let speed = 100;
let comparisons = 0;

// Generate a new array
function generateArray() {
  const container = document.getElementById("array-container");
  const size = document.getElementById("size").value;
  array = [];
  comparisons = 0;
  document.getElementById("counter").textContent = "Comparisons: 0";
  document.getElementById("complexity").textContent = "Complexity: -";
  container.innerHTML = "";

  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 300) + 10;
    array.push(value);
    const bar = document.createElement("div");
    bar.style.height = `${value}px`;
    bar.classList.add("bar");
    container.appendChild(bar);
  }
}

// Update the bars visually
function updateBars(highlight = []) {
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar, i) => {
    bar.style.height = `${array[i]}px`;
    bar.className = "bar";
    if (highlight.includes(i)) bar.classList.add("active");
  });
}

// Add delay based on speed slider
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Display complexity based on selected algorithm
function updateStats(algo) {
  const map = {
    bubble: "O(n²)",
    selection: "O(n²)",
    insertion: "O(n²)",
    heap: "O(n log n)"
  };
  document.getElementById("complexity").textContent = `Complexity: ${map[algo]}`;
}

// Increment comparison counter
function updateCounter() {
  comparisons++;
  document.getElementById("counter").textContent = `Comparisons: ${comparisons}`;
}

// Sorting Algorithms

// Bubble Sort
async function bubbleSort() {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      updateBars([j, j + 1]);
      updateCounter();
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        updateBars([j, j + 1]);
      }
      await sleep(speed);
    }
  }
  markSorted();
}

// Selection Sort
async function selectionSort() {
  const n = array.length;
  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      updateBars([min, j]);
      updateCounter();
      if (array[j] < array[min]) min = j;
      await sleep(speed);
    }
    if (min !== i) {
      [array[i], array[min]] = [array[min], array[i]];
      updateBars([i, min]);
    }
    await sleep(speed);
  }
  markSorted();
}

// Insertion Sort
async function insertionSort() {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      updateCounter();
      array[j + 1] = array[j];
      j--;
      updateBars([j + 1]);
      await sleep(speed);
    }
    array[j + 1] = key;
    updateBars([j + 1]);
    await sleep(speed);
  }
  markSorted();
}

// Heap Sort
async function heapSort() {
  const n = array.length;

  async function heapify(n, i) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n && array[l] > array[largest]) largest = l;
    if (r < n && array[r] > array[largest]) largest = r;

    updateCounter();
    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      updateBars([i, largest]);
      await sleep(speed);
      await heapify(n, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    updateBars([0, i]);
    await sleep(speed);
    await heapify(i, 0);
  }

  markSorted();
}

// Highlight sorted bars
function markSorted() {
  document.querySelectorAll(".bar").forEach(bar => {
    bar.classList.remove("active");
    bar.classList.add("sorted");
  });
}

// Start sorting based on selection
function startSort() {
  const algo = document.getElementById("algorithm").value;
  speed = 1000 - document.getElementById("speed").value;
  comparisons = 0;
  updateStats(algo);
  document.getElementById("counter").textContent = "Comparisons: 0";

  switch (algo) {
    case "bubble":
      bubbleSort();
      break;
    case "selection":
      selectionSort();
      break;
    case "insertion":
      insertionSort();
      break;
    case "heap":
      heapSort();
      break;
  }
}

// Dark/Light mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Initialize
window.onload = generateArray;

