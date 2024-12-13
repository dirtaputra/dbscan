// ================== FUNGSI UTILITAS ==================
// Menghitung jarak Euclidean antara dua titik
function euclideanDistance(point1, point2) {
    return Math.sqrt(
        point1.reduce((sum, val, index) => sum + Math.pow(val - point2[index], 2), 0)
    );
}

// ================== IMPLEMENTASI DBSCAN ==================
function rangeQuery(dataset, pointIndex, epsilon) {
    const neighbors = [];
    for (let i = 0; i < dataset.length; i++) {
        if (euclideanDistance(dataset[pointIndex], dataset[i]) <= epsilon) {
            neighbors.push(i);
        }
    }
    return neighbors;
}

function dbscan(dataset, epsilon, minPoints) {
    const clusters = [];
    const noise = [];
    const visited = new Set();
    const clusterAssignment = Array(dataset.length).fill(null);

    let clusterId = 0;

    for (let i = 0; i < dataset.length; i++) {
        if (visited.has(i)) continue;

        visited.add(i);
        const neighbors = rangeQuery(dataset, i, epsilon);

        if (neighbors.length < minPoints) {
            noise.push(i);
        } else {
            clusters.push([]);
            expandCluster(dataset, i, neighbors, clusters[clusterId], clusterAssignment, clusterId, epsilon, minPoints, visited);
            clusterId++;
        }
    }

    return { clusters, noise };
}

function expandCluster(dataset, pointIndex, neighbors, cluster, clusterAssignment, clusterId, epsilon, minPoints, visited) {
    cluster.push(pointIndex);
    clusterAssignment[pointIndex] = clusterId;

    let i = 0;
    while (i < neighbors.length) {
        const neighborIndex = neighbors[i];
        if (!visited.has(neighborIndex)) {
            visited.add(neighborIndex);
            const neighborNeighbors = rangeQuery(dataset, neighborIndex, epsilon);
            if (neighborNeighbors.length >= minPoints) {
                neighbors = neighbors.concat(neighborNeighbors.filter(n => !neighbors.includes(n)));
            }
        }

        if (clusterAssignment[neighborIndex] === null) {
            cluster.push(neighborIndex);
            clusterAssignment[neighborIndex] = clusterId;
        }

        i++;
    }
}

// ================== IMPLEMENTASI K-MEANS ==================
function kMeans(dataset, k, maxIterations = 100) {
    const centroids = initializeCentroids(dataset, k);
    let assignments = Array(dataset.length).fill(-1);

    for (let iter = 0; iter < maxIterations; iter++) {
        // Assign points to nearest centroid
        let changes = 0;
        for (let i = 0; i < dataset.length; i++) {
            const distances = centroids.map(centroid => euclideanDistance(dataset[i], centroid));
            const closestCentroid = distances.indexOf(Math.min(...distances));

            if (assignments[i] !== closestCentroid) {
                assignments[i] = closestCentroid;
                changes++;
            }
        }

        // Stop if no changes
        if (changes === 0) break;

        // Update centroids
        for (let j = 0; j < k; j++) {
            const assignedPoints = dataset.filter((_, index) => assignments[index] === j);
            if (assignedPoints.length > 0) {
                centroids[j] = calculateMean(assignedPoints);
            }
        }
    }

    return { centroids, assignments };
}

function initializeCentroids(dataset, k) {
    return dataset.slice(0, k); // Simple initialization with first k points
}

function calculateMean(points) {
    const dimension = points[0].length;
    return Array(dimension)
        .fill(0)
        .map((_, index) => points.reduce((sum, point) => sum + point[index], 0) / points.length);
}

// ================== DATASET ==================
const customerData = [
    { id: "C123", location: [-6.2, 106.8], frequency: 20, orderValue: 500 },
    { id: "C124", location: [-6.3, 107.0], frequency: 15, orderValue: 300 },
    { id: "C125", location: [-6.1, 106.7], frequency: 30, orderValue: 700 },
    { id: "C126", location: [-6.4, 107.1], frequency: 10, orderValue: 200 },
    { id: "C127", location: [-6.2, 106.9], frequency: 25, orderValue: 400 }
];

const hubData = [
    { hubId: "H1", volume: 5000 },
    { hubId: "H2", volume: 3000 },
    { hubId: "H3", volume: 4000 }
];

// ================== DBSCAN UNTUK PELANGGAN ==================
const epsilon = 0.1;
const minPoints = 2;
const customerLocations = customerData.map(c => c.location);

const dbscanResult = dbscan(customerLocations, epsilon, minPoints);

console.log("Hasil Clustering Pelanggan:");
dbscanResult.clusters.forEach((cluster, index) => {
    console.log(`Cluster ${index + 1}:`, cluster.map(i => customerData[i].id));
});

// ================== K-MEANS UNTUK HUB ==================
const hubVolumes = hubData.map(h => [h.volume]);
const k = 2;

const kMeansResult = kMeans(hubVolumes, k);

console.log("\nHasil Clustering Hub:");
for (let i = 0; i < k; i++) {
    const cluster = hubData.filter((_, index) => kMeansResult.assignments[index] === i);
    console.log(`Cluster ${i + 1}:`, cluster.map(h => h.hubId));
}

// ================== ANALISIS DAN OUTPUT ==================
console.log("\nAnalisis dan Rekomendasi:");
dbscanResult.clusters.forEach((cluster, index) => {
    console.log(`Pelanggan Cluster ${index + 1}:`);
    cluster.forEach(i => {
        const customer = customerData[i];
        console.log(
            `  - ID: ${customer.id}, Location: ${customer.location}, Frequency: ${customer.frequency}, Order Value: ${customer.orderValue}`
        );
    });
});

for (let i = 0; i < k; i++) {
    const cluster = hubData.filter((_, index) => kMeansResult.assignments[index] === i);
    console.log(`Hub Cluster ${i + 1}:`);
    cluster.forEach(hub => {
        console.log(`  - ID: ${hub.hubId}, Volume: ${hub.volume}`);
    });
}
