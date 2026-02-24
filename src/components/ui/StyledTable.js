import React from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography
} from "@mui/material";

/**
 * Shared attractive table styles used across all modules.
 * Usage:
 *   import { StyledTable, StyledTH, StyledTD, StyledTR, EmptyRow } from "../../components/ui/StyledTable";
 */

// ─── Column header cell ───────────────────────────────────────────────────────
export const StyledTH = ({ children, align = "left", sx = {}, ...props }) => (
    <TableCell
        align={align}
        sx={{
            fontWeight: 700,
            fontSize: "0.78rem",
            color: "#4d44b5",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            bgcolor: "#f4f5ff",
            borderBottom: "2px solid #e0e2ff",
            py: 1.5,
            px: 2,
            whiteSpace: "nowrap",
            ...sx,
        }}
        {...props}
    >
        {children}
    </TableCell>
);

// ─── Data row ─────────────────────────────────────────────────────────────────
export const StyledTR = ({ children, sx = {}, ...props }) => (
    <TableRow
        hover
        sx={{
            cursor: "default",
            transition: "background 0.15s",
            "&:hover": { bgcolor: "#f8f7ff" },
            "&:last-child td": { borderBottom: 0 },
            ...sx,
        }}
        {...props}
    >
        {children}
    </TableRow>
);

// ─── Data cell ────────────────────────────────────────────────────────────────
export const StyledTD = ({ children, align = "left", sx = {}, ...props }) => (
    <TableCell
        align={align}
        sx={{
            fontSize: "0.875rem",
            color: "#3d4465",
            borderBottom: "1px solid #f0f1f8",
            py: 1.4,
            px: 2,
            ...sx,
        }}
        {...props}
    >
        {children}
    </TableCell>
);

// ─── Empty state row ──────────────────────────────────────────────────────────
export const EmptyRow = ({ colSpan = 1, message = "No records found." }) => (
    <TableRow>
        <TableCell colSpan={colSpan} sx={{ py: 6, textAlign: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                <Typography variant="h2" sx={{ opacity: 0.15, lineHeight: 1 }}>📋</Typography>
                <Typography color="text.secondary" variant="body2">{message}</Typography>
            </Box>
        </TableCell>
    </TableRow>
);

// ─── Full table wrapper ────────────────────────────────────────────────────────
const StyledTable = ({
    headers = [],       // array of strings or { label, align }
    children,          // TableBody rows
    stickyHeader = false,
    sx = {},
}) => (
    <TableContainer
        component={Paper}
        elevation={0}
        sx={{
            border: "1px solid #e8e9f5",
            borderRadius: 3,
            overflow: "hidden",
            ...sx,
        }}
    >
        <Table stickyHeader={stickyHeader} size="small">
            {headers.length > 0 && (
                <TableHead>
                    <TableRow>
                        {headers.map((h, i) => (
                            <StyledTH key={i} align={typeof h === "object" ? h.align || "left" : "left"}>
                                {typeof h === "object" ? h.label : h}
                            </StyledTH>
                        ))}
                    </TableRow>
                </TableHead>
            )}
            <TableBody>{children}</TableBody>
        </Table>
    </TableContainer>
);

export default StyledTable;
