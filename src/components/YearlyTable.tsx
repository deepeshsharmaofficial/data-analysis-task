import React from "react";
import { Table } from "@mantine/core";
import { YearlyStats } from "../utils/dataProcessing";

type YearlyTableProps = {
  data: YearlyStats[];
};

export const YearlyTable: React.FC<YearlyTableProps> = ({ data }) => {
  return (
    <Table stickyHeader verticalSpacing="md" striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Year</Table.Th>
          <Table.Th>Crop with Maximum Production</Table.Th>
          <Table.Th>Crop with Minimum Production</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((row) => (
          <Table.Tr key={row.year}>
            <Table.Td>{row.year.split(', ')[1]}</Table.Td>
            <Table.Td>{row.maxCrop}</Table.Td>
            <Table.Td>{row.minCrop}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
