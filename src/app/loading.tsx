import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        p: 2,
      }}
    >
      <CircularProgress size={60} thickness={4} />

      <Typography
        variant="h6"
        sx={{
          mt: 2,
          direction:"rtl",
        }}
      >
        در حال بارگذاری ...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
