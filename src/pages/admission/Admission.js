import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BiFile, BiShow } from "react-icons/bi";

const DRAFT_KEY = "admission_draft";

const Admission = () => {
  const navigate = useNavigate();

  const handleContinueDraft = () => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      navigate("/admission/application-form");
    } else {
      alert("No draft found. Start a new application.");
    }
  };

  const cards = [
    {
      title: "Application Form",
      subtitle: "Create a new student admission application",
      icon: <BiFile size={40} />,
      actions: [
        { label: "Start Application", onClick: () => navigate("/admission/application-form") },
        { label: "Continue Draft", onClick: handleContinueDraft },
      ],
    },
    {
      title: "View Applications",
      subtitle: "View & manage submitted applications",
      icon: <BiShow size={40} />,
      actions: [
        { label: "View All", onClick: () => navigate("/admission/list") },
        { label: "Pending Review", onClick: () => navigate("/admission/list?status=Pending") },
      ],
    },
  ];

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">Admissions</Typography>
        <Typography variant="body2" color="text.secondary">Manage student admission applications</Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 4 }}>
        {cards.map((card, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: "#f8f9fb", borderRadius: 4, p: 5, textAlign: "center",
              boxShadow: "0px 10px 40px rgba(0,0,0,0.05)", transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Box sx={{ width: 90, height: 90, borderRadius: "50%", bgcolor: "#4d44b5", display: "flex", alignItems: "center", justifyContent: "center", color: "white", mx: "auto", mb: 2 }}>
              {card.icon}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#303972", mb: 1 }}>{card.title}</Typography>
            <Typography variant="body2" sx={{ color: "#a1a5b7", mb: 3 }}>{card.subtitle}</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
              {card.actions.map((action) => (
                <Button
                  key={action.label}
                  variant="outlined"
                  onClick={action.onClick}
                  sx={{ borderRadius: 3, textTransform: "none" }}
                >
                  {action.label}
                </Button>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Admission;
