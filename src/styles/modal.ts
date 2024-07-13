
import { TableCell } from "@mui/material";
import styled from "styled-components";

export const StyledCell = styled(TableCell)`
  position: relative;
  :after {
    content: "";
    position: absolute;
    right: 0px;
    top: 40%;
    height: 20%;
    border-right: 2px solid #e0e0e0;
  }

  &:last-child:after {
    display: none;
  }
`;