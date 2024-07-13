
import { DialogTitle, DialogContent, TableCell, Typography, Box } from "@mui/material";
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

export const StyledDialogTitle = styled(DialogTitle)`
  background-color: #1768b0;
  color: #fff;
`;

export const StyledDialogContent = styled(DialogContent)`
  margin-top: 48px;
`;

export const StyledHeaders = styled(Typography)`
  font-weight: bold;
`;

export const StyledButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 24px 0px;
`;
