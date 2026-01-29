import React from 'react';
import { Card as MuiCard, CardContent, CardHeader, Box } from '@mui/material';

const Card = ({ children, title, action, sx = {} }) => {
    return (
        <MuiCard sx={{ ...sx }}>
            {(title || action) && (
                <CardHeader
                    title={title}
                    action={action}
                    titleTypographyProps={{ variant: 'h3', color: 'text.primary' }}
                    sx={{ p: 0, mb: children ? 3 : 0 }}
                />
            )}
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                {children}
            </CardContent>
        </MuiCard>
    );
};

export default Card;
