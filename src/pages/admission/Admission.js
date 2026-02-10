import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { BiFile, BiShow } from "react-icons/bi";

const Admission = ({ onNewClick, onViewClick }) => {
  const cards = [
    {
      title: "Application Form",
      subtitle: "Create new student admission",
      icon: <BiFile size={40} />,
      action1: "Start Application",
      action2: "Continue Draft",
      onClick: onNewClick,
    },
    {
      title: "View Applications",
      subtitle: "View & manage submitted applications",
      icon: <BiShow size={40} />,
      action1: "View List",
      action2: "Search Application",
      onClick: onViewClick,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 4,
      }}
    >
      {cards.map((card, index) => (
        <Box
          key={index}
          sx={{
            bgcolor: "#f8f9fb",
            borderRadius: 4,
            p: 5,
            textAlign: "center",
            boxShadow: "0px 10px 40px rgba(0,0,0,0.05)",
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          {/* Circle Icon */}
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              bgcolor: "#4d44b5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              mx: "auto",
              mb: 2,
            }}
          >
            {card.icon}
          </Box>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#303972",
              mb: 1,
            }}
          >
            {card.title}
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body2"
            sx={{
              color: "#a1a5b7",
              mb: 3,
            }}
          >
            {card.subtitle}
          </Typography>

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={card.icon}
              onClick={card.onClick}
              sx={{
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              {card.action1}
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              {card.action2}
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Admission;
