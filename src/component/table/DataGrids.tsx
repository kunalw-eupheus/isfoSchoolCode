import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { getAllSchool } from "../../service/school.service";


export default function DataGrids() {
  const [loading, setloading] = useState<boolean>(true);
  let columns: any = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "name", width: 500 },
    { field: "amount", headerName: "amount", width: 300 },
    { field: "code", headerName: "code", width: 300 },
  ];
  let [tableRow, settableRow] = useState([]);

  useEffect(()=>{
    const api=async () => {
      const get:any = await getAllSchool();
      if(get){
        let dt: any = [];
        get?.data?.allSchools?.map((item: any, index: number) => {
          dt.push({
            id: index + 1,
            name: item.school_name,
            amount:item.amount,
            code:item.school_code
            
          });
        });
        setloading(false);
        settableRow(dt);
      }
    }
    api()
  },[])
  console.log(tableRow)

  return (
    <>
      <Box sx={{ height: 500, width: 1 }}>
        {loading ? (
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ background: "gray", width: 1 }} 
            height={500}
          />
        ) : (
          <DataGrid
            rows={tableRow}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        )}
      </Box>
    </>
  );
}
