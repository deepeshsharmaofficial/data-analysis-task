import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import { YearlyTable } from "./components/YearlyTable";
import { CropAverageTable } from "./components/CropAverageTable";
import { processData, YearlyStats, CropAverageStats } from "./utils/dataProcessing";
import { Card, Container, ScrollArea, Text } from "@mantine/core";

function App() {
  const [yearlyStats, setYearlyStats] = useState<YearlyStats[]>([]);
  const [cropAverages, setCropAverages] = useState<CropAverageStats[]>([]);

  useEffect(() => {
    const processedData = processData();
    setYearlyStats(processedData.yearlyStats);
    setCropAverages(processedData.cropAverages);
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Container>

        <Text m="lg" ta="center" size="xl" fw={900} tt="uppercase" variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 108 }}>Agriculture Data Analysis</Text>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text m="lg" ta="center" size="lg" fw={700} tt="capitalize" variant="gradient"
          gradient={{ from: 'violet', to: 'grape', deg: 90 }}>Yearly Crop Production</Text>
          <ScrollArea h={400} type="always" offsetScrollbars>
              <YearlyTable data={yearlyStats} />        
          </ScrollArea>
        </Card>

        <Card m="lg" shadow="sm" padding="lg" radius="md" withBorder>
          <Text m="lg" ta="center" size="lg" fw={700} tt="capitalize" variant="gradient" gradient={{ from: 'violet', to: 'grape', deg: 90 }}>Crop Average Yield and Area</Text>
          <ScrollArea h={400} type="always" offsetScrollbars>
              <CropAverageTable data={cropAverages} />
          </ScrollArea>
        </Card>
        
      </Container>
    </MantineProvider>
  );
}
export default App;