import React from "react";
import { Table } from "@mantine/core";
import { CropAverageStats } from "../utils/dataProcessing";

type CropAverageTableProps = {
  data: CropAverageStats[];
};

export const CropAverageTable: React.FC<CropAverageTableProps> = ({ data }) => {
  return (
      <Table stickyHeader mb="lg" verticalSpacing="md" striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Crop</Table.Th>
            <Table.Th>Average Yield (Kg/Ha)</Table.Th>
            <Table.Th>Average Area (Ha)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row) => (
            <Table.Tr key={row.crop}>
              <Table.Td>{row.crop}</Table.Td>
              <Table.Td>{row.avgYield}</Table.Td>
              <Table.Td>{row.avgArea}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
  );
};
