import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Block as BlockType } from "../types/Block";

type Props = {
  block: BlockType;
};

const BoxBlock = styled(Box)({
  background: "rgba(0, 0, 0, 0.12)",
  borderRadius: "2px",
  marginTop: "4px",
  padding: "8px",
});

const TypographyIndex = styled(Typography)({
  color: "#304FFE",
  fontWeight: "bold",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
});

const TypographyData = styled(Typography)({
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0.25px",
  textTransform: "uppercase",
});

const Block: React.FC<Props> = ({ block }) => {
  return (
    <BoxBlock>
      <TypographyIndex>{String(block.index).padStart(3, "0")}</TypographyIndex>
      <TypographyData>{block.data}</TypographyData>
    </BoxBlock>
  );
};

export default Block;
