import data from "../constants/data.json"; // Import the JSON file

type CropData = {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string;
  "Area Under Cultivation (UOM:Ha(Hectares))": string;
};

export type YearlyStats = {
  year: string;
  maxCrop: string;
  minCrop: string;
};

export type CropAverageStats = {
  crop: string;
  avgYield: number;
  avgArea: number;
};

export const processData = () => {
  const yearlyStats: YearlyStats[] = [];
  const cropStats: { [key: string]: { totalYield: number; totalArea: number; count: number } } = {};

  // Group data by year for calculating max and min production
  const dataByYear: { [year: string]: CropData[] } = {};

  data.forEach((entry) => {
    const year = entry.Year;
    const crop = entry["Crop Name"];
    const production = parseFloat(entry["Crop Production (UOM:t(Tonnes))"]) || 0;
    const yieldPerHectare = parseFloat(entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;
    const area = parseFloat(entry["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;

    // Group data by year
    if (!dataByYear[year]) {
      dataByYear[year] = [];
    }
    dataByYear[year].push(entry);

    // Calculate total yield and area for each crop for averages
    if (!cropStats[crop]) {
      cropStats[crop] = { totalYield: 0, totalArea: 0, count: 0 };
    }
    cropStats[crop].totalYield += yieldPerHectare;
    cropStats[crop].totalArea += area;
    cropStats[crop].count += 1;
  });

  // Calculate max and min crop production for each year
  for (const year in dataByYear) {
    const crops = dataByYear[year];
    let maxCrop = "";
    let minCrop = "";
    let maxProduction = -Infinity;
    let minProduction = Infinity;

    crops.forEach((crop) => {
      const production = parseFloat(crop["Crop Production (UOM:t(Tonnes))"]) || 0;

      if (production > maxProduction) {
        maxProduction = production;
        maxCrop = crop["Crop Name"];
      }
      if (production < minProduction) {
        minProduction = production;
        minCrop = crop["Crop Name"];
      }
    });

    yearlyStats.push({ year, maxCrop, minCrop });
  }

  // Calculate average yield and area for each crop
  const cropAverages: CropAverageStats[] = Object.keys(cropStats).map((crop) => ({
    crop,
    avgYield: parseFloat((cropStats[crop].totalYield / cropStats[crop].count).toFixed(3)),
    avgArea: parseFloat((cropStats[crop].totalArea / cropStats[crop].count).toFixed(3)),
  }));

  return { yearlyStats, cropAverages };
};
