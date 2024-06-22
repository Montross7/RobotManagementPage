import { IconButton } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

function StarButton(props: any) {
  const { id, isActive, onClick } = props;
  return (
    <IconButton onClick={() => onClick(id, isActive)}>
      {isActive ? <StarIcon sx={{ color: "#F7B500" }} /> : <StarOutlineIcon />}
    </IconButton>
  );
}

export default StarButton;
